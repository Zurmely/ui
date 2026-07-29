import { useSyncExternalStore } from 'react';

/**
 * SSR-safe media query match. Returns false when `window` is unavailable.
 */
export function matchesMediaQuery(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(query).matches;
}

/**
 * Subscribe to a media query. No-op on the server.
 */
export function subscribeMediaQuery(query: string, callback: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => undefined;
  }

  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

/**
 * React hook for media query state. SSR-safe via useSyncExternalStore.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribeMediaQuery(query, callback),
    () => matchesMediaQuery(query),
    () => false,
  );
}
