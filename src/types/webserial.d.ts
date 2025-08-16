interface SerialPort {
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  readable?: ReadableStream<Uint8Array>;
  writable?: WritableStream<Uint8Array>;
  getInfo?(): any;
  addEventListener(type: 'connect' | 'disconnect', listener: (event: any) => void): void;
  removeEventListener(type: 'connect' | 'disconnect', listener: (event: any) => void): void;
}
interface Navigator {
  serial: {
    getPorts(): Promise<SerialPort[]>;
    requestPort(options?: {}): Promise<SerialPort>;
    addEventListener(type: 'connect' | 'disconnect', listener: (event: any) => void): void;
  };
}