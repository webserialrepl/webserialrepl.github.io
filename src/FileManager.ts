import { DeviceCommunicator } from './DeviceCommunicator';
import { ReplTerminal } from './ReplTerminal';

export class FileManager {
  private device: DeviceCommunicator;
  private terminal: ReplTerminal; // ReplTerminal のインスタンスを保持
  private selectedFile: string | null = null; // 選択されたファイル名を保持
  private fileTreeDisplayed = false; // ファイルツリーが表示されているかどうか
  private files: string[] = []; // ファイル一覧を保持

  constructor(
    device: DeviceCommunicator,
    terminal: ReplTerminal // ReplTerminal を受け取る
  ) {
    this.device = device;
    this.terminal = terminal; // インスタンスを保存
  }

  /**
   * 初期化処理
   */
  public async initialize(): Promise<void> {
    // REPLモードになったらボタンを有効化
    document.addEventListener('REPL_STATUS_CHANGED', async(event) => {
      const refreshButton = document.getElementById('refreshFileList') as HTMLButtonElement;
      const saveFileButton = document.getElementById('saveFileButton') as HTMLButtonElement;
      const newFileButton = document.getElementById('newFileButton') as HTMLButtonElement;
      const runCodeButton = document.getElementById('runCodeButton') as HTMLButtonElement;
      const customEvent = event as CustomEvent; // CustomEvent 型にキャスト
      const { status } = customEvent.detail;
      const buttons = [refreshButton, saveFileButton, newFileButton, runCodeButton];
      if (status === 'REPL') {
        console.log("<REPL> mode activated");
        if (!this.fileTreeDisplayed) {
          await this.fileList();      // デバイスの中のファイル一覧を表示
        }
        buttons.forEach((button) => (button.disabled = false)); // ボタンを有効化
      } else {
        buttons.forEach((button) => (button.disabled = true)); // ボタンを無効化
      }
    });
    // 初期状態で無効化
    this.disableAllButtons();
    // コンテキストメニューの初期化
    this.setupContextMenu();

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

    // 既存のファイルツリーを安全にクリア（要素が存在する場合のみ）
    const filetreeElement = document.getElementById('file-tree');
    if (filetreeElement) {
      // innerHTML を直接上書きする代わりに子ノードを削除して安全性を高める
      while (filetreeElement.firstChild) {
        filetreeElement.removeChild(filetreeElement.firstChild);
      }
    }
    this.fileTreeDisplayed = false; // ファイルツリーが表示されているかどうか
  }

  /**
   * ファイル一覧を 'file-tree' に表示
   */
  async fileList(): Promise<void> {
    const filetree = document.getElementById('file-tree');
    if (!filetree) return;
    const newFiles = await this.device.getFileList();

    // デバイスから空リストが返ってきた場合、通信エラーなどの可能性がある。
    // 既に表示中のファイル一覧があるなら上書きせず保持する。
    if (newFiles.length === 0 && this.files.length > 0) {
      console.warn('getFileList returned empty; keeping existing file tree');
      return;
    }

    this.files = newFiles;

    // 既存の項目をクリアしてからビルド
    this.clearTree(filetree);
    this.buildTree(this.files, filetree);
    this.fileTreeDisplayed = true;
  }

  // --- コンテキストメニュー処理 ---
  private contextMenuElement: HTMLElement | null = null;

  private setupContextMenu(): void {
    // sl-tree 自体はコンテンツの高さしか持たないため、空白部分での右クリックも
    // 拾えるように、一回り外側の file-panel 全体にリスナーを付ける
    const filePanel = document.getElementById('file-panel');
    if (!filePanel) return;

    filePanel.addEventListener('contextmenu', (ev) => {
      const target = ev.target as HTMLElement | null;
      if (!target) return;
      ev.preventDefault();
      // sl-tree-item の要素を探す
      const item = target.closest && (target.closest('sl-tree-item') as HTMLElement | null);
      if (!item) {
        // 項目のない空白部分を右クリックした場合はルートディレクトリを対象にする
        this.showContextMenu(ev.clientX, ev.clientY, '', false);
        return;
      }
      const isFile = item.getAttribute && item.getAttribute('data-is-file') === '1';
      const path = item.getAttribute('data-path') || '';
      this.showContextMenu(ev.clientX, ev.clientY, path, isFile);
    });

    // クリックで非表示
    document.addEventListener('click', () => this.hideContextMenu());
    window.addEventListener('blur', () => this.hideContextMenu());
  }

  private showContextMenu(x: number, y: number, path: string, isFile: boolean) {
    this.hideContextMenu();
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    menu.style.background = 'white';
    menu.style.border = '1px solid #444';
    menu.style.zIndex = '10000';
    menu.style.padding = '4px';
    menu.style.borderRadius = '4px';

    const addMenuItem = (label: string, onClick: (e: MouseEvent) => void) => {
      const el = document.createElement('div');
      el.textContent = label;
      el.style.padding = '6px 12px';
      el.style.cursor = 'pointer';
      el.onclick = onClick;
      menu.appendChild(el);
      return el;
    };

    if (isFile) {
      addMenuItem('名前を変更', async (e) => {
        e.stopPropagation();
        this.hideContextMenu();
        const newName = prompt('新しいファイル名を入力：', path.split('/').pop() || path);
        if (!newName) return;
        // 新しいフルパスは同じディレクトリに置く
        const dir = path.includes('/') ? path.substring(0, path.lastIndexOf('/')) : '';
        const newPath = dir ? `${dir}/${newName}` : newName;
        if (this.fileExists(newPath)) {
          alert('同名のファイルが既に存在します');
          return;
        }
        try {
          await this.device.renameFile(path, newPath);
          await this.fileList();
        } catch (err) {
          console.error('rename failed', err);
          try { this.terminal.logToTerminal(`Rename failed: ${String(err)}`, 'error'); } catch {}
          alert('名前変更に失敗しました: ' + String(err));
        }
      });

      addMenuItem('削除', async (e) => {
        e.stopPropagation();
        this.hideContextMenu();
        const ok = confirm(`本当にファイルを削除しますか？\n${path}`);
        if (!ok) return;
        try {
          await this.device.deleteFile(path);
          await this.fileList();
        } catch (err) {
          console.error('delete failed', err);
          try { this.terminal.logToTerminal(`Delete failed: ${String(err)}`, 'error'); } catch {}
          alert('削除に失敗しました: ' + String(err));
        }
      });
    } else {
      // フォルダ、またはツリーの空白部分（= ルートディレクトリ）を右クリックした場合
      const dirPath = path; // フォルダ自身のパス、ルートの場合は ''

      addMenuItem('新しいフォルダを作成', async (e) => {
        e.stopPropagation();
        this.hideContextMenu();
        const name = prompt('新しいフォルダ名を入力：');
        if (!name) return;
        const newPath = dirPath ? `${dirPath}/${name}` : name;
        try {
          await this.device.createDirectory(newPath);
          await this.fileList();
        } catch (err) {
          console.error('create directory failed', err);
          try { this.terminal.logToTerminal(`Create directory failed: ${String(err)}`, 'error'); } catch {}
          alert('フォルダの作成に失敗しました: ' + String(err));
        }
      });

      addMenuItem('新しい空のファイルを作成', async (e) => {
        e.stopPropagation();
        this.hideContextMenu();
        const name = prompt('新しいファイル名を入力：');
        if (!name) return;
        const newPath = dirPath ? `${dirPath}/${name}` : name;
        if (this.fileExists(newPath)) {
          alert('同名のファイルが既に存在します');
          return;
        }
        try {
          await this.device.createEmptyFile(newPath);
          await this.fileList();
        } catch (err) {
          console.error('create file failed', err);
          try { this.terminal.logToTerminal(`Create file failed: ${String(err)}`, 'error'); } catch {}
          alert('ファイルの作成に失敗しました: ' + String(err));
        }
      });

      if (dirPath) {
        // ルートの空白部分ではなく、実際のフォルダを右クリックした場合のみ削除を許可する
        addMenuItem('フォルダを削除', async (e) => {
          e.stopPropagation();
          this.hideContextMenu();
          // フォルダ自身のマーカー("path/")以外に、その配下を表すエントリがあるかを確認する
          const hasContents = this.files.some((f) => f !== `${dirPath}/` && f.startsWith(`${dirPath}/`));
          if (hasContents) {
            alert('フォルダ内にファイルがあるため削除できません。先にフォルダ内のファイルを削除してください。');
            return;
          }
          const ok = confirm(`本当にフォルダを削除しますか？\n${dirPath}`);
          if (!ok) return;
          try {
            await this.device.deleteDirectory(dirPath);
            await this.fileList();
          } catch (err) {
            console.error('delete directory failed', err);
            try { this.terminal.logToTerminal(`Delete directory failed: ${String(err)}`, 'error'); } catch {}
            alert('フォルダの削除に失敗しました: ' + String(err));
          }
        });
      }
    }

    document.body.appendChild(menu);
    this.contextMenuElement = menu;
  }


  private hideContextMenu() {
    if (this.contextMenuElement) {
      try { this.contextMenuElement.remove(); } catch {}
      this.contextMenuElement = null;
    }
  }

  // ツリー要素を安全に消去する
  private clearTree(root: HTMLElement) {
    while (root.firstChild) root.removeChild(root.firstChild);
  }

  // ファイルパス配列から階層ツリーを構築して DOM に追加する
  private buildTree(paths: string[], root: HTMLElement) {
    for (const fullPath of paths) {
      // 末尾が "/" のエントリは中身が空でも列挙されたディレクトリ自身を表す
      const isDirEntry = fullPath.endsWith('/');
      const cleanPath = isDirEntry ? fullPath.slice(0, -1) : fullPath;
      if (!cleanPath) continue;
      const segments = cleanPath.split('/');
      let parent: HTMLElement = root;
      let accum = '';
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        accum = accum ? `${accum}/${seg}` : seg;
        const isLast = i === segments.length - 1;
        const isFile = isLast && !isDirEntry;

        // 既に同じパスを表す子要素があるか検索
        const existing = Array.from(parent.children).find((c) => (c as HTMLElement).getAttribute && (c as HTMLElement).getAttribute('data-path') === accum) as HTMLElement | undefined;
        if (existing) {
          parent = existing;
          continue;
        }

        const item = this.createTreeItem(seg, accum, isFile);
        if (!isLast || !isFile) {
          // ディレクトリは親内で既存のファイルの前に挿入する
          const firstFileChild = Array.from(parent.children).find(c => (c as HTMLElement).getAttribute && (c as HTMLElement).getAttribute('data-is-file') === '1') as HTMLElement | undefined;
          parent.insertBefore(item, firstFileChild || null);
          parent = item;
        } else {
          // ファイルは末尾に追加
          parent.appendChild(item);
        }
      }
    }
  }

  // 単一の sl-tree-item を作成するユーティリティ
  private createTreeItem(label: string, path: string, isFile: boolean): HTMLElement & { value?: string } {
    const item = document.createElement('sl-tree-item') as HTMLElement & { value?: string };
    if (!isFile) {
      // 中身が空のフォルダは展開アイコンが出ないため、フォルダだと分かる記号を常に表示する
      const icon = document.createElement('span');
      icon.textContent = '📁 ';
      item.appendChild(icon);
      item.appendChild(document.createTextNode(label));
    } else {
      item.textContent = label;
    }
    item.setAttribute('data-path', path);
    if (isFile) {
      item.setAttribute('data-is-file', '1');
      item.value = path;
    }
    return item;
  }

  fileExists(filename: string): boolean {
    return this.files.includes(filename);
  }

  /**
   * 選択されたファイルをエディタに読み込む fileSelect
   */
  async fileRead(filename: string): Promise<string | null> {
    try {
      const fileContent = await this.device.readFile(filename);
      const text = new TextDecoder('utf-8').decode(fileContent);
      return text;
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error);
      try {
        this.terminal.logToTerminal(`ファイル読込エラー:"${filename}": ${String(error)}`, 'error');
      } catch {}
      return null;
    }
  }

  /**
   * エディタの内容をファイルに保存
   */
  async fileWrite(filename: string, text: string): Promise<void> {
    const binaryData = new TextEncoder().encode(text);
    try {
      await this.device.writeFile(filename, binaryData); // 選択されたファイルに保存
      console.log(`File saved: ${filename}`);
      await this.terminal.logToTerminal(`File saved successfully: ${filename}`, 'info'); // 成功メッセージを出力

    } catch (error) {
      const err = error as Error;
      console.error(`Error saving file ${filename}:`, err);
      await this.terminal.logToTerminal(`Error saving file "${filename}": ${err.message}`, 'error'); // エラーメッセージを出力
    }
  }

}