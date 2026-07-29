import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@z-ui/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { elementBySlug } from '../examples/registry';

export function ElementPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? elementBySlug.get(slug) : undefined;

  if (!doc) {
    return <Navigate to="/elements" replace />;
  }

  return (
    <div className="docs-page">
      <Breadcrumbs className="docs-page__breadcrumbs">
        <BreadcrumbItem>
          <BreadcrumbLink href="/elements">Elements</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/elements/${doc.slug}`} current>
            {doc.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>

      <header className="docs-page__header">
        <h1 className="docs-page__title">{doc.name}</h1>
        <p className="docs-page__summary">{doc.summary}</p>
      </header>

      <section className="docs-section">
        <h2 className="docs-section__title">Preview</h2>
        <div className="docs-example-frame">{doc.render()}</div>
      </section>

      <p className="docs-page__intro">
        Built with <Link to="/components">Z-UI components</Link> only.
      </p>
    </div>
  );
}
