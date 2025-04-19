import { Terminal, ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { DeviceCommunicator } from './DeviceCommunicator'; // DeviceCommunicator をインポート

export class ReplTerminal extends Terminal {
  public fitAddon: FitAddon;
  private device: DeviceCommunicator;

  /**
   * REPL用ターミナルのコンストラクタ。
   * @param {ITerminalOptions} options - ターミナルのオプション設定。
   * @param {FitAddon} fitAddon - ターミナルのサイズを自動調整する FitAddon インスタンス。
   */


  constructor(options: ITerminalOptions, fitAddon: FitAddon, device: DeviceCommunicator) {
    super(options);

    // FitAddon を初期化し、ターミナルにロード。
    this.fitAddon = fitAddon;
    this.loadAddon(this.fitAddon);

    // Webリンクをクリック可能にするアドオンをロード。
    this.loadAddon(new WebLinksAddon());

    // DeviceCommunicator を保存
    this.device = device;

    // データ入力イベントをリッスンし、デバイスにコマンドを送信。
    this.onData(async (data) => {
      console.log('Data received:', data);
      // デバイスにデータを送信
      try {
        await this.device.sendCommand(data);
        console.log('Data sent to device:', data);
      } catch (error) {
        console.error('Error writing to device:', error);
      }
    });
  }
}