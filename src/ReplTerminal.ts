import { Terminal, ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

export class ReplTerminal extends Terminal {
  public fitAddon: FitAddon;

  /**
   * REPL用ターミナルのコンストラクタ。
   * @param {ITerminalOptions} options - ターミナルのオプション設定。
   * @param {FitAddon} fitAddon - ターミナルのサイズを自動調整する FitAddon インスタンス。
   */


  constructor(options: ITerminalOptions, fitAddon: FitAddon) {
    super(options);

    // FitAddon を初期化し、ターミナルにロード。
    this.fitAddon = fitAddon;
    this.loadAddon(this.fitAddon);

    // Webリンクをクリック可能にするアドオンをロード。
    this.loadAddon(new WebLinksAddon());

    // データ入力イベントをリッスンし、デバイスにコマンドを送信。
    this.onData((data) => {
      console.log('Data received:', data);
      // ターミナルにデータを書き込む
      this.write(data);
    });
  }
}