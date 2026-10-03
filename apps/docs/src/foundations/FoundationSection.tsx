import type { ReactNode } from 'react';

function slugifySectionTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  const sectionId = id ?? slugifySectionTitle(title);

  return (
    <section id={sectionId} className="docs-section-block">
      <h2 className="docs-section-block__title">
        <a
          href={`#${sectionId}`}
          className="docs-section-block__anchor"
          aria-label={`Link to ${title}`}
        >
          #
        </a>
        {title}
      </h2>
      <div className="docs-section-block__content">{children}</div>
    </section>
  );
}

export function TokenGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="docs-token-group">
      <h3 className="docs-token-group__title">{title}</h3>
      {children}
    </div>
  );
}

export function TokenSubGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="docs-token-subgroup">
      <h4 className="docs-token-subgroup__title">{title}</h4>
      {children}
    </div>
  );
}
