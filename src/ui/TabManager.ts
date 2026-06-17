import * as monaco from 'monaco-editor';
import { TabState, displayName } from './Tab';

export class TabManager {
  private tabs: TabState[] = [];
  private activeIndex: number = -1;
  private emp_model = monaco.editor.createModel('', 'python');

  // エディタの内容が変更されたときにファイルの変更フラグを立てる
  constructor(private tabBar: HTMLElement, private editor: monaco.editor.IStandaloneCodeEditor, private filemgr: any) {
    this.editor.onDidChangeModelContent(() => {
      if (this.activeIndex < 0 || this.activeIndex >= this.tabs.length) return;
      const tab = this.tabs[this.activeIndex];
      if (!tab.isModified) {
        tab.isModified = true;
        this.render();
      }
    });
  }

  async addContentTab(name: string) {
    // ファイル名が一覧にあるかチェック
    if (name!== '<無題>') {
      for (const tab of this.tabs) {
        if (tab.disp_name === name) {
          console.warn(`Tab with name "${name}" already exists.`);
          return;
        }
      }
    }
    const newTab: TabState = { id: Date.now(), disp_name: name, file_path: name === '<無題>' ? null : name, isModified: false, isNew: name === '<無題>', model: this.emp_model };
    this.tabs.push(newTab);
    this.activeIndex = this.tabs.length - 1;
    this.editor.setModel(newTab.model);
    this.render();
    // ファイルの読み込みが成功したら内容をアップデート
    var content = '';
    try {
      if (name !== '<無題>') {
        const readResult = await this.filemgr.fileRead(name);
        // If readResult is null (error), do not display file contents
        content = readResult == null ? '' : readResult;
        // mark as not new
        this.tabs[this.activeIndex].isNew = false;
        this.tabs[this.activeIndex].file_path = name;
      }
    } catch (error) {
      content = '';
      console.warn(`Failed to read file ${name}:`, error);
    }
    const model = monaco.editor.createModel(content, 'python');
    model.setEOL(monaco.editor.EndOfLineSequence.LF); // 改行コードを LF に設定
    
    this.tabs[this.activeIndex].model = model;
    this.tabs[this.activeIndex].isModified = false;
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
      div.textContent = displayName(tab);
      div.className = 'tab' + (i === this.activeIndex ? ' active' : '');

      // クローズボタンを追加
      const closeBtn = document.createElement('span');
      closeBtn.textContent = ' ×';
      closeBtn.style.marginLeft = '4px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.onclick = async (e) => {
        e.stopPropagation(); // タブ切り替えイベントを防ぐ

        // 変更判定
        const isModified = tab.isModified;
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
    const removed = this.tabs.splice(index, 1);
    // dispose model to free resources
    try { removed.forEach(t => t.model.dispose()); } catch (e) {}
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
    var filename:string | null = this.tabs[this.activeIndex].disp_name;
    // 新規タブ判定は isNew フラグで行う
    const wasNew = !!this.tabs[this.activeIndex].isNew;
    if (wasNew) {
      filename = this.newfilename('');
      if (filename == null) return;
      this.tabs[this.activeIndex].disp_name = filename;  // 名前をアップデート
      this.tabs[this.activeIndex].file_path = filename;
    }
    const content = this.tabs[this.activeIndex].model.getValue();
    await this.filemgr.fileWrite(filename, content);
    this.tabs[this.activeIndex].isModified = false;  // 保存されたため未変更に
    this.tabs[this.activeIndex].isNew = false; // 保存されたので新規フラグを解除
    this.render();
    // 新規ファイルを書き込んだ場合のみファイルツリーを更新
    if (wasNew) {
      try {
        await this.filemgr.fileList();
      } catch (e) {
        console.warn('fileList refresh failed after new file save', e);
      }
    }
  }

}