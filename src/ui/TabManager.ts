import * as monaco from 'monaco-editor';

export class TabManager {
  private tabs: { name: string; model: monaco.editor.ITextModel }[] = [];
  private activeIndex = 0;
  // エディタの内容が変更されたときにファイル名にアスタリスクを追加
  constructor(private tabBar: HTMLElement, private editor: monaco.editor.IStandaloneCodeEditor, private fileManager: any) {
    this.editor.onDidChangeModelContent(() => {
      if (this.activeIndex < 0 || this.activeIndex >= this.tabs.length) return;
      const tab = this.tabs[this.activeIndex];
      if (!tab.name.startsWith('*')) {
        tab.name = '*' + tab.name;
        this.render();
      }
    });
  }

  addTab(name: string, content: string) {
    const model = monaco.editor.createModel(content, 'python');
    this.tabs.push({ name, model });
    this.activeIndex = this.tabs.length - 1;
    this.editor.setModel(model);
    this.render();
  }

  async addContentTab(name: string) {
    const content = await this.fileManager.readFile(name);
    const model = monaco.editor.createModel(content, 'python');
    this.tabs.push({ name, model });
    this.activeIndex = this.tabs.length - 1;
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
      div.textContent = tab.name;
      div.className = 'tab' + (i === this.activeIndex ? ' active' : '');

      // クローズボタンを追加
      const closeBtn = document.createElement('span');
      closeBtn.textContent = ' ×';
      closeBtn.style.marginLeft = '4px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.onclick = async (e) => {
        e.stopPropagation(); // タブ切り替えイベントを防ぐ

        // 変更判定（先頭が * なら変更ありとみなす）
        const isModified = tab.name.startsWith('*');
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

  async saveCurrentTab() {
    if (this.activeIndex < 0 || this.activeIndex >= this.tabs.length) {
      console.warn('No active tab to save');
      return;
    }
    const filename = this.tabs[this.activeIndex].name.replace('*', ''); // アスタリスクを削除
    const content = this.tabs[this.activeIndex].model.getValue();
    await this.fileManager.saveContent(filename, content);
    // アスタリスクを削除
    this.tabs[this.activeIndex].name = filename
    this.render();
  }

}