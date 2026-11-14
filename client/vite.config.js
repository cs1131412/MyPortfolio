import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Address of the Express API (see ../server.js). The dev server forwards API
// requests to it, so the browser only ever talks to one origin (no CORS needed),
// whether the site is opened at localhost or from another device on the LAN.
const API_TARGET = process.env.API_TARGET || 'http://localhost:5000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // also listen on the LAN address, so other devices can open the site
    port: 5173,
    proxy: {
      '/api': API_TARGET,
      '/auth': API_TARGET,
    },
    // The project lives on a network drive, where native file-change
    // notifications fail ("file watcher error: UNKNOWN"). Polling checks
    // files on a timer instead, so live reload still works.
    watch: {
      usePolling: true,
      interval: 500,
      ignored: ['**/!PERSONAL/**', '**/!PYTEMPLATE/**', '**/dist/**'],
    },
  },
})
