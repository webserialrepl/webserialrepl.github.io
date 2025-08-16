export interface PortOption extends HTMLOptionElement {
  port: SerialPort;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();
function log(msg: string): void {
  // const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  console.log(msg);
}

export class SerialPortManager {
  static readonly EVENT_CONNECTED = 'serialport-connected';
  static readonly EVENT_DISCONNECTED = 'serialport-disconnected';

  private connectButton: HTMLButtonElement | undefined = undefined;
  private serialPort: SerialPort | undefined = undefined;
  private serialReader: ReadableStreamDefaultReader | null = null;
  private serialWriter: WritableStreamDefaultWriter | null = null;
  private reading:boolean = false; // 読み取り中かどうかのフラグ
  private terminalOutputCallback: ((chunk: string) => void) | null = null; // ターミナル出力のコールバック関数

  constructor(private callback: ((chunk: string) => void) | null = null) {
    this.terminalOutputCallback = callback;
  }

  // 初期化処理をまとめたメソッド
  public async initialize(): Promise<void> {

    this.connectButton = document.getElementById('connect') as HTMLButtonElement;
    if (this.connectButton) {
      this.connectButton.disabled = false;
      // 接続ボタンのクリックイベント
      this.connectButton.addEventListener('click', async () => {
        if (this.serialPort) {
          await this.disconnectFromPort();
        } else {
          await this.openPort(); // ポートを開く
        }
      });
    }
  }

  private setUiDisconnected(): void {
    this.serialPort = undefined;
    console.log('<DISCONNECTED>');
    if (this.connectButton) {
      this.connectButton.textContent = 'せつぞく';
      this.connectButton.classList.add('button-default');
    }
    // 接続解除イベントを発生
    document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_DISCONNECTED));

  }

  private async disconnectFromPort(): Promise<void> {
    console.log('Disconnecting from port...');
    const localPort = this.serialPort;
    this.serialPort = undefined;
    try {
      if (this.serialReader) {
        await this.serialReader.cancel();
        this.serialReader.releaseLock();
        this.serialReader = null;
      }
      if (this.serialWriter) {
        await this.serialWriter.close();
        this.serialWriter.releaseLock();
        this.serialWriter = null;
      }
      if (localPort) {
        await localPort.close();
      }
    } catch (e) {
      console.error(e);
    }
    this.setUiDisconnected();
  }

  private async openPort(): Promise<void> {
    try {
      const port = await navigator.serial.requestPort();
      this.serialPort = port;
      const baudRate = 115200;
      await port.open({ baudRate });
      await new Promise(r => setTimeout(r, 300));
      console.log('<CONNECTED>', port);
      this.isTerminalOutput = true;
      await this.startReadLoop(false, 0x03);
      
      if (this.connectButton) {
        this.connectButton.textContent = 'せつだん';
        this.connectButton.classList.remove('button-default');
      }
      // 接続イベントを発生
      document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_CONNECTED));
    } catch (e) {
      if (e instanceof Error) {
        console.error(`<ERROR: ${e.message}>`);
      }
      this.setUiDisconnected();
    }
  }

  private async reopen(): Promise<void> {

    // ポートを一度閉じて再度開く
    if (this.serialPort) {
      try {
        await this.serialPort.close();
      } catch (error) {
        console.error('Error closing port:', error);
      }
      await this.serialPort.open({ baudRate: 115200 });
      console.warn('ポートを再度開き直します。');
    }

  }

  private getWritablePort(): WritableStreamDefaultWriter | null {
    if (this.serialPort && this.serialPort.writable) {
      this.serialWriter = this.serialPort.writable.getWriter();
    } else {
      this.serialWriter = null;
    }
    return this.serialWriter;
  }

  private async picowrite(data: Uint8Array) {
    await this.serialWriter?.write(data);
  }

  private async stopReadLoop() {
    this.reading = false;
    if (this.serialReader) {
      try { await this.serialReader.cancel(); } catch {}
      try { this.serialReader.releaseLock(); } catch {}
      this.serialReader = null;
    }
  }

  public async resetReader(): Promise<void> {
    this.stopReadLoop();
    console.log('stopReadLoop called');
  }

  private async getReadablePort(): Promise<ReadableStreamDefaultReader> {
    // ポートが準備されるまで待機
    const maxRetries = 20; // 最大リトライ回数
    const retryDelay = 100; // リトライ間隔 (ミリ秒)
    let retries = 0;
  
    if (this.serialReader) {
      console.log('Returning existing serial reader.');
      return this.serialReader; // 既にリーダーが存在する場合はそれを返す
    }
    while (!this.serialPort?.readable) {
      if (retries >= maxRetries) {
        throw new Error('Readable port is not available. Ensure the port is open and readable.');
      }
      console.log(`Waiting for readable port... (${retries + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retries++;
    }
    this.serialReader = this.serialPort.readable.getReader();
    console.log('Readable port is ready.', this.serialReader);
    if (!this.serialReader) {
      throw new Error('Serial reader is not initialized.');
    }
    return this.serialReader;
  }

  private async streamRead(): Promise<ReadableStreamReadResult<Uint8Array>> {
    const reader = this.serialReader;
    if (!reader) {
        throw new Error('Reader is not available.');
    }
    const { value, done } = await reader.read();
    //console.log('Received chunk:', value, done); // デバッグ用
    console.log('Received chunk:', value.length, done); // デバッグ用
    return { value, done };
  }

  private isTerminalOutput: boolean = false; // ターミナル出力の状態を管理
  private leftoverData: string = ''; // 未処理のデータを保持
  private replStatus: 'REPL' | 'RUNNING' = 'REPL';

  private updateStatus(newStatus: 'REPL' | 'RUNNING'): void {
    if (this.replStatus !== newStatus) {
      this.replStatus = newStatus;
      console.log(`Status changed to: ${newStatus}`);
      document.dispatchEvent(new CustomEvent('REPL_STATUS_CHANGED', { detail: { status: newStatus } }));
    }
  }
  public getStatus(): 'REPL' | 'RUNNING' {
    return this.replStatus;
  }

  public setTerminalOutputEnabled(enabled: boolean): void {
    this.isTerminalOutput = enabled;
  }

    public async send(data:string): Promise<void> {
      if (!this.serialPort?.writable) {
        log('送信できません（未接続）');
        return;
      }
      try {
        const writer = this.serialPort.writable.getWriter();
        const packet = encoder.encode(data);
        await writer.write(packet);
        await writer.close();
        writer.releaseLock();
        log(`TX(${packet.length}B): ${JSON.stringify(data)}`);
      } catch (err) {
        log(`送信エラー: ${err}`);
      }
    }

    // 送信制御文字用関数を追加
    public async sendControl(asciiCode: number): Promise<void> {
      if (!this.serialPort?.writable) {
        log('送信できません（未接続）');
        return;
      }
      try {
        let writer = this.serialWriter;
        if (!writer) {
          writer = this.serialPort.writable.getWriter();
        }
        //console.log("send:", port, writer)
        const packet = new Uint8Array([asciiCode]); // バイナリ直接
        await writer.write(packet);
        await writer.close();
        writer.releaseLock();
        writer = null;
        log(`TX control: 0x${asciiCode.toString(16).padStart(2, '0')}`);
      } catch (err) {
        log(`送信エラー: ${err}`);
      }
    }

  /**
   * シリアルポートからデータを読み取り、処理する
   * @param {ReadableStreamDefaultReader} reader - シリアルポートのリーダー
   */
  public async startReadLoop(targetString: string | false = false, command:any): Promise<string> {
    let buffer = this.leftoverData; // 前回の未処理データを初期値として設定
    this.leftoverData = ''; // 未処理データをリセット
    const maxResultSize = 10000; // targetString が false の時保存する最大サイズ
    
    //console.log('Starting read loop with targetString:', targetString, 'and command', command);
    if (!this.serialPort?.readable) {
      console.error('serialPort.readable is not available');
      return '';
    }
    if (!this.serialReader) {
      this.serialReader = this.serialPort.readable.getReader();
    }
    this.reading = true;
    console.log('受信ループ開始 ', this.isTerminalOutput);

    if (command) {
      console.log('Ctrl 送信', command);
      await this.sendControl(command);
    }

    try {
      while (this.reading) {
        const { value, done } = await this.streamRead();
        if (done) console.log('Stream closed', this.isTerminalOutput);
        if (done) break;
        const chunk = new TextDecoder('utf-8').decode(value);
        buffer += chunk;

        // バッファの最後の6文字をチェック
        const lastSixChars = buffer.slice(-6); // バッファの最後の6文字を取得
        if (lastSixChars.includes('>>>')) {
          console.log('<REPL> prompt detected.');
          this.updateStatus('REPL'); // REPLモード
        } else {
          console.log('!REPL prompt NOT detected.');
          this.updateStatus('RUNNING'); // プログラム実行中
        }

        // コールバック関数が登録されている場合は呼び出す
        if (this.isTerminalOutput && this.terminalOutputCallback) {
          // ASCIIの表示可能な範囲 (0x20-0x7E)、日本語 (Unicode範囲)、改行 (\r, \n) を許可
          const sanitizedChunk = chunk.replace(/[^\x20-\x7E\u3000-\u9FFF\uFF00-\uFFEF\r\n]/g, ''); 
          this.terminalOutputCallback(sanitizedChunk);
        } else {
          // console.log('Terminal output:', chunk); // デフォルトの動作
        }

        // `result` のサイズを制限
        if (!targetString && buffer.length > maxResultSize) {
          buffer = buffer.slice(buffer.length - maxResultSize); // 古いデータを削除
          console.error('Result size exceeded maximum limit. Trimming...');
        }

        // 特定の文字列が含まれている場合、処理を終了
        if (targetString && buffer.includes(targetString)) {
          const [beforeTarget, afterTarget] = buffer.split(targetString);
          buffer = beforeTarget;
          this.leftoverData = afterTarget; // targetString の後のデータを保存
          console.log('Target string found, processing complete.');
          break;
        }
      }
    } catch (error) {
      console.error('Error processing reader data:', error);
    }
    return buffer;
  }


}
