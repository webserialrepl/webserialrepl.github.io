export interface PortOption extends HTMLOptionElement {
  port: SerialPort;
}

export class SerialPortManager {
  public portSelector: HTMLSelectElement | undefined = undefined;
  public connectButton: HTMLButtonElement | undefined = undefined;
  private portCounter = 1;
  public picoport: SerialPort | undefined;
  public picoreader: ReadableStreamDefaultReader | undefined;
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

    if (localPort) {
      try {
        await localPort.close();
      } catch (e) {
        console.error(e);
      }
    }
    this.markDisconnected();
  }

  markDisconnected(): void {
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

  markConnected(): void {
    if (this.portSelector) {
      this.portSelector.disabled = true;
    }
    if (this.connectButton) {
      this.connectButton.textContent = 'Disconnect';
      this.connectButton.classList.remove('button-default');
      this.connectButton.disabled = false;
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

  releaseLock(): void {
    if (this.picowriter) {
      this.picowriter.releaseLock();
    }
  }

  async picowrite(data: Uint8Array) {
    await this.picowriter?.write(data);
  }
}