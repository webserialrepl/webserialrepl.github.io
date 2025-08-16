export interface PortOption extends HTMLOptionElement {
  port: SerialPort;
}

export class SerialPortManager {
  // イベント名を定義
  static readonly EVENT_CONNECTED = 'serialport-connected';
  static readonly EVENT_DISCONNECTED = 'serialport-disconnected';

  private portSelector: HTMLSelectElement | undefined = undefined;
  private connectButton: HTMLButtonElement | undefined = undefined;
  private portCounter = 1;
  private serialPort: SerialPort | undefined = undefined;
  private serialReader: ReadableStreamDefaultReader | undefined = undefined;
  private serialWriter: WritableStreamDefaultWriter | null = null;

  // 初期化処理をまとめたメソッド
  public async initialize(): Promise<void> {
    this.portSelector = document.getElementById('ports') as HTMLSelectElement;
    this.connectButton = document.getElementById('connect') as HTMLButtonElement;

    // 初期状態の設定
    if (this.connectButton) {
      this.connectButton.disabled = false;
    }

    // 接続イベントのリスナー
    document.addEventListener(SerialPortManager.EVENT_CONNECTED, () => {
      if (this.connectButton) {
        this.connectButton.textContent = 'せつだん';
        this.connectButton.classList.remove('button-default');
      }
    });

    // 接続解除イベントのリスナー
    document.addEventListener(SerialPortManager.EVENT_DISCONNECTED, () => {
      if (this.connectButton) {
        this.connectButton.textContent = 'せつぞく';
        this.connectButton.classList.add('button-default');
      }
    });

    /*
    // 既存のポートを取得して追加
    const ports: SerialPort[] = await navigator.serial.getPorts();
    ports.forEach((port) => this.addNewPort(port));
    */

    // 接続ボタンのクリックイベント
    if (this.connectButton) {
      this.connectButton.addEventListener('click', async () => {
        if (this.serialPort) {
          await this.disconnectFromPort();
        } else {
          await this.openPort(); // ポートを開く
          // await device.startTerminalOutput(repl_terminal_write); // ポートから読み取りターミナルに出力
        }
      });
    }

    /*
    // シリアルポートの接続・切断イベントのリスナー
    navigator.serial.addEventListener('connect', (event) => {
      const portOption = this.addNewPort(event.target as SerialPort);
      portOption.selected = true;
    });

    navigator.serial.addEventListener('disconnect', (event) => {
      const portOption = this.findPortOption(event.target as SerialPort);
      if (portOption) {
        portOption.remove();
      }
    });
    */

  }
  
  /*
  private findPortOption(port: SerialPort): PortOption | null {
    if (!this.portSelector) return null;
    for (let i = 0; i < this.portSelector.options.length; ++i) {
      const option = this.portSelector.options[i];
      if (option.value === 'prompt') {
        continue;
      }
      const portOption = option as PortOption;
      if (portOption.port === port) {
        return portOption;
      }
    }
    return null;
  }

  private addNewPort(port: SerialPort): PortOption {
    const portOption = document.createElement('option') as PortOption;
    portOption.textContent = `Port ${this.portCounter++}`;
    portOption.port = port;
    this.portSelector?.appendChild(portOption);
    return portOption;
  }

  private maybeAddNewPort(port: SerialPort): PortOption {
    const portOption = this.findPortOption(port);
    if (portOption) {
      return portOption;
    }
    return this.addNewPort(port);
  }
  */

  private async disconnectFromPort(): Promise<void> {
    console.log('Disconnecting from port...');
    const localPort = this.serialPort;
    this.serialPort = undefined;
    try {
      if (this.serialReader) {
        await this.serialReader.cancel();
        this.serialReader.releaseLock();
        this.serialReader = undefined;
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
    this.markDisconnected();
  }


  private markDisconnected(): void {
    this.serialPort = undefined;
    console.log('<DISCONNECTED>');

    // 接続解除イベントを発生
    document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_DISCONNECTED));

    if (this.portSelector) {
      this.portSelector.disabled = false;
    }
  }

  async openPortWithRetry({baudRate=115200, testCommand='ping\n', timeout=3000}={}) {
    const port = await navigator.serial.requestPort();
    this.serialPort = port; // シリアルポートを保存

    let exit = false;
    let retry = 0;
    while (!exit && retry < 5) {

      await port.open({ baudRate });
      this.serialPort = port; // シリアルポートを保存
      console.log('<CONNECTED>', port);

      // オープン後待機
      await new Promise(r => setTimeout(r, 200));

      // writer取得して送信
      const writer = port.writable?.getWriter();
      await writer?.write(new TextEncoder().encode(testCommand));
      writer?.releaseLock();
      console.log('Test command sent:', testCommand);

      // テスト受信（Promise.raceでタイムアウト）
      if (!port.readable) {
        throw new Error('Port is not readable');
      }
      const reader = port.readable.getReader();
      const readPromise = (async () => {
        let buf = '';
        while (true) {
          // throw new Error('Temp');
          const { value, done } = await reader.read();
          console.log('Received chunk:', value, done); // デバッグ用
          buf += new TextDecoder().decode(value);
          return buf;
        }
      })();

      let result;
      try {
          result = await Promise.race([
            readPromise,
            new Promise((_,rej)=>setTimeout(()=>rej(new Error('Timeout')), timeout))
          ]);
          exit = true;
          reader.releaseLock();
          console.log('接続OK', result);

        } catch (error) {
          console.error('Error during read:', error);
          reader.releaseLock();
          await port.close();
          retry++;
          console.warn(`Retrying connection... (${retry}/5)`);
      }
    }
    return port;
  }

  public async reopen(): Promise<void> {

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

  private async openPort(): Promise<void> {
    try {
      const port = await this.openPortWithRetry({
        baudRate: 115200,
        testCommand: 'ping\n'
      });
      this.serialPort = port;
      if (this.portSelector) {
        this.portSelector.disabled = true;
      }
      console.log('<CONNECTED>', port);
      // 接続イベントを発生
      document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_CONNECTED));
    } catch (e) {
      if (e instanceof Error) {
        console.error(`<ERROR: ${e.message}>`);
      }
      this.markDisconnected();
    }
  }

  public getWritablePort(): WritableStreamDefaultWriter | null {
    if (this.serialPort && this.serialPort.writable) {
      this.serialWriter = this.serialPort.writable.getWriter();
    } else {
      this.serialWriter = null;
    }
    return this.serialWriter;
  }

  public async picowrite(data: Uint8Array) {
    await this.serialWriter?.write(data);
  }

  /**
   * シリアルポートのリーダーをリセット（キャンセルして再作成）
   */
  public async resetReader(): Promise<void> {
    try {
      // リーダーをキャンセル
      if (this.serialReader) {
        console.log('Resetting the reader...');
        await this.serialReader.cancel();
        this.serialReader.releaseLock();
        this.serialReader = undefined;
        console.log('Reader successfully canceled.');
      } else {
        console.error('No reader to cancel.');
      }

      // リーダーを再作成
      await this.getReadablePort();

    } catch (error) {
      console.error('Error resetting the reader:', error);
    }
  }

  public async getReadablePort(): Promise<ReadableStreamDefaultReader> {
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

  public async streamRead(): Promise<ReadableStreamReadResult<Uint8Array>> {
    const reader = this.serialReader;
    if (!reader) {
        throw new Error('Reader is not available.');
    }
    const { value, done } = await reader.read();
    //console.log('Received chunk:', value, done); // デバッグ用
    return { value, done };
  }

  private isTerminalOutput: boolean = false; // ターミナル出力の状態を管理
  public terminalOutputCallback: ((chunk: string) => void) | null = null; // ターミナル出力のコールバック関数
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

  /**
   * シリアルポートからデータを読み取り、処理する
   * @param {ReadableStreamDefaultReader} reader - シリアルポートのリーダー
   */
  public async processReaderData(targetString: string | false): Promise<string> {
    let buffer = this.leftoverData; // 前回の未処理データを初期値として設定
    this.leftoverData = ''; // 未処理データをリセット
    const maxResultSize = 10000; // targetString が false の時保存する最大サイズ

    try {
      while (true) {
        const { value, done } = await this.streamRead();
        if (done) console.log('Stream closed', this.isTerminalOutput);
        if (done) break;
        const chunk = new TextDecoder('utf-8').decode(value);
        buffer += chunk;

        // バッファの最後の6文字をチェック
        const lastSixChars = buffer.slice(-6); // バッファの最後の6文字を取得
        if (lastSixChars.includes('>>>')) {
          console.log('!REPL prompt detected.');
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
