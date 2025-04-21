import { SerialPortManager } from './SerialPortManager';

export class DeviceCommunicator {
  private serialPortManager: SerialPortManager;
  // private isPortBusy: boolean = false; // ポートの占有状態を管理
  private isTerminalOutput: boolean = false; // ターミナル出力の状態を管理
  private terminalOutputCallback: ((chunk: string) => void) | null = null; // ターミナル出力のコールバック関数
  private leftoverData: string = ''; // 未処理のデータを保持

  // ステータス管理用プロパティ
  private replStatus: 'REPL' | 'RUNNING' = 'REPL';
  // ステータス変更イベント名
  public static readonly EVENT_STATUS_CHANGED = 'repl-status-changed';
  
  constructor(serialPortManager: SerialPortManager) {
    this.serialPortManager = serialPortManager;
  }

  /**
   * ステータスを更新し、イベントを発火
   * @param {string} newStatus - 新しいステータス ('REPL' または 'RUNNING')
   */
  private updateStatus(newStatus: 'REPL' | 'RUNNING'): void {
    if (this.replStatus !== newStatus) {
      this.replStatus = newStatus;
      console.log(`Status changed to: ${newStatus}`);
      document.dispatchEvent(new CustomEvent(DeviceCommunicator.EVENT_STATUS_CHANGED, { detail: { status: newStatus } }));
    }
  }

  /**
   * ターミナル出力を開始
   * @param {(chunk: string) => void} callback - ターミナル出力を処理するコールバック関数
   */
  public async startTerminalOutput(callback: (chunk: string) => void): Promise<void> {
    console.log('startTerminalOutput');
    this.serialPortManager.getWritablePort();   // 書き込みポートの準備
    this.terminalOutputCallback = callback;
    // this.isPortBusy = false;
    this.isTerminalOutput = true;
    await this.getReadablePort();
    await this.processReaderData(false); // データを処理する関数を呼び出す
  }

  /**
   * シリアルポートからデータを読み取り、処理する
   * @param {ReadableStreamDefaultReader} reader - シリアルポートのリーダー
   */
  private async processReaderData(targetString: string | false): Promise<string> {
    let result = this.leftoverData; // 前回の未処理データを初期値として設定
    this.leftoverData = ''; // 未処理データをリセット
    const maxResultSize = 10000; // targetString が false の時保存する最大サイズ

    try {
      const reader = this.serialPortManager.picoreader;
        if (!reader) {
            throw new Error('Reader is not available.');
        }
      while (true) {
        const { value, done } = await reader.read();
        if (done || !value) break;

        const chunk = new TextDecoder('utf-8').decode(value);
        // console.log('chunk:', chunk); // デバッグ用

        // ステータスを更新
        if (chunk.includes('>>>')) {
          this.updateStatus('REPL'); // REPLモード
        } else {
          this.updateStatus('RUNNING'); // プログラム実行中
        }

        // コールバック関数が登録されている場合は呼び出す
        if (this.isTerminalOutput && this.terminalOutputCallback) {
          // ASCIIの表示可能な範囲 (0x20-0x7E)、日本語 (Unicode範囲)、改行 (\r, \n) を許可
          const sanitizedChunk = chunk.replace(/[^\x20-\x7E\u3000-\u9FFF\uFF00-\uFFEF\r\n]/g, ''); 
          this.terminalOutputCallback(sanitizedChunk);
        } else {
          console.log('Terminal output:', chunk); // デフォルトの動作
        }
        result += chunk;

        // `result` のサイズを制限
        if (!targetString && result.length > maxResultSize) {
          result = result.slice(result.length - maxResultSize); // 古いデータを削除
          console.error('Result size exceeded maximum limit. Trimming...');
        }

        // 特定の文字列が含まれている場合、処理を終了
        if (targetString && result.includes(targetString)) {
          const [beforeTarget, afterTarget] = result.split(targetString);
          result = beforeTarget;
          this.leftoverData = afterTarget; // targetString の後のデータを保存
          break;
        }
      }
    } catch (error) {
      console.error('Error processing reader data:', error);
    } finally {
      // console.log('quit terminal');
    }
    return result;
  }

  /**
   * シリアルポートのリーダーをリセット（キャンセルして再作成）
   */
  private async resetReader(): Promise<void> {
    try {
      // リーダーをキャンセル
      if (this.serialPortManager.picoreader) {
        await this.serialPortManager.picoreader.cancel();
        console.log('Reader successfully canceled.');
      } else {
        console.error('No reader to cancel.');
      }

      // リーダーを再作成
      if (this.serialPortManager.picoport && this.serialPortManager.picoport.readable) {
        this.serialPortManager.picoreader = this.serialPortManager.picoport.readable.getReader();
        console.log('New reader created.');
      } else {
        console.error('No picoport available.');
      }
    } catch (error) {
      console.error('Error resetting the reader:', error);
    }
  }

  /**
   * ターミナルへの出力ループを止めて、RAWモードにする
   */
  private async prepareForCommand(): Promise<void> {
    console.log('prepareForCommand');
    // REPLモードでない場合は、処理を中断
    if (this.replStatus !== 'REPL') {
      console.error('Not in REPL mode. Exiting...');
      return;
    }

    try {
      // リーダーをリセット
      await this.resetReader();

      // RAWモードに入る
      await this.write('\x01'); // CTRL+A
    } catch (error) {
      console.error('Error preparing for command:', error);
    }
  }

  /**
   * RAWモードに入る
   */
  private async enterRawMode(): Promise<void> {
    if (this.replStatus !== 'REPL') {
      console.error('Not in REPL mode. Exiting...');
    }
    console.log('Entering RAW mode...');
    this.isTerminalOutput = false;
    await this.write('\x01'); // CTRL+A
  }

  /**
   * RAWモードを抜けて、通常のターミナル出力を再開
   */
  private async exitRawMode(): Promise<void> {
    // this.isPortBusy = false;
    this.isTerminalOutput = true;
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
      await this.exitRawMode(); // ポートを解放
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
 * シリアルポートのリーダーを取得
 * @return {Promise<ReadableStreamDefaultReader>} - シリアルポートのリーダー
 * @throws {Error} - ポートが利用できない場合にエラーをスロー
 */
private async getReadablePort(): Promise<ReadableStreamDefaultReader> {
    // ポートが準備されるまで待機
    const maxRetries = 20; // 最大リトライ回数
    const retryDelay = 100; // リトライ間隔 (ミリ秒)
    let retries = 0;
  
    while (!this.serialPortManager.picoport?.readable) {
      if (retries >= maxRetries) {
        throw new Error('Readable port is not available. Ensure the port is open and readable.');
      }
      console.log(`Waiting for readable port... (${retries + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retries++;
    }
  
    // 新しいリーダーを作成して保存
    const reader = this.serialPortManager.picoport.readable.getReader();
    this.serialPortManager.picoreader = reader;
    console.log('New reader created.');
    return reader;
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
