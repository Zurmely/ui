import type { ReactNode } from 'react';
import { MarkdownContent } from '../markdown/MarkdownContent';
import { DocsSection } from '../layout/DocsSection';
import { getComponentWritingSections, type WritingSection } from './writingContent';

function slugifyWritingTitle(title: string): string {
  return `writing-${title.toLowerCase().replace(/\s+/g, '-')}`;
}

function WritingSections({ sections }: { sections: WritingSection[] }) {
  return (
    <div className="docs-surface-stack">
      {sections.map((section) => (
        <DocsSection
          key={section.title}
          id={slugifyWritingTitle(section.title)}
          title={section.title}
        >
          <MarkdownContent content={section.body} sectionTitle={section.title} />
        </DocsSection>
      ))}
    </div>
  );
}

export function ComponentWritingPanel({ slug }: { slug: string }) {
  const sections = getComponentWritingSections(slug);

  if (sections.length === 0) {
    return (
      <div className="docs-surface docs-writing-empty" role="status">
        <p className="docs-writing-empty__text">
          No additional content or writing rules are documented for this component.
        </p>
      </div>
    );
  }

  return <WritingSections sections={sections} />;
}

export function FoundationWritingPanel({ children }: { children?: ReactNode }) {
  if (!children) {
    return (
      <div className="docs-surface docs-writing-empty" role="status">
        <p className="docs-writing-empty__text">
          No additional content or writing rules are documented for this foundation.
        </p>
      </div>
    );
  }

  return <div className="docs-surface-stack">{children}</div>;
}
