import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { fileURLToPath, URL } from 'node:url';
import dotenv from 'dotenv';
import million from 'million/compiler';

dotenv.config(); // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [million.vite(), react(), viteTsconfigPaths(), svgrPlugin()],
});
