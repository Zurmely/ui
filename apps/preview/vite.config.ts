import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@z-ux/ui': resolve(__dirname, '../../packages/react/src'),
      '@z-ux/tokens/colors.css': resolve(__dirname, '../../colors.css'),
      '@z-ux/tokens/sizes.css': resolve(__dirname, '../../sizes.css'),
      '@z-ux/tokens/text.css': resolve(__dirname, '../../text.css'),
      '@z-ux/tokens/motion.css': resolve(__dirname, '../../motion.css'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
