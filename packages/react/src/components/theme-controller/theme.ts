export type ThemePreference = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

/** Default `localStorage` key used by ThemeController. */
export const THEME_STORAGE_KEY = 'z-ui-theme';

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function readStoredTheme(storageKey: string = THEME_STORAGE_KEY): ThemePreference | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    return isThemePreference(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function writeStoredTheme(storageKey: string, preference: ThemePreference): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, preference);
  } catch {
    // Ignore quota errors and private-mode restrictions.
  }
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'system') {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return preference;
}

export function applyTheme(preference: ThemePreference): ResolvedTheme {
  const resolved = resolveTheme(preference);

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', resolved);
  }

  return resolved;
}
