import { SerialPortManager } from './SerialPortManager';


/**
 * シリアルポートからデータを読み取るジェネレーター関数
 * @param {ReadableStreamDefaultReader} reader
 *  - シリアルポートのリーダー
 * @param {string | false} targetChar
 *  - 待機する特定の文字、またはチェックを無効にするためのfalse
 * @return {AsyncGenerator<string>}
 *  - データチャンクを文字列として返す非同期ジェネレーター
 */
async function* readFromPort(
    reader: ReadableStreamDefaultReader,
    targetChar: string | false
): AsyncGenerator<string> {
  const decoder = new TextDecoder();

  while (true) {
    const {value, done} = await reader.read();
    if (done) {
      return;
    }

    const chunk = decoder.decode(value, {stream: true});
    yield chunk;

    if (targetChar && chunk.includes(targetChar)) {
      return;
    }
  }
}


export class DeviceCommunicator {
  private serialPortManager: SerialPortManager;
  private isPortBusy: boolean = false; // ポートの占有状態を管理
  private isTerminalOutput: boolean = false; // ターミナル出力の状態を管理
  private terminalOutputCallback: ((chunk: string) => void) | null = null; // ターミナル出力のコールバック関数

  constructor(serialPortManager: SerialPortManager) {
    this.serialPortManager = serialPortManager;
  }

  /**
   * ポートを占有する
   */
  private async occupyTerminal(): Promise<void> {
    if (this.isPortBusy) {
      throw new Error('Port is currently busy.');
    }
    this.isPortBusy = true;

    if (this.isTerminalOutput) {
        this.isTerminalOutput = false;
        // ターミナル出力を停止する
        try {
          await this.releaseReadablePort();
        } catch (error) {
          console.error('Error releasing readable port:', error);  
        }
    }
    // 新しいターミナルを起動
    await this.getReadablePort();
    // await this.getWritablePort();
  }

  /**
   * ターミナル出力のコールバック関数を登録
   * @param {(chunk: string) => void} callback - ターミナル出力を処理するコールバック関数
   */
  public startTerminalOutput(callback: (chunk: string) => void): void {
    this.getWritablePort();
    this.terminalOutputCallback = callback;
    this.resumeTerminalOutput(); // ターミナル出力を再開
  }

  public writeDeive(chunk: string): void {
    if (!this.isPortBusy) {
        this.serialPortManager.picowrite(new TextEncoder().encode(chunk));
    }
  }
/**
 * ターミナル出力を再開
 */
  private async resumeTerminalOutput(): Promise<void> {
    this.isPortBusy = false;
      if (!this.isTerminalOutput) {
      console.log('Resuming terminal output...');
      this.isTerminalOutput = true;
      // this.releaseWritablePort();   // 書き込みポートを解放

      // ターミナル出力を再開するロジック
      const reader = await this.getReadablePort();
      if (reader) {
          try {
          while (!this.isPortBusy) {
            const { value, done } = await reader.read();
            if (done || !value) break;
  
            const chunk = new TextDecoder().decode(value);
            console.log('chunk:', chunk); // デバッグ用
  
            // コールバック関数が登録されている場合は呼び出す
            if (this.isTerminalOutput && this.terminalOutputCallback) {
              this.terminalOutputCallback(chunk);
            } else {
              console.log('Terminal output:', chunk); // デフォルトの動作
            }
          }
        } catch (error) {
          console.error('Error resuming terminal output:', error);
        } finally {
          console.log('quit terminal');
        }
      }
    }
  }
  
/**
 * シリアルポートから特定の文字列を待つ
 * @param {string | false} targetString - 待機する特定の文字列、またはチェックを無効にするためのfalse
 * @param {(chunk: string) => void} callback - データチャンクを処理するコールバック関数
 * @return {Promise<string>} - 受信した文字列を返すプロミス
 */
  private async waitForString(
    targetString: string | false,
    callback: ((chunk: string) => void) | null
  ): Promise<string> {
    let result = '';
  
    const reader = this.serialPortManager.picoreader;
    console.log('reader:', reader); // デバッグ用
    if (reader) {
  
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done || !value) break;
  
          const chunk = new TextDecoder().decode(value);
          console.log('chunk:', chunk); // デバッグ用
          // コールバック関数が指定されている場合は実行
          if (callback) {
            callback(chunk);
          }
  
          result += chunk;
  
          // 特定の文字列が含まれている場合、処理を終了
          if (targetString && result.includes(targetString)) {
            const [beforeTarget] = result.split(targetString);
            result = beforeTarget;
            break;
          }
        }
      } catch (error) {
        console.error('Error while waiting for string:', error);
      } finally {
        // リーダーのロックを解放
        // reader.releaseLock();
        console.log('waitForString exit');
      }
    } else {
      console.error('No readable port available.');
    }
    console.log('result:', result); // デバッグ用
    return result;
  }


  /**
   * コマンドを実行する
   * @param {string} command - 実行するコマンド
   */
  public async executeCommand(command: string): Promise<void> {
    try {
        await this.occupyTerminal(); // ポートを占有

        await this.write('\x01'); // CTRL+A
        await this.write(command);
        await this.write('\x04'); // CTRL+D
    } catch (error) {
      console.error('Error executing command:', error);
    } finally {
      this.resumeTerminalOutput(); // ポートを解放
    }
  }

    /**
   * コマンド送信
   * @param {string} command - 実行するコマンド
   */
    public async sendCommand(command: string): Promise<void> {
        try {
            await this.occupyTerminal(); // ポートを占有
            await this.write(command);
        } catch (error) {
          console.error('Error executing sendCommand:', error);
        } finally {
          this.resumeTerminalOutput(); // ポートを解放
        }
      }
    
  /**
   * ファイルを書き込む
   * @param {string} filename - ファイル名
   * @param {Uint8Array} content - 書き込む内容
   */
  public async writeFile(filename: string, content: Uint8Array): Promise<void> {
    try {
      await this.occupyTerminal(); // ポートを占有
  
        await this.write('\x01'); // CTRL+A
        await this.write(`with open("${filename}", "wb") as f:\r`);
        const chunk = JSON.stringify(Array.from(content));
        await this.write(`  f.write(bytes(${chunk}))\r`);
        await this.write('\x04'); // CTRL+D
    } catch (error) {
      console.error('Error writing file:', error);
    } finally {
      this.resumeTerminalOutput(); // ポートを解放
    }
  }

/**
 * MicroPython デバイスからファイルをバイナリ形式で読み取る
 * @param {string} filename - 読み取るファイル名
 * @return {Promise<Uint8Array>} - ファイルの内容をバイナリデータとして返す
 */
public async readFile(filename: string): Promise<Uint8Array> {
    let fileContent = new Uint8Array();
  
    try {
      // ポートを占有
      await this.occupyTerminal();
  
        // ファイルを読み取るコマンドを送信
        await this.write('\x01'); // CTRL+A: raw モード
        await this.write(`with open("${filename}", "rb") as f:\r`);
        await this.write('  import ubinascii\r');
        await this.write('  print(ubinascii.hexlify(f.read()).decode())\r');
        await this.write('\x04'); // CTRL+D: コマンド終了

        // プロンプトを読み飛ばす
        console.log('wait >OK....');
        await this.waitForString('>OK', null); // >OK を待つ
  
        // ファイル内容を取得（HEX形式で受信）
        const hexContent = await this.waitForString('\x04', null); // CTRL+D を待つ
        console.log('Received HEX content:', hexContent);
  
        // HEX形式をバイナリデータに変換
        const binaryData = new Uint8Array(
          hexContent.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
        );
        fileContent = binaryData;

    } catch (error) {
      console.error('Error reading file:', error);
    } finally {
      // ポートを解放
      this.resumeTerminalOutput();
      console.log('resumeTerminalOutput');
    }
    // ファイル内容を返す
    return fileContent;
  }
  
  /**
   * Prepare the writable port.
   * @return {WritableStreamDefaultWriter | null}
   * The writer instance or null if not available.
   */
  private async getWritablePort() {
    return this.serialPortManager.getWritablePort();
  }

  /**
   * Release the picowriter lock.
   */
  private releaseWritablePort() {
    this.serialPortManager.releaseWritablePort();
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
  
    // 既存のリーダーを解放
    if (this.serialPortManager.picoreader) {
        console.log('Releasing existing reader...');
        await this.releaseReadablePort();
    }

    // 新しいリーダーを作成して保存
    console.log('getReader...');
    const reader = this.serialPortManager.picoport.readable.getReader();
    this.serialPortManager.picoreader = reader;
    console.log('New reader created.');
    return reader;
  }

/**
 * シリアルポートのリーダーを解放
 * @return {Promise<void>} - 解放処理が完了したことを示すプロミス
 */
private async releaseReadablePort(): Promise<void> {
    if (this.serialPortManager.picoreader) {
      try {
        // リーダーをキャンセル
        await this.serialPortManager.picoreader.cancel();
        console.log('Reader successfully canceled.');
      } catch (error) {
        console.error('Error canceling the reader:', error);
      }
  
      try {
        // リーダーのロックを解放
        this.serialPortManager.picoreader.releaseLock();
        console.log('Reader lock successfully released.');
      } catch (error) {
        console.error('Error releasing reader lock:', error);
      } finally {
        // リーダーをリセット
        this.serialPortManager.picoreader = undefined;
        console.log('releaseReadablePort exit');
      }
    } else {
      console.log('No reader to release.');
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
}
