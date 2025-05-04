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
  public picoport: SerialPort | undefined;
  public picoreader: ReadableStreamDefaultReader | undefined = undefined;
  private picowriter: WritableStreamDefaultWriter | null = null;

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
        this.connectButton.textContent = 'Disconnect';
        this.connectButton.classList.remove('button-default');
      }
    });

    // 接続解除イベントのリスナー
    document.addEventListener(SerialPortManager.EVENT_DISCONNECTED, () => {
      if (this.connectButton) {
        this.connectButton.textContent = 'Connect';
        this.connectButton.classList.add('button-default');
      }
    });

    // 既存のポートを取得して追加
    const ports: SerialPort[] = await navigator.serial.getPorts();
    ports.forEach((port) => this.addNewPort(port));

    // 接続ボタンのクリックイベント
    if (this.connectButton) {
      this.connectButton.addEventListener('click', async () => {
        if (this.picoport) {
          await this.disconnectFromPort();
        } else {
          await this.openpicoport(); // ポートを開く
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
        this.picoport = await serial.requestPort({});
      } catch (error) {
        console.error('Failed to request serial port:', error); // エラーログを追加
        return;
      }
      const portOption = this.maybeAddNewPort(this.picoport);
      portOption.selected = true;
    } else {
      const selectedOption = this.portSelector?.selectedOptions[0] as PortOption;
      this.picoport = selectedOption?.port ?? null;
    }
  }

  private async disconnectFromPort(): Promise<void> {
    const localPort = this.picoport;
    this.picoport = undefined;

    if (this.picoreader) {
      await this.picoreader.cancel();
    }
    this.picowriter?.releaseLock();
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
    this.picoport = undefined;
    console.log('<DISCONNECTED>');

    // 接続解除イベントを発生
    document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_DISCONNECTED));

    if (this.portSelector) {
      this.portSelector.disabled = false;
    }
  }

  private async openpicoport(): Promise<void> {
    await this.getSelectedPort();
    if (!this.picoport) {
      console.error('No port selected');
      return;
    }
    if (this.portSelector) {
      this.portSelector.disabled = true;
    }
    try {
      await this.picoport.open({ baudRate: 115200 });
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
    if (this.picoport && this.picoport.writable) {
      this.picowriter = this.picoport.writable.getWriter();
    } else {
      this.picowriter = null;
    }
    return this.picowriter;
  }

  public async picowrite(data: Uint8Array) {
    await this.picowriter?.write(data);
  }
}
