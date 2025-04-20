import { SerialPortManager } from './SerialPortManager';


export class DeviceCommunicator {
  private serialPortManager: SerialPortManager;
  private isPortBusy: boolean = false; // ポートの占有状態を管理
  private isTerminalOutput: boolean = false; // ターミナル出力の状態を管理
  private terminalOutputCallback: ((chunk: string) => void) | null = null; // ターミナル出力のコールバック関数

  constructor(serialPortManager: SerialPortManager) {
    this.serialPortManager = serialPortManager;
  }

  /**
   * リードポートのループを止めて、ポートを占有する
   */
  private async occupyTerminal(): Promise<void> {
    if (this.isPortBusy) {
      throw new Error('Port is currently busy.');
    }
    this.isPortBusy = true;

    // Read loop を抜ける
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
        } else {
            console.error('No picoport available.');
        }
      } catch (error) {
        console.error('Error canceling the reader:', error);
      }
  }

  /**
   * ターミナル出力を開始
   * @param {(chunk: string) => void} callback - ターミナル出力を処理するコールバック関数
   */
  public async startTerminalOutput(callback: (chunk: string) => void): Promise<void> {
    this.serialPortManager.getWritablePort();   // 書き込みポートの準備
    this.terminalOutputCallback = callback;
    this.isPortBusy = false;
    this.isTerminalOutput = true;
    await this.getReadablePort();
    await this.processReaderData(false); // データを処理する関数を呼び出す
  }

  /**
 * シリアルポートからデータを読み取り、処理する
 * @param {ReadableStreamDefaultReader} reader - シリアルポートのリーダー
 */
private async processReaderData(
    targetString: string | false,
  ): Promise<string> {
    let result = '';
    try {
      const reader = this.serialPortManager.picoreader;
        if (!reader) {
            throw new Error('Reader is not available.');
        }
      while (true) {
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
        result += chunk;
        // 特定の文字列が含まれている場合、処理を終了
        if (targetString && result.includes(targetString)) {
          const [beforeTarget] = result.split(targetString);
          result = beforeTarget;
          break;
        }
      }
    } catch (error) {
      console.error('Error processing reader data:', error);
    } finally {
      console.log('quit terminal');
    }
    return result;
  }

  /**
 * 通常のターミナル出力を再開
 */
  private async releaseTerminal(): Promise<void> {
    this.isPortBusy = false;
    this.isTerminalOutput = true;
    await this.processReaderData(false); // データを処理する関数を呼び出す
  }
  
/**
 * シリアルポートから特定の文字列を待つ
 * @param {string | false} targetString - 待機する特定の文字列、またはチェックを無効にするためのfalse
 * @param {(chunk: string) => void} callback - データチャンクを処理するコールバック関数
 * @return {Promise<string>} - 受信した文字列を返すプロミス
 */
  private async waitForString(
    targetString: string | false,
  ): Promise<string> {
    let result = '';
    result = await this.processReaderData(targetString); // データを処理する関数を呼び出す
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
      this.releaseTerminal(); // ポートを解放
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
          this.releaseTerminal(); // ポートを解放
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
      this.releaseTerminal(); // ポートを解放
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
        // console.log('wait >OK....');
        await this.processReaderData('>OK'); // >OK を待つ
  
        // ファイル内容を取得（HEX形式で受信）
        this.isTerminalOutput = false;
        const hexContent = await this.processReaderData('\x04'); // CTRL+D を待つ
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
      this.releaseTerminal();
    }
    // ファイル内容を返す
    return fileContent;
  }
  
/**
 * デバイス上の .py ファイルの一覧を取得
 * @return {Promise<string[]>} - ファイル名の配列
 */
public async getPyFileList(): Promise<string[]> {
    try {
      await this.occupyTerminal();
  
      // ファイルを読み取るコマンドを送信
      await this.write('\x01'); // CTRL+A: raw モード
      const command = 'import os; print(os.listdir())'; // ファイル一覧を取得するコマンド
      await this.write(command);
      await this.write('\x04'); // CTRL+D: コマンド終了
  
      // プロンプトを読み飛ばす
      await this.processReaderData('>OK'); // >OK を待つ
  
      // ファイル内容を取得
      this.isTerminalOutput = false;
      const result = await this.processReaderData('\x04'); // CTRL+D を待つ
      console.log('Received content:', result);
      this.releaseTerminal(); // ポートを解放

      // Python のリスト形式からファイル名を抽出
      const files = result
        .replace(/[\[\]'\s]/g, '') // 角括弧、シングルクォート、空白を削除
        .split(',') // カンマで分割
        .filter((file) => file.endsWith('.py')); // .py ファイルのみを抽出
  
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
  public writeDeive(chunk: string): void {
    if (!this.isPortBusy) {
        this.write(chunk);
    }
  }
}
