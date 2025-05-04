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

To create a production build in the `dist` folder run,
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
