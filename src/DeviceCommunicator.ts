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

  constructor(serialPortManager: SerialPortManager) {
    this.serialPortManager = serialPortManager;
  }

  /**
   * Prepare the writable port.
   * @return {WritableStreamDefaultWriter | null}
   * The writer instance or null if not available.
   */
  getWritablePort() {
    return this.serialPortManager.getWritablePort();
  }

  /**
   * Release the picowriter lock.
   */
  releaseLock() {
    this.serialPortManager.releaseLock();
  }

  /**
   * Write a string to the picowriter.
   * @param {string} s - The string to write.
   * @throws {Error} If the picowriter is not available.
   */
  async write(s: string) {
    await this.serialPortManager.picowrite(new TextEncoder().encode(s));
  }

  /**
   * Send command to the Pico device.
   * @param {string} command - The command to send.
   */
  async sendCommand(command: string) {
    if (this.getWritablePort()) {
      await this.write(command);
      this.releaseLock();
    }
  }

  /**
   * 読み込みバッファをクリアし、特定の文字を待ち、それまでに受信した文字を返す
   * @param {string | false} targetChar
   *  - 待機する特定の文字、またはチェックを無効にするためのfalse
   * @param {(chunk: string) => void} callback
   *  - チャンクを処理するコールバック関数
   * @return {Promise<string>} - 受信した文字列を返すプロミス
   */
  async clearpicoport(
      targetChar: string | false,
      callback: ((chunk: string) => void) | null
  ): Promise<string> {
    let result = '';
    if (this.serialPortManager.picoport && this.serialPortManager.picoport.readable) {
      this.serialPortManager.picoreader = this.serialPortManager.picoport.readable.getReader();
      const generator = readFromPort(this.serialPortManager.picoreader, targetChar);
      if (this.serialPortManager.picoreader) {
        try {
          for await (const chunk of generator) {
            if (callback) {
              callback(chunk);
            }
            if (targetChar && chunk.includes(targetChar)) {
              // 特定の文字が含まれている部分を除外
              const [beforeTarget] = chunk.split(targetChar);
              result += beforeTarget;
              break;
            } else {
              result += chunk;
            }
          }
          // console.log('DONE!!!!!!!!!');
        } catch (e) {
          console.error(e);
          await new Promise<void>((resolve) => {
            if (e instanceof Error) {
              // term.writeln(`<ERROR: ${e.message}>`, resolve);
              console.log(`<ERROR: ${e.message}>`, resolve);
            }
          });
        } finally {
          this.serialPortManager.picoreader.releaseLock();
          this.serialPortManager.picoreader = undefined;
        }
      }
    }
    return result;
  }

  /**
   * Write a file to the MicroPython device.
   * @param {string} filename - The name of the file.
   * @param {string} content - The content to write to the file.
   */
  async writeFile(filename: string, content: Uint8Array) {
    if (this.serialPortManager.picoreader) {
      await this.serialPortManager.picoreader.cancel(); // ターミナル出力を停止
    }
    this.clearpicoport(false, null); // ターミナル出力せずに読み込み（バッファをクリア）
    if (this.getWritablePort()) {
      await this.write('\x01'); // CTRL+A
      await this.write(`with open("${filename}", "wb") as f:\r`);
      const chunk = JSON.stringify(Array.from(content));
      // console.log('chunk:', chunk);
      await this.write(`  f.write(bytes(${chunk}))\r`);
      await this.write('\x04'); // CTRL+D
      this.releaseLock();
      this.sendCommand('\x02'); // CTRL+B
    }
    if (this.serialPortManager.picoreader) {
      await this.serialPortManager.picoreader.cancel(); // ターミナル出力を停止
    }
  }
}
