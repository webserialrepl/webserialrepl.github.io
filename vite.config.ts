import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import webmanifest from './src/manifest.json';
import fs from 'fs';
import path from 'path';

// ビルド番号を読み込む
const buildNumberFile = path.resolve(__dirname, './build-number.json');
const buildData = JSON.parse(fs.readFileSync(buildNumberFile, 'utf8'));

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    sourcemap: false, // ソースマップを無効化（必要な場合は true に設定）
    minify: 'esbuild', // 高速な esbuild を使用して最小化
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['monaco-editor'], // 手動チャンク分割
        },
      },
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: webmanifest,
    }),
  ],
  optimizeDeps: {
    include: ['monaco-editor'], // 必要な依存関係を事前バンドル
  },
  define: {
    __BUILD_NUMBER__: JSON.stringify(buildData.buildNumber),
  },
});