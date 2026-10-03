import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@z-ux/ui';
import { Link, Navigate, useParams } from 'react-router-dom';
import { withBasePath } from '../base-path';
import { componentBySlug } from '../components/registry';
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

      <section className="docs-section">
        <h2 className="docs-section__title">Components used</h2>
        <p className="docs-page__intro">
          This page example is assembled from published library parts. Open a component page for
          its playground and API.
        </p>
        <ul className="docs-about__list">
          {doc.components.map((componentSlug) => {
            const component = componentBySlug.get(componentSlug);
            return (
              <li key={componentSlug}>
                <Link to={`/components/${componentSlug}`}>{component?.name ?? componentSlug}</Link>
                {component ? ` — ${component.summary}` : null}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
