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

const primitiveSpacingPattern = /--z-space-(?:0(?:-5)?|[1-9]\d*)\b/;
const primitiveRadiusPattern = /--z-radius-(?:0|[1-3]|full)\b/;
const spacingPropertyPattern = /\b(padding(?:-(?:block|inline)(?:-(?:start|end))?|top|right|bottom|left)?|margin(?:-(?:block|inline)(?:-(?:start|end))?|top|right|bottom|left)?)\s*:\s*([^;{}]+)/g;
const radiusPropertyPattern = /\bborder-radius\s*:\s*([^;{}]+)/g;
const hardcodedLengthPattern = /(?<![-\w])(?:\d*\.?\d+)(?:rem|px|em)\b/;

const semanticRadiusNames = new Set([
  'control',
  'control-compact',
  'surface',
  'container',
  'pill',
  'circle',
]);

const gapPropertyPattern = /\b(gap|row-gap|column-gap)\s*:\s*([^;{}]+)/g;
const axisTokenPattern = /var\(--z-spacing-[^)]+\)/g;

type Axis = 'y' | 'x';

function tokenAxis(token: string): Axis | null {
  if (/-y\b/.test(token)) {
    return 'y';
  }
  if (/-x\b/.test(token)) {
    return 'x';
  }
  return null;
}

function axisForProperty(property: string, position: number): Axis | null {
  if (property.endsWith('-top') || property.endsWith('-bottom') || property === 'padding-block' || property === 'margin-block' || property.endsWith('-block-start') || property.endsWith('-block-end')) {
    return 'y';
  }
  if (property.endsWith('-left') || property.endsWith('-right') || property === 'padding-inline' || property === 'margin-inline' || property.endsWith('-inline-start') || property.endsWith('-inline-end')) {
    return 'x';
  }
  if (property === 'padding' || property === 'margin') {
    if (position === 0) return 'y';
    if (position === 1) return 'x';
    if (position === 2) return 'y';
    if (position === 3) return 'x';
  }
  return null;
}

function isAllowedRadiusPart(value: string): boolean {
  const normalized = value.trim();
  if (normalized === '0' || normalized === 'inherit' || normalized === 'unset') {
    return true;
  }
  const semanticMatch = normalized.match(/^var\(--z-radius-([a-z0-9-]+)\)$/);
  if (semanticMatch && semanticRadiusNames.has(semanticMatch[1])) {
    return true;
  }
  return false;
}

function isAllowedSpacingValue(value: string): boolean {
  const normalized = value.trim();
  if (/^0(?:\s+0)*$/.test(normalized)) {
    return true;
  }
  if (normalized.includes('var(--z-spacing-')) {
    return true;
  }
  return !hardcodedLengthPattern.test(normalized);
}

function isAllowedRadiusValue(value: string): boolean {
  const parts = value.trim().split(/\s+/);
  return parts.every((part) => isAllowedRadiusPart(part));
}

function findHardcodedSpacing(content: string): string[] {
  const violations: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = spacingPropertyPattern.exec(content)) !== null) {
    const property = match[1];
    const value = match[2];
    if (!isAllowedSpacingValue(value)) {
      violations.push(`${property}: ${value.trim()}`);
    }
  }

  gapPropertyPattern.lastIndex = 0;
  while ((match = gapPropertyPattern.exec(content)) !== null) {
    const property = match[1];
    const value = match[2];
    if (!isAllowedSpacingValue(value)) {
      violations.push(`${property}: ${value.trim()}`);
    }
  }

  return violations;
}

function findAxisTokenMisuse(content: string): string[] {
  const violations: string[] = [];
  let match: RegExpExecArray | null;

  spacingPropertyPattern.lastIndex = 0;
  while ((match = spacingPropertyPattern.exec(content)) !== null) {
    const property = match[1];
    const value = match[2].trim();
    const tokens = value.match(axisTokenPattern) ?? [];

    if (tokens.length === 0) {
      continue;
    }

    const parts = value.split(/\s+/);
    for (let index = 0; index < parts.length; index += 1) {
      const part = parts[index];
      const tokenMatch = part.match(axisTokenPattern);
      if (!tokenMatch) {
        continue;
      }
      const expectedAxis = axisForProperty(property, index);
      const actualAxis = tokenAxis(tokenMatch[0]);
      if (expectedAxis && actualAxis && expectedAxis !== actualAxis) {
        violations.push(`${property}: ${value} (${actualAxis}-axis token in ${expectedAxis}-axis position)`);
        break;
      }
    }
  }

  return violations;
}

function findHardcodedRadius(content: string): string[] {
  const violations: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = radiusPropertyPattern.exec(content)) !== null) {
    const value = match[1];
    if (!isAllowedRadiusValue(value)) {
      violations.push(`border-radius: ${value.trim()}`);
    }
  }

  return violations;
}

describe('semantic size audit', () => {
  const cssFiles = [...collectCssFiles(componentsDir), ...collectCssFiles(sharedDir)];

  it('audits all component and shared css files', () => {
    expect(cssFiles.length).toBeGreaterThan(0);
  });

  for (const file of cssFiles) {
    it(`${file.split('/src/')[1]} uses semantic size tokens only`, () => {
      const content = readFileSync(file, 'utf8');
      expect(content).not.toMatch(primitiveSpacingPattern);
      expect(content).not.toMatch(primitiveRadiusPattern);
      expect(findHardcodedSpacing(content)).toEqual([]);
      expect(findHardcodedRadius(content)).toEqual([]);
      expect(findAxisTokenMisuse(content)).toEqual([]);
    });
  }
});
