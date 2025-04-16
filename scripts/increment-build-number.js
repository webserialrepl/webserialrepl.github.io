const fs = require('fs');
const path = require('path');

// ビルド番号を管理するファイルのパス
const buildNumberFile = path.resolve(__dirname, '../build-number.json');

// ファイルを読み込む
const buildData = JSON.parse(fs.readFileSync(buildNumberFile, 'utf8'));

// ビルド番号を増やす
buildData.buildNumber += 1;

// ファイルを更新する
fs.writeFileSync(buildNumberFile, JSON.stringify(buildData, null, 2), 'utf8');

console.log(`Build number updated to: ${buildData.buildNumber}`);