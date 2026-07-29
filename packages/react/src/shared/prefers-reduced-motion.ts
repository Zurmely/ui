import { matchesMediaQuery } from './media-query';

/**
 * Returns whether reduced motion is active.
 * Reads `data-motion` on the document root before falling back to the OS preference.
 * SSR-safe: returns false when `window` is unavailable.
 */
export function prefersReducedMotion(): boolean {
  if (typeof document !== 'undefined') {
    const motion = document.documentElement.getAttribute('data-motion');
    if (motion === 'reduced') {
      return true;
    }
    if (motion === 'full') {
      return false;
    }
  }

  return matchesMediaQuery('(prefers-reduced-motion: reduce)');
}
