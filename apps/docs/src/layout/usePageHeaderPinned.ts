import { useEffect, useRef, useState } from 'react';

/**
 * True when the page header has scrolled under the sticky docs chrome.
 */
export function usePageHeaderPinned() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPinned(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-4.5rem 0px 0px 0px',
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return { sentinelRef, pinned };
}
