export interface PortOption extends HTMLOptionElement {
  port: SerialPort;
}

export class SerialPortManager {
  // イベント名を定義
  static readonly EVENT_CONNECTED = 'serialport-connected';
  static readonly EVENT_DISCONNECTED = 'serialport-disconnected';

  public portSelector: HTMLSelectElement | undefined = undefined;
  public connectButton: HTMLButtonElement | undefined = undefined;
  private portCounter = 1;
  public picoport: SerialPort | undefined;
  public picoreader: ReadableStreamDefaultReader | undefined = undefined;
  private picowriter: WritableStreamDefaultWriter | null = null;

  findPortOption(port: SerialPort): PortOption | null {
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

  addNewPort(port: SerialPort): PortOption {
    const portOption = document.createElement('option') as PortOption;
    portOption.textContent = `Port ${this.portCounter++}`;
    portOption.port = port;
    this.portSelector?.appendChild(portOption);
    return portOption;
  }

  maybeAddNewPort(port: SerialPort): PortOption {
    const portOption = this.findPortOption(port);
    if (portOption) {
      return portOption;
    }
    return this.addNewPort(port);
  }

  async getSelectedPort(): Promise<void> {
    if (this.portSelector?.value == 'prompt') {
      try {
        const serial = navigator.serial;
        this.picoport = await serial.requestPort({});
      } catch (e) {
        return;
      }
      const portOption = this.maybeAddNewPort(this.picoport);
      portOption.selected = true;
    } else {
      const selectedOption = this.portSelector?.selectedOptions[0] as PortOption;
      this.picoport = selectedOption.port;
    }
  }

  async disconnectFromPort(): Promise<void> {
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

  bbbbb_markDisconnected(): void {
    this.picoport = undefined;
    console.log('<DISCONNECTED>');
    if (this.portSelector) {
      this.portSelector.disabled = false;
    }
    if (this.connectButton) {
      this.connectButton.textContent = 'Connect';
      this.connectButton.classList.add('button-default');
      this.connectButton.disabled = false;
    }
  }

  bbbbb_markConnected(): void {
    if (this.portSelector) {
      this.portSelector.disabled = true;
    }
    if (this.connectButton) {
      this.connectButton.textContent = 'Disconnect';
      this.connectButton.classList.remove('button-default');
      this.connectButton.disabled = false;
    }
  }
  markDisconnected(): void {
    this.picoport = undefined;
    console.log('<DISCONNECTED>');

    // 接続解除イベントを発生
    document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_DISCONNECTED));

    if (this.portSelector) {
      this.portSelector.disabled = false;
    }
  }

  markConnected(): void {
    console.log('<CONNECTED>');

    // 接続イベントを発生
    document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_CONNECTED));

    if (this.portSelector) {
      this.portSelector.disabled = true;
    }
  }

  async openpicoport(): Promise<void> {
    await this.getSelectedPort();
    if (!this.picoport) {
      return;
    }
    this.markConnected();
    try {
      await this.picoport.open({ baudRate: 115200 });
      console.log('<CONNECTED>');
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        console.log(`<ERROR: ${e.message}>`);
      }
      this.markDisconnected();
      return;
    }
  }

  getWritablePort(): WritableStreamDefaultWriter | null {
    if (this.picoport && this.picoport.writable) {
      this.picowriter = this.picoport.writable.getWriter();
    } else {
      this.picowriter = null;
    }
    return this.picowriter;
  }

  releaseWritablePort(): void {
    if (this.picowriter) {
      this.picowriter.releaseLock();
    }
  }

  async picowrite(data: Uint8Array) {
    await this.picowriter?.write(data);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connect') as HTMLButtonElement;

  // 初期状態
  connectButton.disabled = false;

  // 接続イベントのリスナー
  document.addEventListener(SerialPortManager.EVENT_CONNECTED, () => {
    connectButton.textContent = 'Disconnect';
    connectButton.classList.remove('button-default');
  });

  // 接続解除イベントのリスナー
  document.addEventListener(SerialPortManager.EVENT_DISCONNECTED, () => {
    connectButton.textContent = 'Connect';
    connectButton.classList.add('button-default');
  });

});