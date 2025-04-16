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
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['monaco-editor'],
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
    include: ['monaco-editor'],
  },
  define: {
    __BUILD_NUMBER__: JSON.stringify(buildData.buildNumber),
  },
});