import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    open: 'https://2cb6-2a01-cb05-687-2c00-258d-ea05-8359-bb62.ngrok-free.app',
    allowedHosts: [
      '2cb6-2a01-cb05-687-2c00-258d-ea05-8359-bb62.ngrok-free.app',
    ],
  }
})

