import { DeviceCommunicator } from './DeviceCommunicator';
import * as monaco from 'monaco-editor';
import { ReplTerminal } from './ReplTerminal';

export class FileManager {
  private device: DeviceCommunicator;
  private editor: monaco.editor.IStandaloneCodeEditor;
  private terminal: ReplTerminal; // ReplTerminal のインスタンスを保持
  private selectedFile: string | null = null; // 選択されたファイル名を保持
  private fileTreeDisplayed = false; // ファイルツリーが表示されているかどうか
  private files: string[] = []; // ファイル一覧を保持

  constructor(
    device: DeviceCommunicator,
    editor: monaco.editor.IStandaloneCodeEditor,
    terminal: ReplTerminal // ReplTerminal を受け取る
  ) {
    this.device = device;
    this.editor = editor;
    this.terminal = terminal; // インスタンスを保存
  }

  /**
   * 初期化処理
   */
  public async initialize(): Promise<void> {
    // ファイル一覧を取得して <select> に表示
    const refreshButton = document.getElementById('refreshFileList') as HTMLButtonElement;
    refreshButton.addEventListener('click', async () => {
      await this.populateFileSelect();
    });

    // REPLモードになったらボタンを有効化
    const runCodeButton = document.getElementById('runCodeButton') as HTMLButtonElement;
    document.addEventListener(DeviceCommunicator.EVENT_STATUS_CHANGED, async(event) => {
      const saveFileButton = document.getElementById('saveFileButton') as HTMLButtonElement;
      const newFileButton = document.getElementById('newFileButton') as HTMLButtonElement;
      const customEvent = event as CustomEvent; // CustomEvent 型にキャスト
      const { status } = customEvent.detail;
      const buttons = [refreshButton, saveFileButton, newFileButton, runCodeButton];
      if (status === 'REPL') {
        if (!this.fileTreeDisplayed) {
          await this.populateFileSelect();      // デバイスの中のファイル一覧を表示
        }
        buttons.forEach((button) => (button.disabled = false)); // ボタンを有効化
      } else {
        buttons.forEach((button) => (button.disabled = true)); // ボタンを無効化
      }
    });
    // 初期状態で無効化
    this.disableAllButtons();

  }

  /**
   * すべてのボタンを無効化する
   */
  public disableAllButtons(): void {
    // const fileSelect = document.getElementById('fileSelect') as HTMLSelectElement;
    const refreshButton = document.getElementById('refreshFileList') as HTMLButtonElement;
    const saveFileButton = document.getElementById('saveFileButton') as HTMLButtonElement;
    const newFileButton = document.getElementById('newFileButton') as HTMLButtonElement;
    const runCodeButton = document.getElementById('runCodeButton') as HTMLButtonElement;

    // 初期状態で無効化
    // fileSelect.disabled = true;
    refreshButton.disabled = true;
    saveFileButton.disabled = true;
    newFileButton.disabled = true;
    runCodeButton.disabled = true;
  }

  /**
   * ファイル一覧を 'file-tree' に表示
   */
  private async populateFileSelect(): Promise<void> {
    const filetree = document.getElementById('file-tree');
    if (!filetree) return;
    this.files = await this.device.getPyFileList();

    filetree.innerHTML = ''; // 既存の項目をクリア

    this.files.forEach((file) => {
      const item = document.createElement('sl-tree-item');
      item.textContent = file;
      item.value = file;
      filetree.appendChild(item);
    });
    this.fileTreeDisplayed = true; // ファイルツリーが表示されているかどうか
  }

  exists(filename: string): boolean {
    return this.files.includes(filename);
  }

  /**
   * 選択されたファイルをエディタに読み込む fileSelect
   */
  async readFile(filename: string): Promise<string | null> {
    try {
      const fileContent = await this.device.readFile(filename);
      const text = new TextDecoder('utf-8').decode(fileContent);
      return text;
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error);
      return null;
    }
  }

  private async loadSelectedFile(selectElement: HTMLSelectElement): Promise<void> {
    const selectedFile = selectElement.value;
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const fileContent = await this.device.readFile(selectedFile);
      const text = new TextDecoder('utf-8').decode(fileContent);
      this.editor.setValue(text);
      this.selectedFile = selectedFile; // 選択されたファイル名を保持

      // ファイル名を loadedfile ボタンに表示
      const loadedFileButton = document.getElementById('loadedfile') as HTMLButtonElement;
      if (loadedFileButton) {
        loadedFileButton.textContent = `${selectedFile}`;
      }

      console.log(`Loaded file: ${selectedFile}`);
      this.terminal.logToTerminal(`ファイル読込：${selectedFile}`, 'info'); // 成功メッセージを出力
    } catch (error) {
      console.error(`Error loading file ${selectedFile}:`, error);
      this.terminal.logToTerminal(`ファイル読込失敗："${this.selectedFile}": ${error}`); // エラーメッセージを出力
    }
  }

  /**
   * エディタの内容をファイルに保存
   */
  async saveContent(filename: string, text: string): Promise<void> {
    const binaryData = new TextEncoder().encode(text);
    try {
      await this.device.writeFile(filename, binaryData); // 選択されたファイルに保存
      console.log(`File saved: ${filename}`);
      this.terminal.logToTerminal(`File saved successfully: ${filename}`, 'info'); // 成功メッセージを出力

      // アスタリスクを削除
      //const loadedFileButton = document.getElementById('loadedfile') as HTMLButtonElement;
      //if (loadedFileButton) {
      //  loadedFileButton.textContent = this.selectedFile;
      //}

    } catch (error) {
      const err = error as Error;
      console.error(`Error saving file ${this.selectedFile}:`, err);
      this.terminal.logToTerminal(`Error saving file "${this.selectedFile}": ${err.message}`, 'error'); // エラーメッセージを出力
    }
  }

}