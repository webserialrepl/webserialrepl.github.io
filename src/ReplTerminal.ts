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

    // onKey をこのクラスの中で定義
    this.onKey(({ key, domEvent }) => {
      // 通常文字だけエコー
      if (
        !domEvent.altKey &&
        !domEvent.ctrlKey &&
        !domEvent.metaKey &&
        domEvent.key.length === 1
      ) {
        this.write(key);
      } else {
        // 特殊キーは必要に応じて処理
        switch (domEvent.key) {
          case 'Enter':
            this.write('\r\n');
            break;
          case 'Backspace':
            this.write('\b \b');
            break;
          default:
            // 矢印キーなどは無視
            break;
        }
      }
    });

    // データ入力イベントをリッスンし、デバイスにコマンドを送信。
    this.onData(async (data) => {
      try {
        console.log('onData:', data);
        await this.device.writeDevice(data);   // REPLに送信
        if (data === '\x7f' || data === '\x08') {
          // Backspace
          //this.write('\b \b');          // 表示補正
          //await this.device.writeDevice('\x08'); // REPLに送信
        } else if (data === '\r' || data === '\n') {
          // Enter
          //this.write('\r\n');           // 表示補正
          //await this.device.writeDevice('\r');   // REPLに送信
        } else if (data === '\x1b[D') {
          // 左矢印 → REPLには送らない
          //this.write('\x1b[D');         // ターミナル上だけカーソル移動
        } else if (data === '\x1b[C') {
          // 右矢印 → REPLには送らない
          //this.write('\x1b[C');
        } else {
          // 通常文字
          //this.write(data);             // エコーバック
        }
      } catch (error) {
        console.error('Error writing to device:', error);
      }
    });
/*
    this.onData(async (data) => {
      try {
        // Backspaceキー（DELやBS）
        if (data === '\x7f' || data === '\x08') {
          // デバイスがバックスペースを理解するなら送信
          // ターミナル表示を補正（1文字消す）
          this.write('\b \b');
          console.log('Backspace sent to device');

          } else if (data === '\x1b[D') {
          // 左矢印
          // デバイスに送るかどうかは仕様次第
          // 画面上でカーソルを左に移動
          this.write('\x1b[D');
        } else if (data === '\x1b[C') {
          // 右矢印
          this.write('\x1b[C');
        } else {
          // その他の通常文字
          this.write(data); // エコーバック
        }
        await this.device.writeDevice(data);
      } catch (error) {
        console.error('Error writing to device:', error);
      }
    });
*/

  }

  /**
   * ターミナルの初期化処理
   */
  public async initialize(): Promise<void> {

    const terminalElement = document.getElementById('terminal');

    // ターミナルを DOM に接続
    if (terminalElement) {
      terminalElement.style.height = '240px'; // 必要な高さに調整 170px --> 240px
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