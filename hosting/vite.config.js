// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        aboutus: resolve(__dirname, 'aboutus/index.html'),
        map: resolve(__dirname, 'map/index.html'),
        cookbook: resolve(__dirname, 'cookbook/index.html'),
      },
    },
  },
})