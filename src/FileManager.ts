import { DeviceCommunicator } from './DeviceCommunicator';
import * as monaco from 'monaco-editor';

export class FileManager {
  private device: DeviceCommunicator;
  private editor: monaco.editor.IStandaloneCodeEditor;

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

    // ファイル選択時にエディタに読み込む
    const loadFileButton2 = document.getElementById('loadFileButton2') as HTMLButtonElement;
    loadFileButton2.addEventListener('click', async () => {
      await this.loadSelectedFile(fileSelect);
    });

    // temp.py を読み込む
    const loadFileButton = document.getElementById('loadFileButton') as HTMLButtonElement;
    loadFileButton.addEventListener('click', async () => {
      await this.loadTempPy();
    });

    // ファイルを保存
    const saveFileButton = document.getElementById('saveFileButton') as HTMLButtonElement;
    saveFileButton.addEventListener('click', async () => {
      await this.saveFile();
    });
  }

  /**
   * ファイル一覧を <select> に表示
   */
  private async populateFileSelect(selectElement: HTMLSelectElement): Promise<void> {
    const files = await this.device.getPyFileList();
    selectElement.innerHTML = ''; // 既存のオプションをクリア

    if (files.length === 0) {
      const option = document.createElement('option');
      option.textContent = 'No .py files found';
      option.disabled = true;
      selectElement.appendChild(option);
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
      console.log(`Loaded file: ${selectedFile}`);
    } catch (error) {
      console.error(`Error loading file ${selectedFile}:`, error);
    }
  }

  /**
   * temp.py を読み込む
   */
  private async loadTempPy(): Promise<void> {
    const filename = 'temp.py';
    const file = await this.device.readFile(filename);
    if (file) {
      const text = new TextDecoder('utf-8').decode(file);
      this.editor.setValue(text);
    } else {
      console.error('Failed to read file:', filename);
    }
  }

  /**
   * エディタの内容をファイルに保存
   */
  private async saveFile(): Promise<void> {
    const text = this.editor.getValue();
    const binaryData = new TextEncoder().encode(text);
    await this.device.writeFile('temp.py', binaryData);
    console.log('File saved: temp.py');
  }
}