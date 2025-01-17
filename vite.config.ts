import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@best-practice/images': path.resolve(__dirname, 'public/mockup_img'),
      '@best-practice/pages': path.resolve(__dirname, 'src/pages'),
      '@best-practice/styles': path.resolve(__dirname, 'src/styles'),
      '@best-practice/types': path.resolve(__dirname, 'src/types'),
    },
  },
});
