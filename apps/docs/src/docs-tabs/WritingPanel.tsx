import type { ReactNode } from 'react';
import { MarkdownContent } from '../markdown/MarkdownContent';
import { DocsSection } from '../layout/DocsSection';
import { getComponentWritingSections, type WritingSection } from './writingContent';

function slugifyWritingTitle(title: string): string {
  return `writing-${title.toLowerCase().replace(/\s+/g, '-')}`;
}

function WritingSections({ sections }: { sections: WritingSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <DocsSection
          key={section.title}
          id={slugifyWritingTitle(section.title)}
          title={section.title}
        >
          {section.body.trim() ? (
            <MarkdownContent content={section.body} sectionTitle={section.title} />
          ) : null}
        </DocsSection>
      ))}
    </>
  );
}

export function ComponentWritingPanel({ slug }: { slug: string }) {
  const sections = getComponentWritingSections(slug);
  return <WritingSections sections={sections} />;
}

export function FoundationWritingPanel({ children }: { children?: ReactNode }) {
  if (!children) {
    return (
      <div className="docs-writing-empty" role="status">
        <p className="docs-writing-empty__text">
          No additional content or writing rules are documented for this foundation.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
