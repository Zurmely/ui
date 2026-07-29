import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');

function readRootCss(filename: string): string {
  return readFileSync(resolve(rootDir, filename), 'utf8');
}

function findRuleBody(css: string, selector: string): string | null {
  const index = css.indexOf(selector);
  if (index === -1) {
    return null;
  }

  const braceStart = css.indexOf('{', index + selector.length);
  if (braceStart === -1) {
    return null;
  }

  let depth = 0;
  for (let i = braceStart; i < css.length; i += 1) {
    const char = css[i];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return css.slice(braceStart + 1, i);
      }
    }
  }

  return null;
}

function parseDeclarations(block: string | null): Map<string, string> {
  const declarations = new Map<string, string>();
  if (!block) {
    return declarations;
  }

  for (const match of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    declarations.set(match[1], match[2].trim());
  }

  return declarations;
}

function expectMatchingProperties(
  label: string,
  mediaBlock: string | null,
  attributeBlock: string | null,
): void {
  const mediaProps = parseDeclarations(mediaBlock);
  const attributeProps = parseDeclarations(attributeBlock);

  expect(mediaProps.size, `${label}: media block missing`).toBeGreaterThan(0);
  expect(attributeProps.size, `${label}: attribute block missing`).toBeGreaterThan(0);
  expect([...mediaProps.keys()].sort(), `${label}: property keys`).toEqual(
    [...attributeProps.keys()].sort(),
  );
}

describe('accessibility flag audit', () => {
  const colorsCss = readRootCss('colors.css');
  const motionCss = readRootCss('motion.css');
  const textCss = readRootCss('text.css');
  const sizesCss = readRootCss('sizes.css');

  it('high contrast light theme: media and attribute blocks match', () => {
    const mediaBlock = findRuleBody(
      colorsCss,
      ':root:not([data-theme="dark"]):not([data-contrast="standard"]),\n  [data-theme="light"]:not([data-contrast="standard"])',
    );
    const attributeBlock = findRuleBody(
      colorsCss,
      ':root[data-contrast="high"]:not([data-theme="dark"]),\n[data-theme="light"][data-contrast="high"]',
    );

    expectMatchingProperties('high contrast light', mediaBlock, attributeBlock);
  });

  it('high contrast dark theme: media and attribute blocks match', () => {
    const mediaBlock = findRuleBody(
      colorsCss,
      '[data-theme="dark"]:not([data-contrast="standard"])',
    );
    const attributeBlock = findRuleBody(colorsCss, '[data-theme="dark"][data-contrast="high"]');

    expectMatchingProperties('high contrast dark', mediaBlock, attributeBlock);
  });

  it('reduced transparency: media and attribute blocks match', () => {
    const mediaBlock = findRuleBody(colorsCss, ':root:not([data-transparency="full"])');
    const attributeBlock = findRuleBody(colorsCss, ':root[data-transparency="reduced"]');

    expectMatchingProperties('reduced transparency', mediaBlock, attributeBlock);
  });

  it('reduced motion: media and attribute blocks match', () => {
    const mediaBlock = findRuleBody(motionCss, ':root:not([data-motion="full"])');
    const attributeBlock = findRuleBody(motionCss, ':root[data-motion="reduced"]');

    expectMatchingProperties('reduced motion', mediaBlock, attributeBlock);
  });

  it('focus ring width: media and attribute blocks match', () => {
    const mediaBlock = findRuleBody(sizesCss, ':root:not([data-contrast="standard"])');
    const attributeBlock = findRuleBody(sizesCss, ':root[data-contrast="high"]');

    expectMatchingProperties('focus ring width', mediaBlock, attributeBlock);
  });

  it('link underline flag sets --z-text-link-decoration', () => {
    const attributeBlock = findRuleBody(textCss, ':root[data-link-underline="always"]');
    const declarations = parseDeclarations(attributeBlock);

    expect(declarations.get('--z-text-link-decoration')).toBe('underline');
  });
});
