import {
  Badge,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@z-ux/ui';
import { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { withBasePath } from '../base-path';
import { componentBySlug, componentRegistry } from '../components/registry';
import { ChangelogPanel } from '../docs-tabs/ChangelogPanel';
import { DOC_TAB_IDS, type DocTabId } from '../docs-tabs/constants';
import { DocPageTabs } from '../docs-tabs/DocPageTabs';
import { partitionMarkdownSections } from '../docs-tabs/partitionSections';
import { ComponentWritingPanel } from '../docs-tabs/WritingPanel';
import { useDocTab } from '../docs-tabs/useDocTab';
import { DocsSection } from '../layout/DocsSection';
import { TableOfContents, type TocItem } from '../layout/TableOfContents';
import { usePageHeaderPinned } from '../layout/usePageHeaderPinned';
import { MarkdownContent, getComponentMarkdown } from '../markdown/MarkdownContent';
import type { DocSection } from '../markdown/sections';
import { ExamplesSection } from '../playground/ExamplesSection';
import { Playground } from '../playground/Playground';
import { getComponentWritingSections } from '../docs-tabs/writingContent';

function writingTocId(title: string): string {
  return `writing-${title.toLowerCase().replace(/\s+/g, '-')}`;
}

function buildTocForTab(
  tab: DocTabId,
  slug: string,
  designSections: DocSection[],
  codeSections: ReturnType<typeof partitionMarkdownSections>['code'],
): TocItem[] {
  switch (tab) {
    case DOC_TAB_IDS.design: {
      const items = designSections.map((section) => ({ id: section.id, title: section.title }));
      items.push({ id: 'examples', title: 'Examples' });
      return items;
    }
    case DOC_TAB_IDS.code: {
      return codeSections.map((section) => ({ id: section.id, title: section.title }));
    }
    case DOC_TAB_IDS.writing:
      return getComponentWritingSections(slug).map((section) => ({
        id: writingTocId(section.title),
        title: section.title,
      }));
    case DOC_TAB_IDS.changelog:
      return [];
    default:
      return [];
  }
}

export function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? componentBySlug.get(slug) : undefined;
  const { activeTab, setActiveTab } = useDocTab();
  const { sentinelRef, pinned: subheaderPinned } = usePageHeaderPinned();

  const markdown = doc ? getComponentMarkdown(doc.slug) : undefined;
  const { design, code, markdownExamples } = useMemo(
    () =>
      markdown && doc
        ? partitionMarkdownSections(markdown, doc.slug)
        : { design: [], code: [], markdownExamples: null },
    [markdown, doc],
  );

  const hasRegistryExamples = Boolean(doc?.examples && doc.examples.length > 0);

  const tocItems = useMemo(
    () => buildTocForTab(activeTab, doc?.slug ?? '', design, code),
    [activeTab, doc?.slug, design, code],
  );

  const pager = useMemo(() => {
    if (!doc) {
      return { prev: undefined, next: undefined };
    }
    const index = componentRegistry.findIndex((entry) => entry.slug === doc.slug);
    return {
      prev: index > 0 ? componentRegistry[index - 1] : undefined,
      next: index < componentRegistry.length - 1 ? componentRegistry[index + 1] : undefined,
    };
  }, [doc]);

  if (!doc) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className={`docs-page docs-page--with-toc docs-page--component${subheaderPinned ? ' docs-page--subheader-pinned' : ''}`}
    >
      <div className="docs-page__main">
        <Breadcrumbs className="docs-page__breadcrumbs">
          <BreadcrumbItem>
            <BreadcrumbLink href={withBasePath('/')}>Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={withBasePath('/components')}>{doc.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={withBasePath(`/components/${doc.slug}`)} current>
              {doc.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumbs>

        <header className="docs-page__header">
          <Badge size="sm" tone="neutral" className="docs-page__category">
            {doc.category}
          </Badge>
          <h1 className="docs-page__title">{doc.name}</h1>
          <p className="docs-page__summary">{doc.summary}</p>
          <div ref={sentinelRef} className="docs-page__header-sentinel" aria-hidden="true" />
        </header>
      </div>

      <DocPageTabs
        className="docs-page-tabs--component"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        subheaderPinned={subheaderPinned}
        subheaderInfo={
          <>
            <Badge size="sm" tone="neutral" className="docs-page__subheader-category">
              {doc.category}
            </Badge>
            <div className="docs-page__subheader-text">
              <p className="docs-page__subheader-title">{doc.name}</p>
              <p className="docs-page__subheader-summary">{doc.summary}</p>
            </div>
          </>
        }
        design={
          <div className="docs-tab-panel">
            {design.map((section) => (
              <DocsSection key={section.id} id={section.id} title={section.title}>
                <MarkdownContent
                  content={section.body}
                  sectionTitle={section.title}
                  whenToUsePreviews={
                    section.title === 'When to use' ? doc.whenToUsePreviews : undefined
                  }
                />
              </DocsSection>
            ))}

            <DocsSection id="examples" title="Examples">
              <Playground doc={doc} />
              {hasRegistryExamples ? <ExamplesSection examples={doc.examples!} /> : null}
              {markdownExamples ? (
                <MarkdownContent
                  content={markdownExamples.body}
                  sectionTitle={markdownExamples.title}
                />
              ) : null}
            </DocsSection>
          </div>
        }
        code={
          <div className="docs-tab-panel">
            {code.map((section) => (
              <DocsSection key={section.id} id={section.id} title={section.title}>
                <MarkdownContent content={section.body} sectionTitle={section.title} />
              </DocsSection>
            ))}
          </div>
        }
        writing={
          <div className="docs-tab-panel">
            <ComponentWritingPanel slug={doc.slug} />
          </div>
        }
        changelog={
          <div className="docs-tab-panel">
            <ChangelogPanel pageKey={doc.slug} />
          </div>
        }
      />

      <div className="docs-page__main">
        <nav className="docs-pager" aria-label="Component navigation">
          {pager.prev ? (
            <Link to={`/components/${pager.prev.slug}`} className="docs-pager__link docs-pager__link--prev">
              <span className="docs-pager__label">Previous</span>
              <span className="docs-pager__name">{pager.prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {pager.next ? (
            <Link to={`/components/${pager.next.slug}`} className="docs-pager__link docs-pager__link--next">
              <span className="docs-pager__label">Next</span>
              <span className="docs-pager__name">{pager.next.name}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  );
}
