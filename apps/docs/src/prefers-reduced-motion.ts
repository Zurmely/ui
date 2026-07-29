/**
 * Whether reduced motion is active for docs UI motion.
 * Mirrors @z-ui/react: prefer `data-motion` on the document root, then the OS preference.
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

  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
