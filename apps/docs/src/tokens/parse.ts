export type TokenTier = 'primitive' | 'semantic' | 'component';

export type TokenCategory = 'colors' | 'sizes' | 'text' | 'motion' | 'elevation';

export interface ParsedToken {
  name: string;
  value: string;
  tier: TokenTier;
  category: TokenCategory;
  theme?: 'light' | 'dark' | 'shared';
}

export interface TokenManifest {
  colors: ParsedToken[];
  sizes: ParsedToken[];
  text: ParsedToken[];
  motion: ParsedToken[];
  elevation: ParsedToken[];
}

function classifyColorTier(name: string): TokenTier {
  if (name.startsWith('--z-color-')) {
    if (name.includes('-select-')) return 'component';
    return 'semantic';
  }
  if (name.startsWith('--z-absolute-')) return 'semantic';
  return 'primitive';
}

function classifySizeTier(name: string): TokenTier {
  if (name.startsWith('--z-spacing-select-')) return 'component';
  if (name.startsWith('--z-spacing-') || name.startsWith('--z-radius-')) {
    if (name.startsWith('--z-space-') || name.startsWith('--z-radius-0') || name === '--z-radius-full') {
      return 'primitive';
    }
    if (name.match(/^--z-radius-[0-3]$/)) return 'primitive';
    return 'semantic';
  }
  if (name.startsWith('--z-space-') || name.match(/^--z-radius-[0-3]$/) || name === '--z-radius-full') {
    return 'primitive';
  }
  return 'semantic';
}

function classifyTextTier(name: string): TokenTier {
  if (name.startsWith('--z-text-')) return 'semantic';
  return 'primitive';
}

function classifyMotionTier(name: string): TokenTier {
  if (name.startsWith('--z-motion-')) return 'semantic';
  return 'primitive';
}

function classifyElevationTier(name: string): TokenTier {
  if (name.startsWith('--z-elevation-')) return 'semantic';
  return 'primitive';
}

function detectTheme(blockSelector: string): 'light' | 'dark' | 'shared' {
  if (blockSelector.includes('[data-theme="dark"]')) return 'dark';
  if (blockSelector.includes('[data-theme="light"]') || blockSelector.includes(':root')) return 'light';
  return 'shared';
}

function parseCssTokens(css: string, category: TokenCategory): ParsedToken[] {
  const tokens: ParsedToken[] = [];
  const blockRegex = /([^{]+)\{([^}]*)\}/g;
  let blockMatch: RegExpExecArray | null;

  while ((blockMatch = blockRegex.exec(css)) !== null) {
    const selector = blockMatch[1].trim();
    const body = blockMatch[2];
    const theme = detectTheme(selector);
    const propRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let propMatch: RegExpExecArray | null;

    while ((propMatch = propRegex.exec(body)) !== null) {
      const name = propMatch[1];
      const value = propMatch[2].trim();

      let tier: TokenTier;
      switch (category) {
        case 'colors':
          tier = classifyColorTier(name);
          break;
        case 'sizes':
          tier = classifySizeTier(name);
          break;
        case 'text':
          tier = classifyTextTier(name);
          break;
        case 'motion':
          tier = classifyMotionTier(name);
          break;
        case 'elevation':
          tier = classifyElevationTier(name);
          break;
      }

      tokens.push({ name, value, tier, category, theme });
    }
  }

  const unique = new Map<string, ParsedToken>();
  for (const token of tokens) {
    const key = `${token.name}:${token.theme ?? 'shared'}`;
    if (!unique.has(key)) {
      unique.set(key, token);
    }
  }

  return Array.from(unique.values());
}

import colorsCss from '../../../../colors.css?raw';
import sizesCss from '../../../../sizes.css?raw';
import textCss from '../../../../text.css?raw';
import motionCss from '../../../../motion.css?raw';
import elevationCss from '../../../../elevation.css?raw';

export function buildTokenManifest(): TokenManifest {
  return {
    colors: parseCssTokens(colorsCss, 'colors'),
    sizes: parseCssTokens(sizesCss, 'sizes'),
    text: parseCssTokens(textCss, 'text'),
    motion: parseCssTokens(motionCss, 'motion'),
    elevation: parseCssTokens(elevationCss, 'elevation'),
  };
}

export const COLOR_FAMILIES = [
  'green',
  'blue',
  'purple',
  'pink',
  'rose',
  'red',
  'salmon',
  'orange',
  'yellow',
  'olive',
  'neutral',
] as const;

export const COLOR_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

export const MEANING_PALETTES = ['danger', 'success', 'warning', 'info'] as const;

export function getPrimitiveColorTokens(manifest: TokenManifest, theme: 'light' | 'dark') {
  return manifest.colors.filter(
    (t) =>
      t.tier === 'primitive' &&
      !t.name.startsWith('--z-') &&
      (t.theme === theme || t.theme === 'shared'),
  );
}

export function getSemanticColorTokens(manifest: TokenManifest, role: string) {
  return manifest.colors.filter(
    (t) => t.tier === 'semantic' && t.name.includes(`--z-color-${role}-`),
  );
}

export function getTokensByTier(manifest: TokenManifest, category: TokenCategory, tier: TokenTier) {
  return manifest[category].filter((t) => t.tier === tier);
}

export function resolveTokenValue(tokenName: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
}
