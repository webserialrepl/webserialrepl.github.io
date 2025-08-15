# docker-pico-dev

Development environment for WebSerialREPL

# 開発環境のビルド&起動
cd docker
docker-compose build
docker-compose up -d
docker exec -it docker-app-1 /bin/bash

# appのビルド&起動
# dockerイメージの /app で
```sh
npm install
```

# docs ディレクトリにビルドされる。Githubにプッシュすることで、webserial.github.io から利用が可能となる
```sh
cd /app
npm run build
```

To start a local development server run,
```sh
npm run dev
```

## クラスの説明
SerialPortManager
このクラスは、シリアルポートの選択や接続、切断を管理しています。

DeviceCommunicator
このクラスは、シリアルポートを介してデバイスと通信するためのロジックを提供しています。

ReplTerminal
このクラスは、REPL（Read-Eval-Print Loop）用のターミナルを表しています。

TODO:
ポートの一覧の不要なもの
favicon.ico の設定


# ここからUI作成 2025/08/15

### プロジェクト構成例

micropython-webide/
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ index.html
├─ src/
│  ├─ main.ts
│  ├─ ui/
│  │   ├─ TabManager.ts
│  │   ├─ CommandBus.ts
│  │   └─ FileTree.ts
│  └─ components/
│      └─ HelloWorld.ts
└─ public/


### 初期セットアップ

# Vite + TS + npm 環境構築
# 不要？ npm create vite@latest micropython-webide -- --template vanilla-ts
# 不要？ cd micropython-webide

# 必要パッケージ
npm install monaco-editor @shoelace-style/shoelace lit
npm install --save-dev vite-tsconfig-paths
npm audit fix

### vite.config.ts
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  server: {
    port: 5173,
    open: true
  }
});


### index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>MicroPython Web IDE</title>
  <script type="module" src="/src/main.ts"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/dist/themes/light.css">
</head>
<body>
  <header>
    <sl-menu>
      <sl-menu-item id="new-file">新規ファイル</sl-menu-item>
      <sl-menu-item id="save-file">保存</sl-menu-item>
      <sl-menu-item id="run-script">実行</sl-menu-item>
    </sl-menu>
  </header>
  <main style="display: grid; grid-template-columns: 200px 1fr; height: 100vh;">
    <div id="file-panel">
      <sl-tree id="file-tree">
        <sl-tree-item>main.py</sl-tree-item>
        <sl-tree-item>utils.py</sl-tree-item>
      </sl-tree>
      <hello-world></hello-world>
    </div>
    <div id="editor-panel" style="display: flex; flex-direction: column;">
      <div id="tab-bar"></div>
      <div id="editor" style="flex: 1;"></div>
    </div>
  </main>
</body>
</html>


### HelloWorld.ts
import { html, css, LitElement } from 'lit';

export class HelloWorld extends LitElement {
  static styles = css`p { color: green; margin: 0.5em; }`;
  render() {
    return html`<p>Lit Component 動作OK</p>`;
  }
}
customElements.define('hello-world', HelloWorld);

### CommandBus.ts
export type Command = 'new' | 'save' | 'run';

export class CommandBus {
  private listeners: { [key: string]: (() => void)[] } = {};
  on(cmd: Command, handler: () => void) {
    (this.listeners[cmd] ??= []).push(handler);
  }
  emit(cmd: Command) {
    this.listeners[cmd]?.forEach(fn => fn());
  }
}

### TabManager.ts
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

### main.ts
import '@shoelace-style/shoelace/dist/shoelace.js';
import * as monaco from 'monaco-editor';
import { CommandBus } from './ui/CommandBus';
import { TabManager } from './ui/TabManager';
import './components/HelloWorld';

const commands = new CommandBus();

const editor = monaco.editor.create(document.getElementById('editor')!, {
  value: '',
  language: 'python',
  automaticLayout: true
});

const tabs = new TabManager(document.getElementById('tab-bar')!, editor);

// メニューイベント
document.getElementById('new-file')?.addEventListener('click', () => commands.emit('new'));
document.getElementById('save-file')?.addEventListener('click', () => commands.emit('save'));
document.getElementById('run-script')?.addEventListener('click', () => commands.emit('run'));

// コマンド処理
commands.on('new', () => tabs.addTab(`untitled${Date.now()}.py`, ''));
commands.on('save', () => console.log('Save:', editor.getValue()));
commands.on('run', () => console.log('Run:', editor.getValue()));

// ファイルツリー
document.getElementById('file-tree')?.addEventListener('sl-selection-change', (e: any) => {
  const sel = e.detail.selection[0]?.textContent;
  if (sel) tabs.addTab(sel, `# ${sel} content`);
});

