import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const backendUrl = 'http://localhost:8088'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: backendUrl, //目标域名
        changeOrigin: true, //需要代理跨域
        // rewrite: (path) => path.replace(/^\/api/, ''), //路径重写，把'/api'替换为''
      },
    },
  },

})
