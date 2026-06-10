import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import webmanifest from './src/manifest.json';
import fs from 'fs';
import path from 'path';

const buildNumberFile = path.resolve(__dirname, './build-number.json');
const buildData = JSON.parse(fs.readFileSync(buildNumberFile, 'utf8'));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isDev = env.VITE_ENV === 'develop';

  return {
    base: isDev ? '/develop/' : '/',   // ★ repo root が webserialrepl.github.io のため
    build: {
      outDir: isDev ? 'dist' : 'docs', // ★ develop は dist に出す
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
