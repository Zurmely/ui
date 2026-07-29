import { matchesMediaQuery } from '../../shared/media-query';

export type ContrastPreference = 'system' | 'standard' | 'high';
export type MotionPreference = 'system' | 'full' | 'reduced';
export type TransparencyPreference = 'system' | 'full' | 'reduced';
export type LinkUnderlinePreference = 'auto' | 'always';

export type ResolvedContrast = 'standard' | 'high';
export type ResolvedMotion = 'full' | 'reduced';
export type ResolvedTransparency = 'full' | 'reduced';
export type ResolvedLinkUnderline = 'auto' | 'always';

export interface AccessibilityPreferences {
  contrast?: ContrastPreference;
  motion?: MotionPreference;
  transparency?: TransparencyPreference;
  linkUnderline?: LinkUnderlinePreference;
}

export interface ResolvedAccessibilityPreferences {
  contrast: ResolvedContrast;
  motion: ResolvedMotion;
  transparency: ResolvedTransparency;
  linkUnderline: ResolvedLinkUnderline;
}

const DEFAULT_PREFERENCES: Required<AccessibilityPreferences> = {
  contrast: 'system',
  motion: 'system',
  transparency: 'system',
  linkUnderline: 'auto',
};

function resolveContrast(preference: ContrastPreference): ResolvedContrast {
  if (preference === 'high' || preference === 'standard') {
    return preference;
  }

  return matchesMediaQuery('(prefers-contrast: more)') ? 'high' : 'standard';
}

function resolveMotion(preference: MotionPreference): ResolvedMotion {
  if (preference === 'reduced' || preference === 'full') {
    return preference;
  }

  return matchesMediaQuery('(prefers-reduced-motion: reduce)') ? 'reduced' : 'full';
}

function resolveTransparency(preference: TransparencyPreference): ResolvedTransparency {
  if (preference === 'reduced' || preference === 'full') {
    return preference;
  }

  return matchesMediaQuery('(prefers-reduced-transparency: reduce)') ? 'reduced' : 'full';
}

function resolveLinkUnderline(preference: LinkUnderlinePreference): ResolvedLinkUnderline {
  return preference;
}

export function resolveAccessibilityPreferences(
  preferences: AccessibilityPreferences = {},
): ResolvedAccessibilityPreferences {
  const merged = { ...DEFAULT_PREFERENCES, ...preferences };

  return {
    contrast: resolveContrast(merged.contrast),
    motion: resolveMotion(merged.motion),
    transparency: resolveTransparency(merged.transparency),
    linkUnderline: resolveLinkUnderline(merged.linkUnderline),
  };
}

function setRootAttribute(attribute: string, value: string | undefined): void {
  if (typeof document === 'undefined') {
    return;
  }

  if (value === undefined) {
    document.documentElement.removeAttribute(attribute);
    return;
  }

  document.documentElement.setAttribute(attribute, value);
}

export function applyAccessibilityPreferences(
  preferences: AccessibilityPreferences = {},
): ResolvedAccessibilityPreferences {
  const merged = { ...DEFAULT_PREFERENCES, ...preferences };
  const resolved = resolveAccessibilityPreferences(merged);

  setRootAttribute('data-contrast', merged.contrast === 'system' ? undefined : resolved.contrast);
  setRootAttribute('data-motion', merged.motion === 'system' ? undefined : resolved.motion);
  setRootAttribute(
    'data-transparency',
    merged.transparency === 'system' ? undefined : resolved.transparency,
  );
  setRootAttribute(
    'data-link-underline',
    merged.linkUnderline === 'auto' ? undefined : resolved.linkUnderline,
  );

  return resolved;
}
