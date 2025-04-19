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

import { Terminal, ITerminalOptions } from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {WebLinksAddon} from 'xterm-addon-web-links';
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

// SerialPortManager と DeviceCommunicator のインスタンスを作成
const serialPortManager = new SerialPortManager();
const device = new DeviceCommunicator(serialPortManager);


/**
 * read the port.
 */
async function readpicoport(): Promise<void> {
  // console.log('readpicoport!');
  await device.clearpicoport(false, async (chunk)=> {
    // console.log('chunk:', chunk);
    // ターミナルに出力
    await new Promise<void>((resolve) => {
      term.write(chunk, resolve);
    });
  });
  // console.log('!!readpicoport!!');
}

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

/**
 * REPL用ターミナルを表すクラス。
 * xterm.js を拡張して、FitAddon や WebLinksAddon を利用可能にする。
 */
class ReplTerminal extends Terminal {
  public fitAddon: FitAddon;

  /**
   * REPL用ターミナルのコンストラクタ。
   * @param {TerminalOptions} options - ターミナルのオプション設定。
   * @param {FitAddon} fitAddon - ターミナルのサイズを自動調整する FitAddon インスタンス。
   */
  constructor(options: ITerminalOptions, fitAddon: FitAddon) {
    // 親クラス (Terminal) のコンストラクタを呼び出す。
    super(options);

    // FitAddon を初期化し、ターミナルにロード。
    this.fitAddon = fitAddon;
    this.loadAddon(this.fitAddon);

    // Webリンクをクリック可能にするアドオンをロード。
    this.loadAddon(new WebLinksAddon());

    // データ入力イベントをリッスンし、device デバイスにコマンドを送信。
    this.onData((data) => {
      if (device) {
        device.sendCommand(data);
      }
    });
  }
}

// ReplTerminal クラスのインスタンスを作成。
// スクロールバックバッファを 10,000 行に設定。
const term = new ReplTerminal(
  { scrollback: 10_000 }, // ターミナルのオプション
  new FitAddon() // FitAddon インスタンス
);

/**
 * DOMContentLoaded イベントが発火した際に実行される関数。
 * ターミナルの初期化、リサイズ対応、ダウンロードボタンやクリアボタンの
 * イベントリスナーを設定する。
 */
document.addEventListener('DOMContentLoaded', async () => {
  const terminalElement = document.getElementById('terminal');
  if (terminalElement) {
    term.open(terminalElement);
    term.fitAddon.fit();

    window.addEventListener('resize', () => {
      term.fitAddon.fit();
    });
  }

  const downloadOutput =
    document.getElementById('download') as HTMLSelectElement;
  downloadOutput.addEventListener('click', downloadTerminalContents);

  const clearOutput = document.getElementById('clear') as HTMLSelectElement;
  clearOutput.addEventListener('click', ()=>{
    term.clear();
  });
});

/**
 * Download the terminal's contents to a file.
 */
function downloadTerminalContents(): void {
  if (!term) {
    throw new Error('no terminal instance found');
  }

  if (term.rows === 0) {
    console.log('No output yet');
    return;
  }

  term.selectAll();
  const contents = term.getSelection();
  term.clearSelection();
  const linkContent = URL.createObjectURL(
      new Blob([new TextEncoder().encode(contents).buffer],
          {type: 'text/plain'}));
  const fauxLink = document.createElement('a');
  fauxLink.download = `terminal_content_${new Date().getTime()}.txt`;
  fauxLink.href = linkContent;
  fauxLink.click();
}


/**
 * DOMContentLoaded イベントが発火した際に実行される関数。
 * シリアルポートの選択肢を追加し、接続ボタンのイベントリスナーを設定する。
 */
document.addEventListener('DOMContentLoaded', async () => {
  serialPortManager.portSelector =
    document.getElementById('ports') as HTMLSelectElement;
  serialPortManager.connectButton =
    document.getElementById('connect') as HTMLButtonElement;


  const ports: (SerialPort)[] = await navigator.serial.getPorts();
  ports.forEach((port) => serialPortManager.addNewPort(port));

  serialPortManager.connectButton.addEventListener('click', async () => {
    if (serialPortManager.picoport) {
      serialPortManager.disconnectFromPort();
    } else {
      await serialPortManager.openpicoport(); // ポートを開く
      await readpicoport(); // ポートから読み取りターミナルに出力
    }
  });

  // These events are not supported by the polyfill.
  // https://github.com/google/web-serial-polyfill/issues/20
  navigator.serial.addEventListener('connect', (event) => {
    const portOption = serialPortManager.addNewPort(event.target as SerialPort);
    portOption.selected = true;
  });
  navigator.serial.addEventListener('disconnect', (event) => {
    const portOption = serialPortManager.findPortOption(event.target as SerialPort);
    if (portOption) {
      portOption.remove();
    }
  });
});


/**
 * b'...'形式のバイナリデータをUint8Arrayに変換する関数
 * @param {string} binaryStr - b'...'形式のバイナリデータ文字列
 * @return {Uint8Array} - 変換されたUint8Array
 */
function binaryStringToUint8Array(binaryStr: string): Uint8Array {
  // プレフィックスb'とサフィックス'を取り除く
  let hexStr = binaryStr.slice(2, -1);
  // 文字列の長さが奇数の場合、先頭に0を追加
  if (hexStr.length % 2 !== 0) {
    hexStr = hexStr + '0';
  }
  // 2文字ごとに分割してUint8Arrayに変換
  const byteArray = new Uint8Array(hexStr.length / 2);
  for (let i = 0; i < hexStr.length; i += 2) {
    byteArray[i / 2] = parseInt(hexStr.substr(i, 2), 16);
  }
  // 最後のデータがNULLの場合は除外
  if (byteArray[byteArray.length - 1] === 0) {
    return byteArray.slice(0, -1);
  }
  return byteArray;
}

/**
 * Load main.py from the MicroPython device and display it in the editor.
 *
 * @param {monaco.editor.IStandaloneCodeEditor} editor
 *  - The Monaco editor instance.
 */
async function loadTempPy(editor: monaco.editor.IStandaloneCodeEditor) {
  if (serialPortManager.picoreader) {
    await serialPortManager.picoreader.cancel(); // ターミナル出力を停止
  }
  const filename = 'temp.py';
  if (device.getWritablePort()) {
    await device.write('\x01'); // CTRL+A：raw モード
    await device.write('import os\r');
    await device.write(`with open("${filename}", "rb") as f:\r`);
    await device.write('  import ubinascii\r');
    await device.write('  print(ubinascii.hexlify(f.read()))\r');
    await device.write('\x04'); // CTRL+D
    device.releaseLock();

    await device.clearpicoport('OK', null); // ">OK"を待つ
    const result = await device.clearpicoport('\x04', null); // CTRL-Dを待つ

    // ファイル内容を表示
    console.log('result:', result);
    const binaryData = binaryStringToUint8Array(result);
    console.log('binary dump:', binaryData);
    const text = new TextDecoder('utf-8').decode(binaryData);
    console.log('text:', text);
    device.sendCommand('\x02'); // CTRL+B
    // エディタに結果を表示
    editor.setValue(text);
  }
  readpicoport(); // ターミナル出力を再開
}

/**
 * 文字列をUint8Arrayに変換する関数
 * @param {string} str - 変換する文字列
 * @return {Uint8Array} - 変換されたUint8Array
 */
function stringToUint8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// Monaco Editorの初期化
document.addEventListener('DOMContentLoaded', () => {
  const editor =
    monaco.editor.create(document.getElementById('editor') as HTMLElement, {
      value: '',
      language: 'python',
      theme: 'vs-dark',
    });

  // Load main.pyボタンのクリックイベント
  const loadFileButton =
    document.getElementById('loadFileButton') as HTMLButtonElement;
  loadFileButton.addEventListener('click', async () => {
    await loadTempPy(editor);
  });

  // Send Textボタンのクリックイベント
  const saveFileButton =
    document.getElementById('saveFileButton') as HTMLButtonElement;
  saveFileButton.addEventListener('click', async () => {
    const text = editor.getValue();
    const binaryData = stringToUint8Array(text);
    await device.writeFile('temp.py', binaryData); // エディタの内容をファイルに書き込む
    readpicoport(); // ターミナル出力を再開
  });

  // run Code ボタンのクリックイベント
  const runCodeButton =
    document.getElementById('runCodeButton') as HTMLButtonElement;
  runCodeButton.addEventListener('click', async () => {
    // CTRL+A, コード, CTRL+D, CTRL+B
    const text = '\x01' + editor.getValue() + '\x04\x02';
    await device.sendCommand(text); // エディタの内容を実行
  });

  // STOPボタン：CTRL-C を送信
  const stopButton =
    document.getElementById('stopButton') as HTMLButtonElement;
  stopButton.addEventListener('click', async ()=> {
    await device.sendCommand('\x03'); // CTRL+C
  });
});
