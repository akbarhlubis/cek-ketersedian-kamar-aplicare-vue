import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {
  // Pakai cara ini biar lebih aman di lingkungan Node/Vite
  const isServer = process.env.BUILD_TARGET === 'server';

  return {
    plugins: [vue(), tailwindcss()],
    build: {
      // Pastiin folder /var/www/cek-kamar sudah lo 'chown' ke user ubuntu ya!
      outDir: isServer ? '/var/www/cek-kamar' : 'dist',
      emptyOutDir: true,
    },
    server: {
      proxy: {
        '/aplicares': {
          target: 'https://faskes.bpjs-kesehatan.go.id',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})