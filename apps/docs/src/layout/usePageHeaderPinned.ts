import { useEffect, useRef, useState } from 'react';

/** Matches `.docs-page__subheader { top: 4.5rem }` when the header cannot be measured. */
const DOCS_HEADER_FALLBACK_OFFSET_PX = 72;

function getDocsHeaderOffsetPx(): number {
  const header = document.querySelector('.docs-header');
  if (header instanceof HTMLElement) {
    return Math.ceil(header.getBoundingClientRect().height);
  }
  return DOCS_HEADER_FALLBACK_OFFSET_PX;
}

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

    const topInsetPx = getDocsHeaderOffsetPx();
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPinned(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${topInsetPx}px 0px 0px 0px`,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return { sentinelRef, pinned };
}
