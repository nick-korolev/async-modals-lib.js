import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// eslint-disable-next-line no-undef
const isPublish = process.env.IS_PUBLISH == '1';

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line no-undef
  base: isPublish ? '/async-modals-lib.js/' : '',
  format: 'esm',
  plugins: [
    vue(), 
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: isPublish ? '../../vue-dist' : 'dist',
  },
});
