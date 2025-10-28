export interface PortOption extends HTMLOptionElement {
  port: SerialPort;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const DEFAULT_MAX_RESULT = 10000;
function log(msg: string): void {
  // const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  console.log(msg);
}

export class SerialPortManager {
  static readonly EVENT_CONNECTED = 'serialport-connected';
  static readonly EVENT_DISCONNECTED = 'serialport-disconnected';

  private connectButton: HTMLButtonElement | undefined = undefined;
  private serialPort: SerialPort | undefined = undefined;
  private serialReader: ReadableStreamDefaultReader | null = null;
  private serialWriter: WritableStreamDefaultWriter | null = null;
  private reading:boolean = false; // 読み取り中かどうかのフラグ
  // 単一バックグラウンドループ用の状態
  private backgroundLoopRunning: boolean = false;
  private receiveBuffer: string = '';
  private lastTrimLogAt: number | null = null;
  private receiveBufferTrimmed: boolean = false; // true when buffer was trimmed due to maxSize
  private waiters: Array<{ target: string; resolve: (s: string) => void; reject: (e: any) => void; maxSize?: number; }> = [];
  private terminalOutputCallback: ((chunk: string) => void) | null = null; // ターミナル出力のコールバック関数
  private isTerminalOutput: boolean = false; // ターミナル出力の状態を管理
  private leftoverData: string = ''; // 未処理のデータを保持
  private replStatus: 'REPL' | 'RUNNING' | null = null;

  constructor(callback: ((chunk: string) => void) | null = null) {
    this.terminalOutputCallback = callback;
  }

  /**
   * Return whether the receive buffer was trimmed since last check and clear the flag.
   * Callers should call this right after a startReadLoop resolves to detect data loss.
   */
  public consumeTrimFlag(): boolean {
    const v = this.receiveBufferTrimmed;
    this.receiveBufferTrimmed = false;
    return v;
  }

  // 初期化処理をまとめたメソッド
  public async initialize(): Promise<void> {

    this.connectButton = document.getElementById('connect') as HTMLButtonElement;
    if (this.connectButton) {
      this.connectButton.disabled = false;
      // 接続ボタンのクリックイベント
      this.connectButton.addEventListener('click', async () => {
        if (this.serialPort) {
          await this.disconnect();
        } else {
          await this.connect(); // ポートを開く
        }
      });
    }
  }

  // UIを切断状態に設定
  private setUiDisconnected(): void {
    this.serialPort = undefined;
    console.log('<DISCONNECTED>');
    // 接続ボタンの表示を更新
    if (this.connectButton) {
      this.connectButton.textContent = 'せつぞく';
      this.connectButton.classList.add('button-default');
    }
    // 接続解除イベントを発生
    document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_DISCONNECTED));

  }

  // シリアル接続の切断処理
  private async cleanup() {
    try { await this.stopReadLoop(); } catch {}
    try {
      if (this.serialPort) {
        this.serialPort.removeEventListener?.('disconnect', this.onDisconnect);
        await this.serialPort.close();
      }
    } catch (err) {
      log(`クローズ時エラー: ${err}`);
    } finally {
      this.serialPort = undefined;
      this.setUiDisconnected();
    }
  }

  private onDisconnect = (e: any) => {
    log('デバイス切断検出');
    this.cleanup();
  };

  private async disconnect() {
    await this.cleanup();
    log('手動で切断しました');
  }


  private async disconnectFromPort(): Promise<void> {
    console.log('Disconnecting from port...');
    const localPort = this.serialPort;
    this.serialPort = undefined;
    try {
      if (this.serialReader) {
        await this.serialReader.cancel();
        this.serialReader.releaseLock();
        this.serialReader = null;
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
    this.setUiDisconnected();
  }

  private async connect(): Promise<void> {

    this.reading = false; // 読み取り中かどうかのフラグ
    this.isTerminalOutput = false; // ターミナル出力の状態を管理
    this.leftoverData = ''; // 未処理のデータを保持
    this.replStatus = null; // REPLステータスを初期化

    try {
      const port = await navigator.serial.requestPort();
      this.serialPort = port;
      const baudRate = 115200;
      await port.open({ baudRate });
      await new Promise(r => setTimeout(r, 300));
      console.log('<CONNECTED>', port);
      this.isTerminalOutput = true;
      this.startReadLoop(false, 0x03); // await は無し
      
      port.addEventListener?.('disconnect', this.onDisconnect);

      if (this.connectButton) {
        this.connectButton.textContent = 'せつだん';
        this.connectButton.classList.remove('button-default');
      }
      // 接続イベントを発生
      document.dispatchEvent(new CustomEvent(SerialPortManager.EVENT_CONNECTED));
    } catch (e) {
      if (e instanceof Error) {
        console.error(`<ERROR: ${e.message}>`);
      }
      this.setUiDisconnected();
    }
  }

  private async stopReadLoop() {
    this.reading = false;
    if (this.serialReader) {
      try { await this.serialReader.cancel(); } catch {}
      try { this.serialReader.releaseLock(); } catch {}
      this.serialReader = null;
    }
  }

  public async resetReader(): Promise<void> {
    await this.stopReadLoop();
    console.log('stopReadLoop called');
  }


  private async streamRead(): Promise<ReadableStreamReadResult<Uint8Array>> {
    const reader = this.serialReader;
    if (!reader) {
        throw new Error('Reader is not available.');
    }
    const { value, done } = await reader.read();
    //console.log('Received chunk:', value, done); // デバッグ用
    console.log('Received chunk:', value?.length, done); // デバッグ用
    return { value, done };
  }

  private updateStatus(newStatus: 'REPL' | 'RUNNING'): void {
    if (this.replStatus !== newStatus) {
      this.replStatus = newStatus;
      console.log(`Status changed to: ${newStatus}`);
      document.dispatchEvent(new CustomEvent('REPL_STATUS_CHANGED', { detail: { status: newStatus } }));
    }
  }
  public getStatus(): 'REPL' | 'RUNNING' | null {
    return this.replStatus;
  }

  public setTerminalOutputEnabled(enabled: boolean): void {
    this.isTerminalOutput = enabled;
  }

    public async send(data:string): Promise<void> {
      if (!this.serialPort?.writable) {
        log('送信できません（未接続）');
        return;
      }
      try {
        const writer = this.serialPort.writable.getWriter();
        const packet = encoder.encode(data);
        await writer.write(packet);
        await writer.close();
        writer.releaseLock();
        log(`TX(${packet.length}B): ${JSON.stringify(data)}`);
      } catch (err) {
        log(`送信エラー: ${err}`);
      }
    }

    // 送信制御文字用関数を追加
    public async sendControl(asciiCode: number): Promise<void> {
      if (!this.serialPort?.writable) {
        log('送信できません（未接続）');
        return;
      }
      try {
        let writer = this.serialWriter;
        if (!writer) {
          writer = this.serialPort.writable.getWriter();
        }
        //console.log("send:", port, writer)
        const packet = new Uint8Array([asciiCode]); // バイナリ直接
        await writer.write(packet);
        await writer.close();
        writer.releaseLock();
        writer = null;
        log(`TX control: 0x${asciiCode.toString(16).padStart(2, '0')}`);
      } catch (err) {
        log(`送信エラー: ${err}`);
      }
    }

  /**
   * シリアルポートからデータを読み取り、処理する
   * @param {ReadableStreamDefaultReader} reader - シリアルポートのリーダー
   */
  public async startReadLoop(targetString: string | false = false, command:any, options?: { maxSize?: number }): Promise<string> {
    // 既にバックグラウンドループを走らせるようにしておき、
    // targetString が指定された場合は waiter を登録して待機する動作に変更します。

    // まずコマンドがあれば送信
    if (command) {
      console.log('Ctrl 送信', command);
      await this.sendControl(command);
    }

    // バックグラウンドループが未起動なら起動
    if (!this.backgroundLoopRunning) {
      // fire-and-forget でバックグラウンドループを開始
      this.startBackgroundLoop().catch((e) => console.error('Background loop error:', e));
    }

    // targetString が false の場合は単にバックグラウンドを動かすのみ
    if (targetString === false) {
      return '';
    }

    // targetString が指定されたら waiter を作成して待つ
    return await new Promise<string>((resolve, reject) => {
      const maxSize = options?.maxSize ?? DEFAULT_MAX_RESULT;
      this.waiters.push({ target: targetString as string, resolve, reject, maxSize });
    });
  }

  // 単一のバックグラウンド読み取りループ
  private async startBackgroundLoop(): Promise<void> {
    if (this.backgroundLoopRunning) return;
    if (!this.serialPort?.readable) {
      console.error('serialPort.readable is not available for background loop');
      return;
    }
    if (!this.serialReader) {
      this.serialReader = this.serialPort.readable.getReader();
    }
    this.backgroundLoopRunning = true;
    this.reading = true;
    console.log('受信バックグラウンドループ開始', this.isTerminalOutput);

    try {
      while (this.reading) {
        const { value, done } = await this.streamRead();
        if (done) {
          console.log('Stream closed', this.isTerminalOutput);
          break;
        }
        if (!value) continue;
        const chunk = new TextDecoder('utf-8').decode(value);
        // デバッグ用に生のバイト列のログを入れたい場合はここを有効化
        // console.log(new Date().toISOString(), 'RX HEX:', Array.from(value).map(b => b.toString(16).padStart(2,'0')).join(' '));

        // 受信バッファに追加
        // - waiters が存在する場合は全文を蓄積して target 検出に備える
        // - waiters がない場合は、プロンプト検出等のために短めのスライディングウィンドウだけ保持する
        if (this.waiters.length > 0) {
          this.receiveBuffer += chunk;
        } else {
          // keep only small tail to avoid unbounded growth when no waiters
          const TAIL_SIZE = 512; // chars
          this.receiveBuffer = (this.receiveBuffer + chunk).slice(-TAIL_SIZE);
        }

        // REPL プロンプト判定
        const lastSixChars = this.receiveBuffer.slice(-6);
        if (lastSixChars.includes('>>>')) {
          this.updateStatus('REPL');
        } else {
          this.updateStatus('RUNNING');
        }

        // UI 出力
        if (this.isTerminalOutput && this.terminalOutputCallback) {
          const sanitizedChunk = chunk.replace(/[^\x20-\x7E\u3000-\u9FFF\uFF00-\uFFEF\r\n]/g, '');
          this.terminalOutputCallback(sanitizedChunk);
        }

        // waiters をチェックして最も早くマッチするものを解決
        let matched = true;
        while (matched) {
          matched = false;
          let earliestIndex = -1;
          let earliestWaiterIdx = -1;
          for (let i = 0; i < this.waiters.length; i++) {
            const w = this.waiters[i];
            const idx = this.receiveBuffer.indexOf(w.target);
            if (idx >= 0 && (earliestIndex === -1 || idx < earliestIndex)) {
              earliestIndex = idx;
              earliestWaiterIdx = i;
            }
          }
          if (earliestWaiterIdx >= 0) {
            const w = this.waiters.splice(earliestWaiterIdx, 1)[0];
            const idx = earliestIndex;
            const before = this.receiveBuffer.slice(0, idx);
            const after = this.receiveBuffer.slice(idx + w.target.length);
            // consume buffer and save leftover
            this.receiveBuffer = '';
            this.leftoverData = after;
            try {
              w.resolve(before);
            } catch (e) {
              w.reject(e);
            }
            matched = true;
          }
        }
        // バッファ制限: waiters が居る場合は各 waiter の maxSize を参照して上限を決定
        let currentMax = DEFAULT_MAX_RESULT;
        if (this.waiters.length > 0) {
          currentMax = this.waiters.reduce((m, w) => Math.max(m, w.maxSize ?? DEFAULT_MAX_RESULT), DEFAULT_MAX_RESULT);
        }
        if (this.receiveBuffer.length > currentMax) {
          // Mark that we trimmed the buffer so callers can detect data loss
          this.receiveBufferTrimmed = true;
          this.receiveBuffer = this.receiveBuffer.slice(this.receiveBuffer.length - currentMax);
          // Rate-limit trim logs to avoid spamming the console
          const now = Date.now();
          if (!this.lastTrimLogAt || now - this.lastTrimLogAt > 5000) {
            this.lastTrimLogAt = now;
            console.warn('Receive buffer exceeded maximum limit. Trimming...');
          }
        }
      }
    } catch (error) {
      console.error('Error processing reader data in background loop:', error);
    } finally {
      this.backgroundLoopRunning = false;
      this.reading = false;
      // 残っている waiter を拒否
      while (this.waiters.length) {
        const w = this.waiters.shift()!;
        w.reject(new Error('Background loop terminated before target found'));
      }
      // リーダーのクリーンアップ
      try {
        if (this.serialReader) {
          try { await this.serialReader.cancel(); } catch {}
          try { this.serialReader.releaseLock(); } catch {}
          this.serialReader = null;
        }
      } catch (e) {
        console.error('Error cleaning up reader:', e);
      }
    }
  }


}
