import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 1000, // 監視間隔（ms）
    },
    host: '0.0.0.0',
    port: 5500,
  },
});
