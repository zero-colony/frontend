import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), tailwindcss()],

  resolve: {
    alias: {
      '@features': path.resolve(__dirname, './src/features'),
      '@avatars': path.resolve(__dirname, './src/features/avatars'),
      '@global': path.resolve(__dirname, './src/features/global'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@selectors': path.resolve(__dirname, './src/redux/selectors'),
      '@slices': path.resolve(__dirname, './src/redux/slices'),
      '@root': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api'),
      '@crypto': path.resolve(__dirname, './src/crypto'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@classes': path.resolve(__dirname, './src/classes'),
      '@images': path.resolve(__dirname, './src/images'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
});
