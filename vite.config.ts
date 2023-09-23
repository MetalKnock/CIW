import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/app/styles/_variables.scss";
        @import "./src/app/styles/_helpers.scss";
        @import "./src/app/styles/_mixins.scss";
        `,
      },
    },
  },
  build: {
    target: browserslistToEsbuild(),
  },
});
