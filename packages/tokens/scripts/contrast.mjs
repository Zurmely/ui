#!/usr/bin/env node
/**
 * Validates documented color pairs from COLOR-SEMANTICS.md against WCAG contrast floors.
 * Run: node packages/tokens/scripts/contrast.mjs
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const colorsPath = resolve(__dirname, '../../../colors.css');
const css = readFileSync(colorsPath, 'utf8');

function parseOklch(value) {
  const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (!m) return null;
  return { L: Number(m[1]), C: Number(m[2]), H: Number(m[3]) };
}

function oklchToSrgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const toChannel = (c) => {
    const clamped = Math.max(0, Math.min(1, c));
    return clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };
  return [toChannel(r), toChannel(g), toChannel(bl)];
}

/** WCAG 2 relative luminance (sRGB channels in 0–1). */
function relLum(rgb) {
  const f = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
}

function contrast(a, b) {
  const L1 = relLum(a);
  const L2 = relLum(b);
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

function findRuleBody(cssText, selector) {
  const index = cssText.indexOf(selector);
  if (index === -1) {
    return null;
  }

  const braceStart = cssText.indexOf('{', index + selector.length);
  if (braceStart === -1) {
    return null;
  }

  let depth = 0;
  for (let i = braceStart; i < cssText.length; i += 1) {
    const char = cssText[i];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return cssText.slice(braceStart + 1, i);
      }
    }
  }

  return null;
}

function parseVarsFromBody(body) {
  const vars = {};
  if (!body) {
    return vars;
  }

  for (const line of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    vars[line[1]] = line[2].trim();
  }

  return vars;
}

function parseBlocks(cssText) {
  const blocks = {};
  const re = /([^{]+)\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(cssText)) !== null) {
    const selector = m[1].trim();
    const body = m[2];
    const theme = selector.includes('[data-theme="dark"]')
      ? 'dark'
      : selector.includes(':root') || selector.includes('[data-theme="light"]')
        ? 'light'
        : null;
    if (!theme) continue;
    const vars = {};
    for (const line of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      vars[line[1]] = line[2].trim();
    }
    blocks[theme] = { ...blocks[theme], ...vars };
  }
  return blocks;
}

function parseHighContrastOverrides(cssText) {
  const lightBody = findRuleBody(
    cssText,
    ':root[data-contrast="high"]:not([data-theme="dark"]),\n[data-theme="light"][data-contrast="high"]',
  );
  const darkBody = findRuleBody(cssText, '[data-theme="dark"][data-contrast="high"]');

  return {
    light: parseVarsFromBody(lightBody),
    dark: parseVarsFromBody(darkBody),
  };
}

function resolveVar(name, vars, depth = 0) {
  if (depth > 20) return null;
  const raw = vars[name];
  if (!raw) return null;
  const varRef = raw.match(/var\((--[\w-]+)\)/);
  if (varRef) return resolveVar(varRef[1], vars, depth + 1);
  return parseOklch(raw);
}

function rgbFromVar(name, vars) {
  const ok = resolveVar(name, vars);
  if (!ok) return null;
  return oklchToSrgb(ok.L, ok.C, ok.H);
}

const themes = parseBlocks(css);
const highContrastOverrides = parseHighContrastOverrides(css);

const STATUS = ['danger', 'success', 'warning', 'info'];
const STATUS_ON_SOLID = ['danger', 'success'];
const STATUS_ON_STEP_50 = [
  { status: 'warning', fg: '--z-color-text-on-warning' },
  { status: 'info', fg: '--z-color-text-on-info' },
];

const PAIRS = [
  { label: 'primary fill / on-primary ink', bg: '--z-color-background-primary', fg: '--z-color-text-on-primary', min: 4.5 },
  { label: 'primary hover / on-primary ink', bg: '--z-color-background-primary-hover', fg: '--z-color-text-on-primary', min: 4.5 },
  { label: 'primary active / on-primary ink', bg: '--z-color-background-primary-active', fg: '--z-color-text-on-primary', min: 4.5 },
  ...STATUS_ON_SOLID.flatMap((status) => [
    {
      label: `${status} fill / on-solid ink`,
      bg: `--z-color-background-${status}`,
      fg: '--z-color-text-on-solid',
      min: 4.5,
    },
    {
      // Interactive solid fills may darken; bold control labels use the 3:1 UI floor.
      label: `${status} hover / on-solid ink`,
      bg: `--z-color-background-${status}-hover`,
      fg: '--z-color-text-on-solid',
      min: 3,
    },
    {
      label: `${status} active / on-solid ink`,
      bg: `--z-color-background-${status}-active`,
      fg: '--z-color-text-on-solid',
      min: 3,
    },
  ]),
  ...STATUS_ON_STEP_50.flatMap(({ status, fg }) => [
    {
      label: `${status} fill / on-${status} ink`,
      bg: `--z-color-background-${status}`,
      fg,
      min: 4.5,
    },
    {
      label: `${status} hover / on-${status} ink`,
      bg: `--z-color-background-${status}-hover`,
      fg,
      min: 3,
    },
    {
      label: `${status} active / on-${status} ink`,
      bg: `--z-color-background-${status}-active`,
      fg,
      min: 3,
    },
  ]),
  ...STATUS.flatMap((status) => [
    {
      label: `${status} subtle / ${status} text`,
      bg: `--z-color-background-${status}-subtle`,
      fg: `--z-color-text-${status}`,
      min: 4.5,
    },
  ]),
  { label: 'text primary on surface', bg: '--z-color-background-surface', fg: '--z-color-text-primary', min: 4.5 },
  { label: 'text secondary on surface', bg: '--z-color-background-surface', fg: '--z-color-text-secondary', min: 4.5 },
  { label: 'text tertiary on surface', bg: '--z-color-background-surface', fg: '--z-color-text-tertiary', min: 4.5 },
  { label: 'text inverse on inverse', bg: '--z-color-background-inverse', fg: '--z-color-text-inverse', min: 4.5 },
  { label: 'text disabled on muted', bg: '--z-color-background-muted', fg: '--z-color-text-disabled', min: 3 },
  { label: 'border default on surface', bg: '--z-color-background-surface', fg: '--z-color-border-default', min: 3 },
  { label: 'focus ring on canvas', bg: '--z-color-background-canvas', fg: '--z-color-focus-ring', min: 3 },
  { label: 'enabled vs disabled primary fill', bg: '--z-color-background-primary', fg: '--z-color-background-primary-disabled', min: 3, fillSeparation: true },
];

const HIGH_CONTRAST_PAIRS = [
  { label: 'text primary on surface', bg: '--z-color-background-surface', fg: '--z-color-text-primary', min: 7 },
  { label: 'text secondary on surface', bg: '--z-color-background-surface', fg: '--z-color-text-secondary', min: 7 },
  { label: 'text tertiary on surface', bg: '--z-color-background-surface', fg: '--z-color-text-tertiary', min: 7 },
  { label: 'text disabled on muted', bg: '--z-color-background-muted', fg: '--z-color-text-disabled', min: 4.5 },
  { label: 'border default on surface', bg: '--z-color-background-surface', fg: '--z-color-border-default', min: 3 },
  { label: 'border strong on surface', bg: '--z-color-background-surface', fg: '--z-color-border-strong', min: 3 },
  { label: 'focus ring on canvas', bg: '--z-color-background-canvas', fg: '--z-color-focus-ring', min: 3 },
];

let failed = 0;

function runPairs(sectionLabel, pairList, varsByTheme) {
  for (const theme of ['light', 'dark']) {
    const vars = varsByTheme[theme];
    console.log(`\n== ${sectionLabel} ${theme}`);
    for (const pair of pairList) {
      const a = rgbFromVar(pair.bg, vars);
      const b = rgbFromVar(pair.fg, vars);
      if (!a || !b) {
        console.log(`  SKIP ${pair.label} (unresolved)`);
        continue;
      }
      const ratio = contrast(a, b);
      const ok = ratio >= pair.min;
      if (!ok) failed++;
      console.log(`  ${ok ? 'PASS' : 'FAIL'} ${pair.label.padEnd(36)} ${ratio.toFixed(2)} (min ${pair.min})`);
    }
  }
}

runPairs('base', PAIRS, themes);

const highContrastThemes = {
  light: { ...themes.light, ...highContrastOverrides.light },
  dark: { ...themes.dark, ...highContrastOverrides.dark },
};

runPairs('high contrast', HIGH_CONTRAST_PAIRS, highContrastThemes);

if (failed > 0) {
  console.error(`\n${failed} pair(s) failed.`);
  process.exit(1);
}

console.log('\nAll pairs passed.');
