import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import webmanifest from './src/manifest.json';
import fs from 'fs';
import path from 'path';

const buildNumberFile = path.resolve(__dirname, './build-number.json');
const buildData = JSON.parse(fs.readFileSync(buildNumberFile, 'utf8'));

export default defineConfig(({ mode }) => {
  // mode が 'develop' かどうかを直接判定（.env ファイルがなくても機能します）
  const isDevMode = mode === 'develop';

  return {
    // gh-pages では develop は /develop/ に配置されるので、ベースパスを切り替え
    base: isDevMode ? '/develop/' : '/',

    build: {
      outDir: 'dist',   // 常に dist に出力
    },

    // 💡 ローカルで dist をデバッグ（npm run preview:dev）する時のための設定を追加
    preview: {
      port: 3000,
      strictPort: true,
    },

    plugins: [
      tsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: webmanifest,
      }),
    ],

    define: {
      __BUILD_NUMBER__: JSON.stringify(buildData.buildNumber),
    },
  };
});
