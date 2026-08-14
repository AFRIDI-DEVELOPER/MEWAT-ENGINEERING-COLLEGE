import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5174,
    strictPort: true, // Fail if 5174 is already in use
    host: true,
    open: false
  }
})
