import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.join(__dirname, 'src/components'),
      '@hooks': path.join(__dirname, 'src/hooks'),
      '@pages': path.join(__dirname, 'src/pages'),
    },
  },
});
