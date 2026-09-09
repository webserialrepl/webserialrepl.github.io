import { DeviceCommunicator } from './DeviceCommunicator';
import { ReplTerminal } from './ReplTerminal';

export class FileManager {
  private static readonly defaultGithubUrl = 'https://github.com/jcodeorg/esp32-ble-logger/tree/main/firmware';
  private device: DeviceCommunicator;
  private terminal: ReplTerminal; // ReplTerminal のインスタンスを保持
  private selectedFile: string | null = null; // 選択されたファイル名を保持
  private fileTreeDisplayed = false; // ファイルツリーが表示されているかどうか
  private files: string[] = []; // ファイル一覧を保持
  private githubFiles: Array<{ path: string; size: number; downloadUrl: string }> = [];

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
      const githubPreviewButton = document.getElementById('github-preview-button') as HTMLButtonElement;
      const githubWriteButton = document.getElementById('github-write-button') as HTMLButtonElement;
      const customEvent = event as CustomEvent; // CustomEvent 型にキャスト
      const { status } = customEvent.detail;
      const buttons = [refreshButton, saveFileButton, newFileButton, runCodeButton, githubPreviewButton, githubWriteButton];
      if (status === 'REPL') {
        console.log("<REPL> mode activated");
        if (!this.fileTreeDisplayed) {
          await this.fileList();      // デバイスの中のファイル一覧を表示
        }
        buttons.forEach((button) => (button.disabled = false)); // ボタンを有効化
        githubWriteButton.disabled = this.githubFiles.length === 0;
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
    const githubPreviewButton = document.getElementById('github-preview-button') as HTMLButtonElement;
    const githubWriteButton = document.getElementById('github-write-button') as HTMLButtonElement;

    // 初期状態で無効化
    // fileSelect.disabled = true;
    refreshButton.disabled = true;
    saveFileButton.disabled = true;
    newFileButton.disabled = true;
    runCodeButton.disabled = true;
    githubPreviewButton.disabled = true;
    githubWriteButton.disabled = true;

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

  /** GitHub の tree URL を解析し、対象ツリーを取得する。 */
  private parseGithubUrl(value: string): { owner: string; repo: string; branch: string; directory: string } {
    const url = new URL(value.trim());
    if (url.hostname !== 'github.com') throw new Error('github.com の URL を指定してください。');
    const parts = url.pathname.split('/').filter(Boolean);
    const treeIndex = parts.indexOf('tree');
    if (parts.length < 4 || treeIndex !== 2 || !parts[0] || !parts[1] || !parts[treeIndex + 1]) {
      throw new Error('GitHub のフォルダ URL（/owner/repository/tree/branch/path）を指定してください。');
    }
    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, ''),
      branch: parts[treeIndex + 1],
      directory: parts.slice(treeIndex + 2).join('/'),
    };
  }

  private async fetchGithubFiles(value: string): Promise<Array<{ path: string; size: number; downloadUrl: string }>> {
    const { owner, repo, branch, directory } = this.parseGithubUrl(value);
    const treeUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(branch)}?recursive=1`;
    const response = await fetch(treeUrl, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub API エラー (${response.status}): ${await response.text()}`);
    const tree = await response.json() as { truncated?: boolean; tree?: Array<{ path: string; type: string; size?: number }> };
    if (tree.truncated) throw new Error('GitHub のファイル数が多すぎるため一覧を取得できませんでした。');
    const prefix = directory ? `${directory}/` : '';
    const files = (tree.tree || []).filter((entry) => entry.type === 'blob' && entry.path.startsWith(prefix));
    if (files.length === 0) throw new Error('指定フォルダに書き込めるファイルがありません。');
    return files.map((entry) => ({
      path: entry.path.slice(prefix.length),
      size: entry.size || 0,
      downloadUrl: `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${entry.path.split('/').map(encodeURIComponent).join('/')}`,
    }));
  }

  public async previewGithubFolder(): Promise<void> {
    const urlInput = document.getElementById('github-folder-url') as HTMLInputElement;
    const fileList = document.getElementById('github-copy-files');
    const progress = document.getElementById('github-copy-progress');
    if (!urlInput || !fileList || !progress) return;
    fileList.textContent = 'GitHub からファイル一覧を取得しています...';
    progress.textContent = '';
    this.githubFiles = [];
    try {
      this.githubFiles = await this.fetchGithubFiles(urlInput.value || FileManager.defaultGithubUrl);
      const totalBytes = this.githubFiles.reduce((sum, file) => sum + file.size, 0);
      fileList.textContent = `${this.githubFiles.length} ファイル、${totalBytes.toLocaleString()} bytes\n\n${this.githubFiles.map((file) => `${file.path} (${file.size.toLocaleString()} bytes)`).join('\n')}`;
      progress.textContent = '一覧を確認しました。内容を確認してから書き込みボタンを押してください。';
      const writeButton = document.getElementById('github-write-button') as HTMLButtonElement;
      writeButton.disabled = false;
    } catch (error) {
      fileList.textContent = 'ファイル一覧を取得できませんでした。';
      progress.textContent = `エラー: ${String(error)}`;
      this.terminal.logToTerminal(`GitHub の一覧取得エラー: ${String(error)}`, 'error');
    }
  }

  public async writeGithubFolder(): Promise<void> {
    if (this.githubFiles.length === 0) return;
    if (!window.confirm(`${this.githubFiles.length} ファイルをデバイスのルートへ書き込みます。続行しますか？`)) return;
    const progress = document.getElementById('github-copy-progress');
    if (!progress) return;
    const writeButton = document.getElementById('github-write-button') as HTMLButtonElement;
    writeButton.disabled = true;
    const directories = new Set<string>();
    this.githubFiles.forEach((file) => {
      const parts = file.path.split('/');
      parts.pop();
      for (let i = 1; i <= parts.length; i++) directories.add(parts.slice(0, i).join('/'));
    });
    try {
      const sortedDirectories = Array.from(directories).sort((a, b) => a.split('/').length - b.split('/').length);
      for (const directory of sortedDirectories) {
        progress.textContent = `フォルダ作成中: ${directory}`;
        try {
          await this.device.createDirectory(directory);
        } catch (error) {
          // 既に存在するディレクトリはそのまま利用してコピーを続行する。
          if (!String(error).toLowerCase().includes('exist')) throw error;
        }
      }
      let completed = 0;
      for (const file of this.githubFiles) {
        progress.textContent = `書き込み中 (${completed + 1}/${this.githubFiles.length}): ${file.path}`;
        const response = await fetch(file.downloadUrl);
        if (!response.ok) throw new Error(`${file.path}: GitHub から取得できませんでした (${response.status})`);
        await this.device.writeFile(file.path, new Uint8Array(await response.arrayBuffer()));
        completed++;
      }
      progress.textContent = `完了: ${completed} ファイルを書き込みました。エラーはありません。`;
      await this.fileList();
    } catch (error) {
      progress.textContent = `エラー: ${String(error)}`;
      this.terminal.logToTerminal(`GitHub フォルダの書き込みエラー: ${String(error)}`, 'error');
    } finally {
      writeButton.disabled = false;
    }
  }

  /**
   * ファイル一覧を 'file-tree' に表示
   */
  async fileList(): Promise<void> {
    const filetree = document.getElementById('file-tree');
    if (!filetree) return;
    try {
      const newFiles = await this.device.getFileList();
      this.files = newFiles;

      // 既存の項目をクリアしてからビルド
      this.clearTree(filetree);
      this.buildTree(this.files, filetree);
      this.fileTreeDisplayed = true;
    } catch (err) {
      // 通信エラー時のみ、既に表示中のファイル一覧を保持する
      // （エラーではなく本当に空の場合はここに来ないため、正しく一覧が更新される）
      console.error('getFileList failed; keeping existing file tree', err);
      try { this.terminal.logToTerminal(`ファイル一覧の取得に失敗しました: ${String(err)}`, 'error'); } catch {}
    }
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