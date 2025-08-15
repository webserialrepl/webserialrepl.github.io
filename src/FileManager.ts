import { DeviceCommunicator } from './DeviceCommunicator';
import * as monaco from 'monaco-editor';
import { ReplTerminal } from './ReplTerminal';

export class FileManager {
  private device: DeviceCommunicator;
  private editor: monaco.editor.IStandaloneCodeEditor;
  private terminal: ReplTerminal; // ReplTerminal のインスタンスを保持
  private selectedFile: string | null = null; // 選択されたファイル名を保持
  private fileTreeDisplayed = false; // ファイルツリーが表示されているかどうか

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


    // ファイルをコピー
    const copyFileButton = document.getElementById('copyFileButton') as HTMLButtonElement;
    copyFileButton.addEventListener('click', async () => {
      await this.copyFile();
    });


    // REPLモードになったらボタンを有効化
    const runCodeButton = document.getElementById('runCodeButton') as HTMLButtonElement;
    document.addEventListener(DeviceCommunicator.EVENT_STATUS_CHANGED, async(event) => {
      const saveFileButton = document.getElementById('saveFileButton') as HTMLButtonElement;

      const customEvent = event as CustomEvent; // CustomEvent 型にキャスト
      const { status } = customEvent.detail;
      const buttons = [refreshButton, saveFileButton, copyFileButton, runCodeButton];
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
    const copyFileButton = document.getElementById('copyFileButton') as HTMLButtonElement;
    const runCodeButton = document.getElementById('runCodeButton') as HTMLButtonElement;

    // 初期状態で無効化
    // fileSelect.disabled = true;
    refreshButton.disabled = true;
    saveFileButton.disabled = true;
    copyFileButton.disabled = true;
    runCodeButton.disabled = true;
  }

  /**
   * ファイル一覧を 'file-tree' に表示
   */
  private async populateFileSelect(): Promise<void> {
    const filetree = document.getElementById('file-tree');
    if (!filetree) return;
    const files = await this.device.getPyFileList();

    filetree.innerHTML = ''; // 既存の項目をクリア

    files.forEach((file) => {
      const item = document.createElement('sl-tree-item');
      item.textContent = file;
      item.value = file;
      filetree.appendChild(item);
    });
    this.fileTreeDisplayed = true; // ファイルツリーが表示されているかどうか
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

  /**
   * ファイルをコピーして新しいファイルとして保存
   */
  private async copyFile(): Promise<void> {
    if (!this.selectedFile) {
      console.error('No file selected for copying');
      return;
    }

    // 新しいファイル名を入力させる
    const newFileName = prompt('Enter a new file name:', `${this.selectedFile}`);
    if (!newFileName) {
      console.log('File copy canceled');
      return;
    }

    // 拡張子がない場合は .py を付加
    const finalFileName = newFileName.includes('.') ? newFileName : `${newFileName}.py`;

    // ファイル名が一覧にあるかチェック
    const fileSelect = document.getElementById('fileSelect') as HTMLSelectElement;
    const existingFiles = Array.from(fileSelect.options).map((option) => option.value);
    if (existingFiles.includes(finalFileName)) {
      const overwrite = confirm(`The file "${finalFileName}" already exists. Overwrite?`);
      if (!overwrite) {
        console.log('File copy canceled');
        return;
      }
    }

    // 現在のエディタの内容を新しいファイルとして保存
    const text = this.editor.getValue();
    const binaryData = new TextEncoder().encode(text);
    try {
      await this.device.writeFile(finalFileName, binaryData); // 新しいファイルとして保存
      console.log(`File copied to: ${finalFileName}`);

      // ファイル一覧に新しいファイルを追加
      const option = document.createElement('option');
      option.value = finalFileName;
      option.textContent = finalFileName;
      fileSelect.appendChild(option);

      // 新しいファイルをエディタに表示
      this.selectedFile = finalFileName;
      const loadedFileButton = document.getElementById('loadedfile') as HTMLButtonElement;
      if (loadedFileButton) {
        loadedFileButton.textContent = finalFileName;
      }
    } catch (error) {
      console.error(`Error copying file to ${finalFileName}:`, error);
    }
  }

}