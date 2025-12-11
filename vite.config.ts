import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~core': resolve(__dirname, 'src/core/index.ts'),
      '~styles': resolve(__dirname, 'src/styles'),
      '~assets': resolve(__dirname, 'src/assets'),
    },
  },
});
