import * as monaco from 'monaco-editor';

export class TabManager {
  private tabs: { name: string; model: monaco.editor.ITextModel }[] = [];
  private activeIndex = 0;
  constructor(private tabBar: HTMLElement, private editor: monaco.editor.IStandaloneCodeEditor) {}

  addTab(name: string, content: string) {
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
      div.onclick = () => this.switchTab(i);
      this.tabBar.appendChild(div);
    });
  }
}