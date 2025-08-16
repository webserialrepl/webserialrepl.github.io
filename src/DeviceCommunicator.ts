import { SerialPortManager } from './SerialPortManager';

export class DeviceCommunicator {
  private serialPortManager: SerialPortManager;

  constructor(serialPortManager: SerialPortManager) {
    this.serialPortManager = serialPortManager;
  }

  /**
   * ターミナル出力を開始
   * @param {(chunk: string) => void} callback - ターミナル出力を処理するコールバック関数
   */
  public async startTerminalOutput(callback: (chunk: string) => void): Promise<void> {
    console.log('startTerminalOutput');

    await this.serialPortManager.reopen();

    this.serialPortManager.getWritablePort();   // 書き込みポートの準備
    this.serialPortManager.terminalOutputCallback = callback;
    // this.isPortBusy = false;
    this.serialPortManager.setTerminalOutputEnabled(true);
    let reader = await this.serialPortManager.getReadablePort();
    //console.log('getReadablePort', reader);
    //const { value, done } = await reader.read();
    //console.log('Read chunk:', value, done); // デバッグ用
    this.processReaderData(false); // データを処理する関数を呼び出し、終了は待たない
  }


  private async processReaderData(targetString: string | false): Promise<string> {
    return await this.serialPortManager.processReaderData(targetString);
  }


  /**
   * シリアルポートのリーダーをリセット（キャンセルして再作成）
   */
  private async resetReader(): Promise<void> {
    await this.serialPortManager.resetReader();
  }

  /**
   * RAWモードに入る
   */
  private async enterRawMode(): Promise<void> {
    if (this.serialPortManager.getStatus() !== 'REPL') {
      console.error('Not in REPL mode. Exiting...');
    }
    console.log('Entering RAW mode...');
    this.serialPortManager.setTerminalOutputEnabled(false);
    await this.write('\x01'); // CTRL+A
  }

  /**
   * RAWモードを抜けて、通常のターミナル出力を再開
   */
  private async exitRawMode(): Promise<void> {
    // this.isPortBusy = false;
    this.serialPortManager.setTerminalOutputEnabled(true);
    await this.write('\x02'); // CTRL+B: RAWモードを抜ける
    // await this.processReaderData(false); // データを処理する関数を呼び出す
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
        await this.write('\x04'); // CTRL+D
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
    try {
      await this.enterRawMode(); // CTRL+A
      await this.write(`with open("${filename}", "wb") as f:\r`);
      const chunk = JSON.stringify(Array.from(content));
      await this.write(`  f.write(bytes(${chunk}))\r`);
      await this.write('\x04'); // CTRL+D

      // 書き込み後に検証
      console.log('Verifying written file...');
      const writtenContent = await this.readFile(filename); // デバイス上のファイルを読み取る
      if (!this.verifyContent(content, writtenContent)) {
        throw new Error('File verification failed: Written content does not match.');
      }
      console.log('File verification succeeded.');
    } catch (error) {
      const err = error as Error; // 型アサーション
      console.error('Error writing file:', err.message);
      throw new Error(`Failed to write file "${filename}": ${err.message}`);
    } finally {
      //await this.exitRawMode(); // ポートを解放
    }
  }

/**
 * 書き込んだ内容とデバイス上の内容を比較して検証
 * @param {Uint8Array} originalContent - 書き込んだ内容
 * @param {Uint8Array} writtenContent - デバイス上の内容
 * @return {boolean} - 一致する場合は true、そうでない場合は false
 */
private verifyContent(originalContent: Uint8Array, writtenContent: Uint8Array): boolean {
  if (originalContent.length !== writtenContent.length) {
    return false;
  }
  for (let i = 0; i < originalContent.length; i++) {
    if (originalContent[i] !== writtenContent[i]) {
      return false;
    }
  }
  return true;
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
      await this.write('\x04'); // CTRL+D: コマンド終了

      // プロンプトを読み飛ばす
      // console.log('wait >OK....');
      await this.processReaderData('>OK'); // >OK を待つ

      // ファイル内容を取得（HEX形式で受信）
      // this.isTerminalOutput = false;
      const hexContent = await this.processReaderData('\x04'); // CTRL+D を待つ
      this.processReaderData(false); // データを処理する関数を呼び出す
      // console.log('Received HEX content:', hexContent);

      // HEX形式をバイナリデータに変換
      const binaryData = new Uint8Array(
        hexContent.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
      );
      fileContent = binaryData;

    } catch (error) {
      console.error('Error reading file:', error);
    } finally {
      // ポートを解放
      await this.exitRawMode();
    }
    // ファイル内容を返す
    return fileContent;
  }
  
/**
 * デバイス上の .py ファイルの一覧を取得
 * @return {Promise<string[]>} - ファイル名の配列
 */
public async getPyFileList(): Promise<string[]> {
    console.log('getPyFileList');
    try {
      await this.resetReader();
      await this.enterRawMode(); // CTRL+A

      await this.write('import os\r');
      await this.write('print(os.listdir())\r');
      await this.write('\x04'); // CTRL+D: コマンド終了
      console.log('Command sent:');
  
      // プロンプトを読み飛ばす
      const skip = await this.processReaderData('>OK'); // >OK を待つ
      console.log('Skip:', skip);
  
      // ファイル内容を取得
      // this.isTerminalOutput = false;
      const result = await this.processReaderData('\x04'); // CTRL+D を待つ
      this.processReaderData(false); // データを処理する関数を呼び出す
      console.log('Received content:', result);
      await this.exitRawMode(); // ポートを解放

      // Python のリスト形式からファイル名を抽出
      const files = result
        .replace(/[\[\]'\s]/g, '') // 角括弧、シングルクォート、空白を削除
        .split(',') // カンマで分割
        .filter((file) => file.endsWith('.py') || file.endsWith('.txt')); // .py または .txt ファイルを抽出
  
      return files;
    } catch (error) {
      console.error('Error fetching file list:', error);
      return [];
    }
  }

  /**
   * Write a string to the picowriter.
   * @param {string} s - The string to write.
   * @throws {Error} If the picowriter is not available.
   */
  private async write(s: string) {
    await this.serialPortManager.picowrite(new TextEncoder().encode(s));
  }

  // 書き込みポートを使用してデバイスにデータを書き込む
  public async writeDevice(chunk: string): Promise<void> {
    this.write(chunk);
    // if (!this.isPortBusy) {
    //     this.write(chunk);
    // }
  }
}
