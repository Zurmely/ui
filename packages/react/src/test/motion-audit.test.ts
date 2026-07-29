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

const primitiveDurationPattern = /--z-duration-(?:0|100|150|200|800)\b/;
const primitiveEasingPattern = /--z-easing-(?:standard|linear|decelerate|accelerate)\b/;
const transitionPropertyPattern = /\btransition\s*:\s*([^;{}]+)/g;
const animationPropertyPattern = /\banimation\s*:\s*([^;{}]+)/g;
const hardcodedDurationPattern = /(?<!var\([^)]*)(?<![-\w])(?:\d*\.?\d+)(?:ms|s)\b/;
const hardcodedEasingPattern =
  /\b(?:ease(?:-in|-out|-in-out)?|linear|cubic-bezier\([^)]+\))\b/;

function stripVarReferences(value: string): string {
  return value.replace(/var\([^)]+\)/g, '');
}

function findHardcodedMotion(content: string): string[] {
  const violations: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = transitionPropertyPattern.exec(content)) !== null) {
    const value = match[1].trim();
    if (value === 'none') {
      continue;
    }
    const stripped = stripVarReferences(value);
    if (hardcodedDurationPattern.test(stripped)) {
      violations.push(`transition: ${value}`);
    }
    if (hardcodedEasingPattern.test(stripped)) {
      violations.push(`transition easing: ${value}`);
    }
  }

  while ((match = animationPropertyPattern.exec(content)) !== null) {
    const value = match[1].trim();
    if (value === 'none') {
      continue;
    }
    const stripped = stripVarReferences(value);
    if (hardcodedDurationPattern.test(stripped)) {
      violations.push(`animation: ${value}`);
    }
    if (hardcodedEasingPattern.test(stripped)) {
      violations.push(`animation easing: ${value}`);
    }
  }

  return violations;
}

function hasKeyframesAnimation(content: string): boolean {
  return /@keyframes\b/.test(content);
}

function hasReducedMotionBlock(content: string): boolean {
  return /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/.test(content);
}

describe('semantic motion audit', () => {
  const cssFiles = [...collectCssFiles(componentsDir), ...collectCssFiles(sharedDir)];

  it('audits all component and shared css files', () => {
    expect(cssFiles.length).toBeGreaterThan(0);
  });

  for (const file of cssFiles) {
    it(`${file.split('/src/')[1]} uses semantic motion tokens only`, () => {
      const content = readFileSync(file, 'utf8');
      expect(content).not.toMatch(primitiveDurationPattern);
      expect(content).not.toMatch(primitiveEasingPattern);
      expect(findHardcodedMotion(content)).toEqual([]);
      if (hasKeyframesAnimation(content)) {
        expect(hasReducedMotionBlock(content)).toBe(true);
      }
    });
  }
});
