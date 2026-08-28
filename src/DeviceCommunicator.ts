import { SerialPortManager } from './SerialPortManager';

export class DeviceCommunicator {
  private serial: SerialPortManager;

  constructor(serial: SerialPortManager) {
    this.serial = serial;
  }


  private async startReadLoop(targetString: string | false, options?: { maxSize?: number }): Promise<string> {
    return await this.serial.startReadLoop(targetString, false, options);
  }


  /**
   * シリアルポートのリーダーをリセット（キャンセルして再作成）
   */
  private async resetReader(): Promise<void> {
    await this.serial.resetReader();
  }

  /**
   * RAWモードに入る
   */
  private async enterRawMode(): Promise<void> {
    if (this.serial.getStatus() !== 'REPL') {
      console.error('Not in REPL mode. Exiting...');
    }
    console.log('Entering RAW mode...');
    this.serial.setTerminalOutputEnabled(false);
    await this.serial.sendControl(0x01); // CTRL+A
    // 直前のコマンドの終了バナーとの取り違えを防ぐため、
    // raw REPL への切り替え完了（"raw REPL; CTRL-B to exit" バナー）を待ってから次のコードを送る。
    try {
      await Promise.race([
        this.startReadLoop('raw REPL; CTRL-B to exit\r\n>'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('raw REPL wait timeout')), 3000)),
      ]);
    } catch (e) {
      console.warn('[WARN] raw REPL prompt not detected within timeout:', e);
    }
  }

  /**
   * RAWモードを抜けて、通常のターミナル出力を再開
   */
  private async exitRawMode(): Promise<void> {
    this.serial.setTerminalOutputEnabled(true);
    await this.serial.sendControl(0x02); // CTRL+B: RAWモードを抜ける
  }

  /**
   * コマンドを実行する
   * @param {string} command - 実行するコマンド
   */
  public async executeCommand(command: string): Promise<void> {
    console.log('executeCommand:', command);
    try {
        await this.enterRawMode(); // CTRL+A
        await this.write(command);
        await this.serial.sendControl(0x04); // CTRL+D
    } catch (error) {
      console.error('Error executing command:', error);
    } finally {
      await this.exitRawMode(); // ポートを解放
    }
  }

    /**
   * コマンド送信
   * @param {string} command - 実行するコマンド
   */
    public async sendCommand(command: string): Promise<void> {
        console.log('sendCommand:', command);
        try {
          await this.write(command);
        } catch (error) {
          console.error('Error executing sendCommand:', error);
        }
      }
    
  /**
   * ファイルを書き込む
   * @param {string} filename - ファイル名
   * @param {Uint8Array} content - 書き込む内容
   */
  public async writeFile(filename: string, content: Uint8Array): Promise<void> {
    console.log('writeFile:', filename);
    let rawModeActive = false;
    try {
      await this.resetReader();
      await this.enterRawMode(); // CTRL+A
      rawModeActive = true;

      // `f.write(bytes([1,2,3,...]))` のように整数リストのリテラルとして送ると、
      // 要素数が多いファイルではリテラル1つ1つがバイトコード命令を消費し、
      // "RuntimeError: bytecode overflow" になってしまう。
      // 16進数文字列（1個の文字列定数）にして ubinascii.unhexlify で復元すれば
      // バイトコードサイズはほぼ一定になるため、この問題を回避できる。
      // また、別々の raw REPL 実行（複数回の CTRL+D）に分けると、実行間で
      // グローバル変数（ここでは f）が引き継がれない場合があるため、
      // open～write～close を 1 回の実行にまとめて送る。
      let script = `import ubinascii\rwith open("${filename}", "wb") as f:\r`;
      const CHUNK_SIZE = 1024;
      if (content.length === 0) {
        script += `  pass\r`;
      } else {
        for (let offset = 0; offset < content.length; offset += CHUNK_SIZE) {
          const part = content.subarray(offset, offset + CHUNK_SIZE);
          const hex = Array.from(part).map((b) => b.toString(16).padStart(2, '0')).join('');
          script += `  f.write(ubinascii.unhexlify("${hex}"))\r`;
        }
      }

      await this.write(script);
      await this.serial.sendControl(0x04); // CTRL+D

      // raw REPL のプロトコル: "OK" -> (stdout) -> 0x04 -> (stderr/traceback) -> 0x04
      await this.startReadLoop('>OK');
      await this.startReadLoop('\x04'); // stdout 部分
      const stderr = await this.startReadLoop('\x04'); // stderr/traceback 部分
      await this.exitRawMode();
      rawModeActive = false;

      if (stderr && stderr.trim().length > 0) {
        throw new Error(`Device reported an error while writing: ${stderr.trim()}`);
      }

      // 書き込み後に検証
      console.log('Verifying written file...');
      const writtenContent = await this.readFile(filename); // デバイス上のファイルを読み取る
      const diff = this.diffContent(content, writtenContent);
      if (diff) {
        console.error('Verification diff:', diff);
        throw new Error(`File verification failed: Written content does not match. (${diff})`);
      }
      console.log('File verification succeeded.');
    } catch (error) {
      const err = error as Error; // 型アサーション
      console.error('Error writing file:', err.message);
      throw new Error(`Failed to write file "${filename}": ${err.message}`);
    } finally {
      if (rawModeActive) {
        await this.exitRawMode();
      }
    }
  }

  /**
   * デバイス上のファイルを削除する
   */
  public async deleteFile(filename: string): Promise<void> {
    console.log('deleteFile:', filename);
    try {
      await this.resetReader();
      await this.enterRawMode();
      await this.write('import os\r');
      await this.write(`try:\r  os.remove("${filename}")\r  print(\"__FILE_DELETED__\")\rexcept Exception as e:\r  print(\"__DELETE_FAILED__:\"+str(e))\r`);
      await this.serial.sendControl(0x04);

      await this.startReadLoop('>OK');
      const result = await this.startReadLoop('\x04');
      this.startReadLoop(false);
      await this.exitRawMode();

      if (!result) throw new Error('No response from device');
      if (result.indexOf('__FILE_DELETED__') >= 0) {
        return;
      }
      if (result.indexOf('__DELETE_FAILED__:') >= 0) {
        const msg = result.split('__DELETE_FAILED__:')[1] || 'unknown';
        throw new Error(String(msg).trim());
      }
      throw new Error('Unexpected response: ' + result);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  /**
   * デバイス上のファイルをリネームする
   */
  public async renameFile(oldPath: string, newPath: string): Promise<void> {
    console.log('renameFile:', oldPath, '->', newPath);
    try {
      await this.resetReader();
      await this.enterRawMode();
      await this.write('import os\r');
      await this.write(`try:\r  os.rename("${oldPath}", "${newPath}")\r  print(\"__RENAMED__\")\rexcept Exception as e:\r  print(\"__RENAME_FAILED__:\"+str(e))\r`);
      await this.serial.sendControl(0x04);

      await this.startReadLoop('>OK');
      const result = await this.startReadLoop('\x04');
      this.startReadLoop(false);
      await this.exitRawMode();

      if (!result) throw new Error('No response from device');
      if (result.indexOf('__RENAMED__') >= 0) {
        return;
      }
      if (result.indexOf('__RENAME_FAILED__:') >= 0) {
        const msg = result.split('__RENAME_FAILED__:')[1] || 'unknown';
        throw new Error(String(msg).trim());
      }
      throw new Error('Unexpected response: ' + result);
    } catch (error) {
      console.error('Error renaming file:', error);
      throw error;
    }
  }

/**
 * 書き込んだ内容とデバイス上の内容を比較して検証
 * @param {Uint8Array} originalContent - 書き込んだ内容
 * @param {Uint8Array} writtenContent - デバイス上の内容
 * @return {boolean} - 一致する場合は true、そうでない場合は false
 */
private verifyContent(originalContent: Uint8Array, writtenContent: Uint8Array): boolean {
  return this.diffContent(originalContent, writtenContent) === null;
}

/**
 * 2 つのバイト列を比較し、最初に異なる箇所の情報を返す（一致する場合は null）
 */
private diffContent(originalContent: Uint8Array, writtenContent: Uint8Array): string | null {
  if (originalContent.length !== writtenContent.length) {
    const minLen = Math.min(originalContent.length, writtenContent.length);
    let firstDiff = minLen;
    for (let i = 0; i < minLen; i++) {
      if (originalContent[i] !== writtenContent[i]) { firstDiff = i; break; }
    }
    return `length mismatch: original=${originalContent.length} written=${writtenContent.length}, first diff at offset ${firstDiff}`;
  }
  for (let i = 0; i < originalContent.length; i++) {
    if (originalContent[i] !== writtenContent[i]) {
      const start = Math.max(0, i - 8);
      const origHex = Array.from(originalContent.slice(start, i + 8)).map(b => b.toString(16).padStart(2, '0')).join(' ');
      const writtenHex = Array.from(writtenContent.slice(start, i + 8)).map(b => b.toString(16).padStart(2, '0')).join(' ');
      return `first diff at offset ${i}: original=[${origHex}] written=[${writtenHex}]`;
    }
  }
  return null;
}

/**
 * MicroPython デバイスからファイルをバイナリ形式で読み取る
 * @param {string} filename - 読み取るファイル名
 * @return {Promise<Uint8Array>} - ファイルの内容をバイナリデータとして返す
 */
public async readFile(filename: string): Promise<Uint8Array> {
    console.log('readFile:', filename);
    let fileContent = new Uint8Array();
  
    try {
      await this.resetReader();
      await this.enterRawMode(); // CTRL+A

      await this.write(`with open("${filename}", "rb") as f:\r`);
      await this.write('  import ubinascii\r');
      await this.write('  print(ubinascii.hexlify(f.read()).decode())\r');
      await this.serial.sendControl(0x04); // CTRL+D

      // プロンプトを読み飛ばす
      await this.startReadLoop('>OK'); // >OK を待つ

      // ファイル内容を取得（HEX形式で受信）
      // this.isTerminalOutput = false;
      // readFile can return a large amount of data — request a larger maxSize (500KB)
      const hexContent = await this.startReadLoop('\x04', { maxSize: 500000 }); // CTRL+D を待つ
      this.startReadLoop(false); // データを処理する関数を呼び出す

      // 受信中にシリアル側でバッファがトリムされていたらデータ欠損の可能性があるためエラーにする
      try {
        if (this.serial.consumeTrimFlag()) {
          throw new Error('Receive buffer trimmed during read; data may be incomplete');
        }
      } catch (e) {
        // rethrow to be caught by outer catch
        throw e;
      }

      if (!hexContent) {
        throw new Error('No data received from device');
      }

      // 受信データが 16 進のみで構成されているか簡易チェック
      if (!/^[0-9a-fA-F\s]*$/.test(hexContent)) {
        // もし中間にプロンプトやエラーメッセージが混じっている場合はエラー扱いにする
        throw new Error('Received non-hex data from device');
      }

      // HEX形式をバイナリデータに変換
      const hexPairs = hexContent.replace(/\s+/g, '').match(/.{1,2}/g) || [];
      const binaryData = new Uint8Array(hexPairs.map((byte) => parseInt(byte, 16)));
      fileContent = binaryData;

      // 正常終了: fileContent を返す
      return fileContent;
    } catch (error) {
      console.error('Error reading file:', error);
      // エラーは呼び出し側で扱いたいので再送出する
      throw error;
    } finally {
      // ポートを解放
      await this.exitRawMode();
    }
  }
  
/**
 * デバイス上のファイル一覧を取得
 * @return {Promise<string[]>} - ファイル名の配列
 */
public async getFileList(): Promise<string[]> {
    console.log('getFileList');
    try {
      await this.resetReader();
      await this.enterRawMode(); // CTRL+A
      // 再帰的にファイルを列挙して、1行ずつ出力する小さな Python スクリプトを実行
      await this.write('import os\r');
      await this.write('def walk(d="."):\r');
      await this.write('  l=[]\r');
      await this.write('  for name in os.listdir(d):\r');
      await this.write('    path = d + "/" + name if d!="." else name\r');
      await this.write('    try:\r');
      await this.write('      if os.stat(path)[0] & 0x4000:\r');
      await this.write('        l.extend(walk(path))\r');
      await this.write('      else:\r');
      await this.write('        l.append(path)\r');
      await this.write('    except:\r');
      await this.write('      pass\r');
      await this.write('  return l\r');
      await this.write('for p in walk():\r');
      await this.write('  print(p)\r');
      await this.serial.sendControl(0x04); // CTRL+D

      // プロンプトを読み飛ばす
      await this.startReadLoop('>OK'); // >OK を待つ

      // 出力を取得（各ファイルが改行で区切られている想定）
      const result = await this.startReadLoop('\x04'); // CTRL+D を待つ
      this.startReadLoop(false);
      await this.exitRawMode();

      if (!result) return [];

      // 改行で分割し、空行を除去して返す
      const files = result.split(/\r?\n/).map(s => s.trim()).filter(s => s.length > 0);
      return files;
    } catch (error) {
      console.error('Error fetching file list:', error);
      return [];
    }
  }

  private async write(s: string) {
    await this.serial.send(s);
  }

  // 書き込みポートを使用してデバイスにデータを書き込む
  public async writeDevice(chunk: string): Promise<void> {
    this.write(chunk);
    // if (!this.isPortBusy) {
    //     this.write(chunk);
    // }
  }
}
