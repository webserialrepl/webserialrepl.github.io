import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import webmanifest from './src/manifest.json';

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
});