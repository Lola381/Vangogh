import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

const root = import.meta.dirname;

function copyMuseumAssets() {
  return {
    name: 'copy-museum-assets',
    apply: 'build',
    closeBundle() {
      for (const directory of ['images', 'frames']) {
        cpSync(resolve(root, directory), resolve(root, 'dist', directory), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyMuseumAssets()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        visit: resolve(root, 'visit.html'),
        webstore: resolve(root, 'webstore.html'),
      },
    },
  },
});
