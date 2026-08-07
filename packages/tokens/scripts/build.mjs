import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../..');
const outDir = resolve(__dirname, '../dist');

mkdirSync(outDir, { recursive: true });
copyFileSync(resolve(root, 'colors.css'), resolve(outDir, 'colors.css'));
copyFileSync(resolve(root, 'sizes.css'), resolve(outDir, 'sizes.css'));
copyFileSync(resolve(root, 'text.css'), resolve(outDir, 'text.css'));
copyFileSync(resolve(root, 'motion.css'), resolve(outDir, 'motion.css'));
copyFileSync(resolve(root, 'elevation.css'), resolve(outDir, 'elevation.css'));
console.log('Copied colors.css to @z-ux/tokens/dist/colors.css');
console.log('Copied sizes.css to @z-ux/tokens/dist/sizes.css');
console.log('Copied text.css to @z-ux/tokens/dist/text.css');
console.log('Copied motion.css to @z-ux/tokens/dist/motion.css');
console.log('Copied elevation.css to @z-ux/tokens/dist/elevation.css');
