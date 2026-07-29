import type { ReactNode } from 'react';

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="docs-section">
      <h2 className="docs-section__title">{title}</h2>
      {children}
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
