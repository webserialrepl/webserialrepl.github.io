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
  buildInfo.style.right = '10px';
  buildInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  buildInfo.style.color = 'white';
  buildInfo.style.padding = '5px 10px';
  buildInfo.style.borderRadius = '5px';
  document.body.appendChild(buildInfo);
});

// SerialPortManager と DeviceCommunicator のインスタンスを作成
const serialPortManager = new SerialPortManager();
const device = new DeviceCommunicator(serialPortManager);

// ReplTerminal クラスのインスタンスを作成。
// スクロールバックバッファを 10,000 行に設定。
const repl_terminal = new ReplTerminal(
  { scrollback: 10_000 }, // ターミナルのオプション
  new FitAddon(), // FitAddon インスタンス
  device, // DeviceCommunicator インスタンス
);

async function repl_terminal_write(chunk: string): Promise<void> {
  // ターミナルに出力
  await new Promise<void>((resolve) => {
    repl_terminal.write(chunk, resolve);
  });
}

/**
 * DOMContentLoaded イベントが発火した際に実行される関数。
 * ターミナルの初期化、リサイズ対応、ダウンロードボタンやクリアボタンの
 * イベントリスナーを設定する。
 */
document.addEventListener('DOMContentLoaded', async () => {

  // ターミナルの初期化
  await repl_terminal.initialize(); // 初期化処理を実行

  // シリアルポートの初期化処理
  await serialPortManager.initialize(); // 初期化処理を実行

  // シリアルポート接続（接続時にターミナルが使えるようにする）
  document.addEventListener(SerialPortManager.EVENT_CONNECTED, async () => {
    console.log('Connected to the serial port');
    await device.startTerminalOutput(repl_terminal_write); // ポートから読み取りターミナルに出力
  });

  // Monaco Editor の初期化
  const editor = monaco.editor.create(document.getElementById('editor') as HTMLElement, {
    value: '',
    language: 'python',
    theme: 'vs-dark',
  });
  // 改行コードを LF に設定
  const model = editor.getModel();
  if (model) {
    model.setEOL(monaco.editor.EndOfLineSequence.LF);
  }

  // FileManager のインスタンスを作成
  const fileManager = new FileManager(device, editor);

  // FileManager の初期化処理を実行
  await fileManager.initialize();

  // run Code ボタンのクリックイベント
  const runCodeButton = document.getElementById('runCodeButton') as HTMLButtonElement;
  runCodeButton.addEventListener('click', async () => {
    // CTRL+A, コード, CTRL+D, CTRL+B
    const text = '\x01' + editor.getValue() + '\x04\x02';
    await device.sendCommand(text); // エディタの内容を実行
  });

  // STOPボタン：CTRL-C を送信
  const stopButton = document.getElementById('stopButton') as HTMLButtonElement;
  stopButton.addEventListener('click', async ()=> {
    await device.sendCommand('\x03'); // CTRL+C
  });

  // シリアル通信の接続状態に応じて stopButton を有効化/無効化
  document.addEventListener(SerialPortManager.EVENT_CONNECTED, (event) => {
    stopButton.disabled = false; // 接続中なら有効化
  });
  document.addEventListener(SerialPortManager.EVENT_DISCONNECTED, () => {
    stopButton.disabled = true; // 切断中なら無効化
  });
  // 初期状態で無効化
  stopButton.disabled = true;

});
