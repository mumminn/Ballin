import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 백엔드 기본 REST
      '/api':   { target: 'http://localhost:8080', changeOrigin: true },
      // 인증 관련
      '/auth':  { target: 'http://localhost:8080', changeOrigin: true },
      // 카카오 콜백/로그인
      '/kakao': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
});