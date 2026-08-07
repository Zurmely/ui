import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@z-ux/ui';
import { Link, Navigate, useParams } from 'react-router-dom';
import { withBasePath } from '../base-path';
import { pageExampleBySlug } from '../examples/registry';

export function PageExamplePage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? pageExampleBySlug.get(slug) : undefined;

  if (!doc) {
    return <Navigate to="/pages" replace />;
  }

  return (
    <div className="docs-page">
      <Breadcrumbs className="docs-page__breadcrumbs">
        <BreadcrumbItem>
          <BreadcrumbLink href={withBasePath('/pages')}>Pages</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={withBasePath(`/pages/${doc.slug}`)} current>
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
        <div className="docs-example-frame docs-example-frame--page">{doc.render()}</div>
      </section>

      <p className="docs-page__intro">
        Built with <Link to="/components">Z-UI components</Link> only.
      </p>
    </div>
  );
}
