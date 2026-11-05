import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // No GitHub Pages o site fica em /crud-fullstack-produtos/. Localmente continua em "/".
  base: process.env.GITHUB_ACTIONS ? '/crud-fullstack-produtos/' : '/',
})