import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const componentsDir = join(import.meta.dirname, '../components');
const sharedDir = join(import.meta.dirname, '../shared');

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

const primitiveFontSizePattern = /--z-font-size-(?:[1-9])\b/;
const primitiveFontWeightPattern = /--z-font-weight-(?:regular|medium|semibold|bold)\b/;
const primitiveLineHeightPattern = /--z-font-line-height-(?:tight|snug|normal|relaxed)\b/;
const primitiveFontFamilyPattern = /--z-font-family-(?:sans|mono)\b/;

const fontSizePropertyPattern = /\bfont-size\s*:\s*([^;{}]+)/g;
const fontWeightPropertyPattern = /\bfont-weight\s*:\s*([^;{}]+)/g;
const lineHeightPropertyPattern = /\bline-height\s*:\s*([^;{}]+)/g;
const fontFamilyPropertyPattern = /\bfont-family\s*:\s*([^;{}]+)/g;
const fontShorthandPropertyPattern = /\bfont\s*:\s*([^;{}]+)/g;

function isAllowedTypographyValue(value: string): boolean {
  const normalized = value.trim();
  if (normalized === 'inherit' || normalized === 'unset' || normalized === 'normal') {
    return true;
  }
  if (normalized.includes('var(--z-text-')) {
    return true;
  }
  return false;
}

function isAllowedFontShorthand(value: string): boolean {
  const normalized = value.trim();
  return normalized === 'inherit' || normalized === 'unset';
}

function findTypographyViolations(content: string, propertyPattern: RegExp): string[] {
  const violations: string[] = [];
  let match: RegExpExecArray | null;
  const pattern = new RegExp(propertyPattern.source, propertyPattern.flags);

  while ((match = pattern.exec(content)) !== null) {
    const property = match[0].split(':')[0].trim();
    const value = match[1];
    if (!isAllowedTypographyValue(value)) {
      violations.push(`${property}: ${value.trim()}`);
    }
  }

  return violations;
}

function findFontShorthandViolations(content: string): string[] {
  const violations: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = fontShorthandPropertyPattern.exec(content)) !== null) {
    const value = match[1];
    if (!isAllowedFontShorthand(value)) {
      violations.push(`font: ${value.trim()}`);
    }
  }

  return violations;
}

describe('semantic text audit', () => {
  const cssFiles = [...collectCssFiles(componentsDir), ...collectCssFiles(sharedDir)];

  it('audits all component and shared css files', () => {
    expect(cssFiles.length).toBeGreaterThan(0);
  });

  for (const file of cssFiles) {
    it(`${file.split('/src/')[1]} uses semantic text tokens only`, () => {
      const content = readFileSync(file, 'utf8');
      expect(content).not.toMatch(primitiveFontSizePattern);
      expect(content).not.toMatch(primitiveFontWeightPattern);
      expect(content).not.toMatch(primitiveLineHeightPattern);
      expect(content).not.toMatch(primitiveFontFamilyPattern);
      expect(findTypographyViolations(content, fontSizePropertyPattern)).toEqual([]);
      expect(findTypographyViolations(content, fontWeightPropertyPattern)).toEqual([]);
      expect(findTypographyViolations(content, lineHeightPropertyPattern)).toEqual([]);
      expect(findTypographyViolations(content, fontFamilyPropertyPattern)).toEqual([]);
      expect(findFontShorthandViolations(content)).toEqual([]);
    });
  }
});
