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
  private serialPort: SerialPort | undefined;
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

    // 既存のポートを取得して追加
    const ports: SerialPort[] = await navigator.serial.getPorts();
    ports.forEach((port) => this.addNewPort(port));

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
  }
  
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

  private async getSelectedPort(): Promise<void> {
    if (this.portSelector?.value == 'prompt') {
      try {
        const serial = navigator.serial;
        this.serialPort = await serial.requestPort({});
      } catch (error) {
        console.error('Failed to request serial port:', error); // エラーログを追加
        return;
      }
      const portOption = this.maybeAddNewPort(this.serialPort);
      portOption.selected = true;
    } else {
      const selectedOption = this.portSelector?.selectedOptions[0] as PortOption;
      this.serialPort = selectedOption?.port ?? null;
    }
  }

  private async disconnectFromPort(): Promise<void> {
    const localPort = this.serialPort;
    this.serialPort = undefined;

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
      try {
        await localPort.close();
      } catch (e) {
        console.error(e);
      }
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

  private async openPort(): Promise<void> {
    await this.getSelectedPort();
    if (!this.serialPort) {
      console.error('No port selected');
      return;
    }
    if (this.portSelector) {
      this.portSelector.disabled = true;
    }
    try {
      await this.serialPort.open({ baudRate: 115200 });
      await new Promise(r => setTimeout(r, 100)); // 安定化のため少し待つ

      console.log('<CONNECTED>');
      // 接続イベントを発生
      document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_CONNECTED));
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        console.log(`<ERROR: ${e.message}>`);
      }
      this.markDisconnected();
      return;
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
  
    while (!this.serialPort?.readable) {
      if (retries >= maxRetries) {
        throw new Error('Readable port is not available. Ensure the port is open and readable.');
      }
      console.log(`Waiting for readable port... (${retries + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retries++;
    }
    this.serialReader = this.serialPort.readable.getReader();
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
    return await reader.read();
  }

}
