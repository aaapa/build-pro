import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/build-pro/',
  plugins: [react()],
  resolve: {
    alias: [{ find: '@/', replacement: resolve('src') + '/' }],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'main.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css')
            return 'main.css';
          return '[name].[ext]';
        },
      },
    },
    assetsDir: '',
    outDir: 'dist',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/app/styles/helpers' as *;\n`,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
});
