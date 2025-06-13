import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import 'dotenv/config';

// Read URL from .env file
const url = process.env.VITE_BASE_URL;
console.log('Vite server started at:', url);

export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    port: 5173, // Ensure Vite runs on port 5173
    open: url, // Open the Ngrok URL in the browser
    allowedHosts: [
      url.replace(/https?:\/\//, ''), // Remove protocol for allowedHosts
    ],
  },
});