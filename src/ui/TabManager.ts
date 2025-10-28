import * as monaco from 'monaco-editor';

export class TabManager {
  private tabs: { name: string; dispname: string; model: monaco.editor.ITextModel }[] = [];
  private activeIndex = 0;
  private emp_model = monaco.editor.createModel('', 'python');


  // エディタの内容が変更されたときにファイル名にアスタリスクを追加
  constructor(private tabBar: HTMLElement, private editor: monaco.editor.IStandaloneCodeEditor, private filemgr: any) {
    this.editor.onDidChangeModelContent(() => {
      if (this.activeIndex < 0 || this.activeIndex >= this.tabs.length) return;
      const tab = this.tabs[this.activeIndex];
      if (!tab.dispname.startsWith('*')) {
        tab.dispname = '*' + tab.name;
        this.render();
      }
    });
  }

  async addContentTab(name: string) {
    // ファイル名が一覧にあるかチェック
    if (name!== '<無題>') {
      for (const tab of this.tabs) {
        if (tab.name === name) {
          console.warn(`Tab with name "${name}" already exists.`);
          return;
        }
      }
    }
    this.tabs.push({ name, dispname:name, model: this.emp_model });
    this.activeIndex = this.tabs.length - 1;
    this.editor.setModel(this.emp_model);
    this.render();
    // ファイルの読み込みが成功したら内容をアップデート
    var content = '';
    try {
      const readResult = await this.filemgr.fileRead(name);
      // If readResult is null (error), do not display file contents
      content = readResult == null ? '' : readResult;
    } catch (error) {
      // If an unexpected exception bubbles up, keep editor empty and log
      content = '';
      console.warn(`Failed to read file ${name}:`, error);
    }
    const model = monaco.editor.createModel(content, 'python');
    model.setEOL(monaco.editor.EndOfLineSequence.LF); // 改行コードを LF に設定
    
    this.tabs[this.activeIndex].model = model;
    this.editor.setModel(model);
    this.render();
  }

  switchTab(index: number) {
    this.activeIndex = index;
    this.editor.setModel(this.tabs[index].model);
    this.render();
  }

  render() {
    this.tabBar.innerHTML = '';
    this.tabs.forEach((tab, i) => {
      const div = document.createElement('div');
      div.textContent = tab.dispname;
      div.className = 'tab' + (i === this.activeIndex ? ' active' : '');

      // クローズボタンを追加
      const closeBtn = document.createElement('span');
      closeBtn.textContent = ' ×';
      closeBtn.style.marginLeft = '4px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.onclick = async (e) => {
        e.stopPropagation(); // タブ切り替えイベントを防ぐ

        // 変更判定（先頭が * なら変更ありとみなす）
        const isModified = tab.dispname.startsWith('*');
        if (!isModified) {
          this.closeTab(i);
          return;
        }
        // ダイアログ表示
        const result = window.confirm('変更を保存せずに閉じても良いですか？');
        if (result) {
          this.closeTab(i);
          return;
        }
      };
      div.appendChild(closeBtn);

      div.onclick = () => this.switchTab(i);
      this.tabBar.appendChild(div);
    });
  }

  // タブを閉じるメソッドを追加
  closeTab(index: number) {
    this.tabs.splice(index, 1);
    if (this.tabs.length === 0) {
      this.editor.setModel(null);
      this.activeIndex = -1;
    } else {
      // アクティブタブの調整
      if (this.activeIndex >= this.tabs.length) {
        this.activeIndex = this.tabs.length - 1;
      }
      this.editor.setModel(this.tabs[this.activeIndex].model);
    }
    this.render();
  }


  /**
   * 新しいファイル名を入力
   */
  private newfilename(filename: string): string | null {

    // 新しいファイル名を入力させる
    const newFileName = prompt('新しいファイル名を入力：', `${filename}`);
    if (!newFileName) {
      console.log('File copy canceled');
      return null;
    }
    // 拡張子がない場合は .py を付加
    const finalFileName = newFileName.includes('.') ? newFileName : `${newFileName}.py`;

    // ファイル名が一覧にあるかチェック
    if (this.filemgr.fileExists(finalFileName)) {
      alert(`ファイル名 "${finalFileName}" はすでに存在します。別の名前を入力してください。`);
      return null;
    }
    return finalFileName;
  }

  async saveCurrentTab() {
    if (this.activeIndex < 0 || this.activeIndex >= this.tabs.length) {
      console.warn('No active tab to save');
      return;
    }
    var filename:string | null = this.tabs[this.activeIndex].name;
    if (filename === '<無題>') {
      filename = this.newfilename('');
      if (filename == null) return;
      this.tabs[this.activeIndex].name = filename;  // 名前をアップデート
    }
    const content = this.tabs[this.activeIndex].model.getValue();
    await this.filemgr.fileWrite(filename, content);
    this.tabs[this.activeIndex].dispname = filename;  // 表示名もアップデート
    this.render();
    this.filemgr.fileList(); // ファイルツリーを更新
  }

}