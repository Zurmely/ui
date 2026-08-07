import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const reactComponents = resolve(__dirname, '../../packages/react/src/components');
const chartsComponents = resolve(__dirname, '../../packages/charts/src/components');

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@z-ux\/ui\/(.+)$/, replacement: `${reactComponents}/$1` },
      { find: '@z-ux/ui', replacement: resolve(__dirname, '../../packages/react/src') },
      { find: /^@z-ux\/charts\/(.+)$/, replacement: `${chartsComponents}/$1` },
      { find: '@z-ux/charts', replacement: resolve(__dirname, '../../packages/charts/src') },
      { find: '@z-ux/tokens/colors.css', replacement: resolve(__dirname, '../../colors.css') },
      { find: '@z-ux/tokens/sizes.css', replacement: resolve(__dirname, '../../sizes.css') },
      { find: '@z-ux/tokens/text.css', replacement: resolve(__dirname, '../../text.css') },
      { find: '@z-ux/tokens/motion.css', replacement: resolve(__dirname, '../../motion.css') },
      { find: '@z-ux/tokens/elevation.css', replacement: resolve(__dirname, '../../elevation.css') },
    ],
  },
  server: {
    port: 5173,
    open: true,
  },
});
