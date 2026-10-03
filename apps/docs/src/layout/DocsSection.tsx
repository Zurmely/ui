import type { ReactNode } from 'react';

interface DocsSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function DocsSection({ id, title, children, className }: DocsSectionProps) {
  return (
    <section id={id} className={`docs-section-block ${className ?? ''}`.trim()}>
      <h2 className="docs-section-block__title">
        <a href={`#${id}`} className="docs-section-block__anchor" aria-label={`Link to ${title}`}>
          #
        </a>
        {title}
      </h2>
      <div className="docs-section-block__content">{children}</div>
    </section>
  );
}
