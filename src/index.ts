/**
 * Copyright Programing Educational Laboratory
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FileManager } from './FileManager';
import { ReplTerminal } from './ReplTerminal';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { SerialPortManager } from './SerialPortManager';
import { DeviceCommunicator } from './DeviceCommunicator';

import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import '@shoelace-style/shoelace/dist/shoelace.js';
import { CommandBus } from './ui/CommandBus';
import { TabManager } from './ui/TabManager';


self.MonacoEnvironment = {
  getWorker: function (_moduleId: string, label: string) {
    if (label === 'json') {
      return new JsonWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new TsWorker();
    }
    return new EditorWorker();
  },
};

// Build番号の表示
document.addEventListener('DOMContentLoaded', () => {
  const buildInfo = document.createElement('div');
  buildInfo.textContent = `Build Number: ${__BUILD_NUMBER__}`;
  buildInfo.style.position = 'absolute';
  buildInfo.style.bottom = '10px';
  // Move the build-number slightly left (~2 characters) from the right edge
  buildInfo.style.right = 'calc(10px + 2ch)';
  buildInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  buildInfo.style.color = 'white';
  buildInfo.style.padding = '5px 10px';
  buildInfo.style.borderRadius = '5px';
  document.body.appendChild(buildInfo);
});


// SerialPortManager と
const serialPortManager = new SerialPortManager(repl_terminal_write);
// (debug) previously exposed serialPortManager on window for troubleshooting; removed in production

// DeviceCommunicator のインスタンスを作成
const device = new DeviceCommunicator(serialPortManager);

// ReplTerminal クラスのインスタンスを作成。
// スクロールバックバッファを 10,000 行に設定。
const repl_terminal = new ReplTerminal(
  {
    scrollback: 1000, // スクロールバックバッファを1000行に制限
  }, // ターミナルのオプション
  new FitAddon(), // FitAddon インスタンス
  device, // DeviceCommunicator インスタンス
);

async function repl_terminal_write(chunk: string): Promise<void> {
  // ターミナルに出力
  await new Promise<void>((resolve) => {
    repl_terminal.write(chunk, resolve);
  });
}

// Monaco Editor の初期化
const editor = monaco.editor.create(document.getElementById('editor') as HTMLElement, {
  value: '',
  language: 'python',
  theme: 'vs-dark',
});

// FileManager のインスタンスを作成
const filemgr = new FileManager(device, repl_terminal);

async function main() {
  await serialPortManager.initialize(); // 初期化処理を実行
  await repl_terminal.initialize(); // 初期化処理を実行
  await filemgr.initialize();
}
main();

const commands = new CommandBus();
const tabs = new TabManager(document.getElementById('tab-bar')!, editor, filemgr);

// メニューイベント
document.getElementById('new-file')?.addEventListener('click', () => commands.emit('new'));
document.getElementById('save-file')?.addEventListener('click', () => commands.emit('save'));
document.getElementById('run-script')?.addEventListener('click', () => commands.emit('run'));

// コマンド処理
commands.on('new', () => tabs.addContentTab('<無題>'));
commands.on('save', () => tabs.saveCurrentTab());
commands.on('run', async() => {
  await device.executeCommand(editor.getValue()); // エディタの内容を実行
});
// ファイル一覧の更新
commands.on('list', async() => {
  await filemgr.fileList()
});

document.getElementById('newFileButton')?.addEventListener('click', () => commands.emit('new'));
document.getElementById('saveFileButton')?.addEventListener('click', () => commands.emit('save'));
// CTRL+S ショートカットを登録
editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => commands.emit('save'));

// ファイルツリーのファイル名をクリックしたら、ファイルを読み込む
document.getElementById('file-tree')?.addEventListener('sl-selection-change', async (e: any) => {
  const filename = e.detail.selection[0]?.textContent;
  if (!filename) return;
    tabs.addContentTab(filename);
});
document.getElementById('refreshFileList')?.addEventListener('click', () => commands.emit('list'));


// run Code ボタンのクリックイベント
document.getElementById('runCodeButton')?.addEventListener('click', () => commands.emit('run'));

// STOPボタン：CTRL-C を送信
const stopButton = document.getElementById('stopButton') as HTMLButtonElement;
stopButton.addEventListener('click', async ()=> {
  await serialPortManager.sendControl(0x03); // CTRL+C
  await serialPortManager.sendControl(0x02); // CTRL+B
});

// シリアル通信の接続状態に応じて stopButton を有効化/無効化
document.addEventListener(SerialPortManager.EVENT_CONNECTED, () => {
  console.log("<Connected> event");
  stopButton.disabled = false; // 接続中なら有効化
});
document.addEventListener(SerialPortManager.EVENT_DISCONNECTED, () => {
  stopButton.disabled = true; // 切断中なら無効化
  filemgr.disableAllButtons(); // FileManager のボタンを無効化
});
// 初期状態で無効化
stopButton.disabled = true;
