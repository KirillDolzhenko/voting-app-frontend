import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import * as path from 'path';

const config = dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: Number(config.parsed?.VITE_PORT_SERVER) || 5173,
  },
  preview: {
    port: Number(config.parsed?.VITE_PORT_PREVIEW) || 5173,
  },
});
