import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' keeps every URL relative, so the built site works from any folder or GitHub Pages sub-path.
export default defineConfig({ base: './', plugins: [react()], build: { outDir: '../docs', emptyOutDir: true, chunkSizeWarningLimit: 2000 } });
