import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@z-ui/react': resolve(__dirname, '../../packages/react/src'),
      '@z-ui/tokens/colors.css': resolve(__dirname, '../../colors.css'),
      '@z-ui/tokens/sizes.css': resolve(__dirname, '../../sizes.css'),
      '@z-ui/tokens/text.css': resolve(__dirname, '../../text.css'),
      '@z-ui/tokens/motion.css': resolve(__dirname, '../../motion.css'),
      '@z-ui/tokens/elevation.css': resolve(__dirname, '../../elevation.css'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
