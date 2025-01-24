import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import config from './src/importenv'


export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: config.port,
    proxy: {
      '/api': {
        target: config.backendLink,
        changeOrigin: true,
        secure: false,
      },
    },
      allowedHosts: ['uniqueeyes-1.onrender.com'],
  },
  plugins: [react()],
});