import { Button } from '@z-ui/react';
import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);

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
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const nav = (
    <nav className="docs-toc__nav" aria-label="On this page">
      <p className="docs-toc__label">On this page</p>
      <ul className="docs-toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`docs-toc__link${activeId === item.id ? ' docs-toc__link--active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <aside className="docs-toc">
      <div className="docs-toc__mobile">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="docs-toc__disclosure"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
        >
          On this page
        </Button>
        {mobileOpen ? <div className="docs-toc__mobile-panel">{nav}</div> : null}
      </div>
      <div className="docs-toc__desktop">{nav}</div>
    </aside>
  );
}
