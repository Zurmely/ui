import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcShared = resolve(__dirname, '../src/shared');
const distDir = resolve(__dirname, '../dist');

mkdirSync(distDir, { recursive: true });

const sharedCss = ['focus-ring.css', 'visually-hidden.css'];
const bundleParts = [
  ...sharedCss.map((file) => readFileSync(resolve(srcShared, file), 'utf8')),
];

const componentsDir = resolve(__dirname, '../src/components');
for (const name of readdirSync(componentsDir)) {
  const cssPath = resolve(componentsDir, name, `${name}.css`);
  try {
    bundleParts.push(readFileSync(cssPath, 'utf8'));
  } catch {
    // component may not have css yet
  }
}

writeFileSync(resolve(distDir, 'styles.css'), bundleParts.join('\n\n'));
console.log('Bundled component CSS to dist/styles.css');
