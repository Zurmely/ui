import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets window scroll on docs route changes. Without this, SPA navigations keep
 * the previous page's scroll offset — often landing mid-page. Hash deep links
 * still scroll to the matching heading when present.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // New page content may not be in the DOM until after paint.
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView();
          return;
        }
        window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
