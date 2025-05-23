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
        await this.device.writeDevice(data);
        console.log('Data sent to device:', data);
      } catch (error) {
        console.error('Error writing to device:', error);
      }
    });
  }

  /**
   * ターミナルの初期化処理
   */
  public async initialize(): Promise<void> {

    const terminalElement = document.getElementById('terminal');

    // ターミナルを DOM に接続
    if (terminalElement) {
      terminalElement.style.height = '170px'; // 必要な高さに調整
      this.open(terminalElement);
      this.fitAddon.fit();
    }

    // ウィンドウリサイズ時にターミナルをリサイズ
    window.addEventListener('resize', () => {
      this.fitAddon.fit();
    });

    // ダウンロードボタンのクリックイベント
    const downloadOutput = document.getElementById('download') as HTMLButtonElement;
    downloadOutput.addEventListener('click', () => {
      this.downloadContents();
    });

    // クリアボタンのクリックイベント
    const clearOutput = document.getElementById('clear') as HTMLButtonElement;
    clearOutput.addEventListener('click', () => {
      this.clear();
    });
  }

  /**
   * ターミナルの内容をファイルにダウンロード
   */
  private downloadContents(): void {
    if (this.rows === 0) {
      console.log('No output yet');
      return;
    }

    this.selectAll();
    const contents = this.getSelection();
    this.clearSelection();
    const linkContent = URL.createObjectURL(
      new Blob([contents], { type: 'text/plain' })
    );
    const fauxLink = document.createElement('a');
    fauxLink.download = `terminal_content_${new Date().getTime()}.txt`;
    fauxLink.href = linkContent;
    fauxLink.click();
  }

  /**
   * ターミナルにメッセージを出力
   * @param {string} message - 出力するメッセージ
   * @param {'info' | 'error'} type - メッセージの種類 ('info' または 'error')
   */
  public logToTerminal(message: string, type: 'info' | 'error' = 'info'): void {
    if (type === 'error') {
      this.write(`\x1b[31m${message}\x1b[0m\r\n`); // 赤色で出力
    } else {
      this.write(`\x1b[32m${message}\x1b[0m\r\n`); // 緑色で出力
    }
  }
}