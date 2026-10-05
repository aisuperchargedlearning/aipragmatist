import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // heic2any (HEIC photo conversion) is large but lazy-loaded only when a HEIC file is uploaded.
    chunkSizeWarningLimit: 1600,
  },
});
