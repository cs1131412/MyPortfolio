import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
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
