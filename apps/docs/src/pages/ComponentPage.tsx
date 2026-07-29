import {
  Badge,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumbs,
  Card,
  CardContent,
} from '@z-ui/react';
import { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { withBasePath } from '../base-path';
import { componentBySlug, componentRegistry } from '../components/registry';
import { DocsSection } from '../layout/DocsSection';
import { TableOfContents, type TocItem } from '../layout/TableOfContents';
import { MarkdownContent, getComponentMarkdown } from '../markdown/MarkdownContent';
import { parseSections } from '../markdown/sections';
import { CopyButton } from '../playground/CopyButton';
import { ExamplesSection } from '../playground/ExamplesSection';
import { Playground } from '../playground/Playground';

export function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? componentBySlug.get(slug) : undefined;

  const markdown = doc ? getComponentMarkdown(doc.slug) : undefined;
  const sections = useMemo(() => (markdown ? parseSections(markdown) : []), [markdown]);

  const tocItems = useMemo<TocItem[]>(() => {
    const items: TocItem[] = [{ id: 'playground', title: 'Playground' }];
    if (doc?.examples && doc.examples.length > 0) {
      items.push({ id: 'examples', title: 'Examples' });
    }
    for (const section of sections) {
      items.push({ id: section.id, title: section.title });
    }
    return items;
  }, [doc?.examples, sections]);

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

  const installCommand = 'pnpm add @z-ui/react @z-ui/tokens';
  const importLine = `import { ${doc.componentName} } from '${doc.importPath}';`;

  return (
    <div className="docs-page docs-page--with-toc">
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
          <div className="docs-page__install">
            <Card className="docs-page__install-row">
              <CardContent className="docs-page__install-content">
                <code className="docs-page__install-code">{installCommand}</code>
                <CopyButton text={installCommand} />
              </CardContent>
            </Card>
            <Card className="docs-page__install-row">
              <CardContent className="docs-page__install-content">
                <code className="docs-page__install-code">{importLine}</code>
                <CopyButton text={importLine} />
              </CardContent>
            </Card>
          </div>
        </header>

        <DocsSection id="playground" title="Playground">
          <Playground doc={doc} />
        </DocsSection>

        {doc.examples && doc.examples.length > 0 ? (
          <DocsSection id="examples" title="Examples">
            <ExamplesSection examples={doc.examples} />
          </DocsSection>
        ) : null}

        {sections.map((section) => (
          <DocsSection key={section.id} id={section.id} title={section.title}>
            <MarkdownContent content={section.body} sectionTitle={section.title} />
          </DocsSection>
        ))}

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
