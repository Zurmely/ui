import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const componentsDir = join(import.meta.dirname, '../components');
const primitivesDir = join(import.meta.dirname, '../primitives');

function collectCssFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectCssFiles(fullPath));
    } else if (entry.name.endsWith('.css')) {
      files.push(fullPath);
    }
  }
  return files;
}

const primitivePattern =
  /--(green|blue|purple|pink|rose|red|salmon|orange|yellow|olive|neutral)-\d+/;
const rawColorPattern = /(?:^|[^-])#[0-9a-fA-F]{3,8}\b|oklch\(/;

describe('semantic color audit', () => {
  const cssFiles = [...collectCssFiles(componentsDir), ...collectCssFiles(primitivesDir)];

  it('audits all chart css files', () => {
    expect(cssFiles.length).toBeGreaterThan(0);
  });

  for (const file of cssFiles) {
    it(`${file.split('/src/')[1]} uses semantic tokens only`, () => {
      const content = readFileSync(file, 'utf8');
      expect(content).not.toMatch(primitivePattern);
      expect(content).not.toMatch(rawColorPattern);
    });
  }
});
