import { DeviceCommunicator } from './DeviceCommunicator';
import * as monaco from 'monaco-editor';

export class FileManager {
  private device: DeviceCommunicator;
  private editor: monaco.editor.IStandaloneCodeEditor;
  private selectedFile: string | null = null; // 選択されたファイル名を保持

  constructor(device: DeviceCommunicator, editor: monaco.editor.IStandaloneCodeEditor) {
    this.device = device;
    this.editor = editor;
  }

  /**
   * 初期化処理
   */
  public async initialize(): Promise<void> {
    const fileSelect = document.getElementById('fileSelect') as HTMLSelectElement;

    // ファイル一覧を取得して <select> に表示
    const refreshButton = document.getElementById('refreshFileList') as HTMLButtonElement;
    refreshButton.addEventListener('click', async () => {
      await this.populateFileSelect(fileSelect);
    });

    // ファイルをセレクトしたら自動的に読み込む
    fileSelect.addEventListener('change', async () => {
      await this.loadSelectedFile(fileSelect);
    });

    // ファイルを保存
    const saveFileButton = document.getElementById('saveFileButton') as HTMLButtonElement;
    saveFileButton.addEventListener('click', async () => {
      await this.saveFile();
    });

    // ファイルをコピー
    const copyFileButton = document.getElementById('copyFileButton') as HTMLButtonElement;
    copyFileButton.addEventListener('click', async () => {
      await this.copyFile();
    });

    // CTRL+S ショートカットを登録
    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, async () => {
      await this.saveFile();
    });

    // エディタの内容が変更されたときにファイル名にアスタリスクを追加
    this.editor.onDidChangeModelContent(() => {
      const loadedFileButton = document.getElementById('loadedfile') as HTMLButtonElement;
      if (loadedFileButton && this.selectedFile) {
        if (!loadedFileButton.textContent?.includes('*')) {
          loadedFileButton.textContent = `${this.selectedFile} *`; // アスタリスクを追加
        }
      }
    });

    // REPLモードになったらボタンを有効化
    const runCodeButton = document.getElementById('runCodeButton') as HTMLButtonElement;
    document.addEventListener(DeviceCommunicator.EVENT_STATUS_CHANGED, (event) => {
      const customEvent = event as CustomEvent; // CustomEvent 型にキャスト
      const { status } = customEvent.detail;
      const buttons = [fileSelect, refreshButton, saveFileButton, copyFileButton, runCodeButton];
      if (status === 'REPL') {
        buttons.forEach((button) => (button.disabled = false)); // ボタンを有効化
      } else {
        buttons.forEach((button) => (button.disabled = true)); // ボタンを無効化
      }
    });
    // 初期状態で無効化
    fileSelect.disabled = true;
    refreshButton.disabled = true;
    saveFileButton.disabled = true;
    copyFileButton.disabled = true;
    runCodeButton.disabled = true;

  }

  /**
   * ファイル一覧を <select> に表示
   */
  private async populateFileSelect(selectElement: HTMLSelectElement): Promise<void> {
    const files = await this.device.getPyFileList();
    selectElement.innerHTML = ''; // 既存のオプションをクリア

    // デフォルトのオプションを追加
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'ファイル読込...';
    defaultOption.value = ''; // 空の値を設定
    defaultOption.disabled = true; // 選択不可にする
    defaultOption.selected = true; // デフォルトで選択状態にする
    selectElement.appendChild(defaultOption);

    if (files.length === 0) {
      const noFilesOption = document.createElement('option');
      noFilesOption.textContent = 'No files available';
      noFilesOption.disabled = true;
      selectElement.appendChild(noFilesOption);
      return;
    }

    files.forEach((file) => {
      const option = document.createElement('option');
      option.value = file;
      option.textContent = file;
      selectElement.appendChild(option);
    });
  }

  /**
   * 選択されたファイルをエディタに読み込む
   */
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
    } catch (error) {
      console.error(`Error loading file ${selectedFile}:`, error);
    }
  }

  /**
   * エディタの内容をファイルに保存
   */
  private async saveFile(): Promise<void> {
    if (!this.selectedFile) {
      console.error('No file selected for saving');
      return;
    }

    const text = this.editor.getValue();
    const binaryData = new TextEncoder().encode(text);
    try {
      await this.device.writeFile(this.selectedFile, binaryData); // 選択されたファイルに保存
      console.log(`File saved: ${this.selectedFile}`);

      // アスタリスクを削除
      const loadedFileButton = document.getElementById('loadedfile') as HTMLButtonElement;
      if (loadedFileButton) {
        loadedFileButton.textContent = this.selectedFile;
      }

    } catch (error) {
      console.error(`Error saving file ${this.selectedFile}:`, error);
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