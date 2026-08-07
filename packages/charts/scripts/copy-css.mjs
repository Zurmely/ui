import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '../src');
const distDir = resolve(__dirname, '../dist');

const bundleParts = [];

const primitivesDir = resolve(srcDir, 'primitives');
try {
  bundleParts.push(readFileSync(resolve(primitivesDir, 'chart.css'), 'utf8'));
} catch {
  // primitives css may not exist yet
}

const componentsDir = resolve(srcDir, 'components');
for (const name of readdirSync(componentsDir)) {
  const cssPath = resolve(componentsDir, name, `${name}.css`);
  try {
    bundleParts.push(readFileSync(cssPath, 'utf8'));
  } catch {
    // component may not have css yet
  }
}

writeFileSync(resolve(distDir, 'styles.css'), bundleParts.join('\n\n'));
console.log('Bundled chart CSS to dist/styles.css');
