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
│  ├─ index.ts
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


