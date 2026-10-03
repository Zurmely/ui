import { ListItem } from '@z-ux/ui';
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
        rootMargin: '-5.5rem 0px -55% 0px',
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

  const nav = (
    <nav className="docs-toc__nav" aria-label="On this page">
      <ul className="docs-toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <ListItem
              as="a"
              href={`#${item.id}`}
              size="sm"
              label={item.title}
              selected={activeId === item.id}
              className="docs-toc__item"
              onClick={(event) => onTocClick(event, item.id)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );

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
      <div className="docs-toc__mobile">
        {mobilePageHeader}
        <p className="docs-toc__label">On this page</p>
        {nav}
      </div>
      <div className="docs-toc__desktop">
        <p className="docs-toc__label">On this page</p>
        {nav}
      </div>
    </aside>
  );
}
