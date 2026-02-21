import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      '/aplicares': {
        target: 'https://faskes.bpjs-kesehatan.go.id',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
