import { useEffect, useState, type MouseEvent } from 'react';
import { prefersReducedMotion } from '../prefers-reduced-motion';

function isHeadingVisible(element: HTMLElement): boolean {
  if (element.closest('[hidden]')) {
    return false;
  }
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

export interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  pageTitle?: string;
  pageDescription?: string;
}

function scrollToHeading(id: string) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
  target.scrollIntoView({ behavior, block: 'start' });
  history.pushState(null, '', `#${id}`);
}

export function TableOfContents({
  items,
  pageTitle,
  pageDescription,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    setActiveId(items[0]?.id ?? '');
  }, [items]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-96px 0px -55% 0px',
        threshold: [0, 0.1, 1],
      },
    );

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element && isHeadingVisible(element)) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const onTocClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setActiveId(id);
    scrollToHeading(id);
  };

  const mobilePageHeader =
    pageTitle || pageDescription ? (
      <header className="docs-toc__page-header">
        {pageTitle ? <h1 className="docs-toc__page-title">{pageTitle}</h1> : null}
        {pageDescription ? (
          <p className="docs-toc__page-summary">{pageDescription}</p>
        ) : null}
      </header>
    ) : null;

  return (
    <aside className="docs-toc">
      {mobilePageHeader}
      <p className="docs-toc__label">On this page</p>
      <nav className="docs-toc__nav" aria-label="On this page">
        <ul className="docs-toc__list">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`docs-toc__link${isActive ? ' docs-toc__link--active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => onTocClick(event, item.id)}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
