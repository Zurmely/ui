import { Badge, Card, CardDescription, CardHeader, CardTitle } from '@z-ui/react';
import { Link } from 'react-router-dom';
import { pageExampleRegistry } from '../examples/registry';

export function PagesIndexPage() {
  return (
    <div className="docs-page">
      <header className="docs-page__header">
        <h1 className="docs-page__title">Page examples</h1>
        <p className="docs-page__summary">
          Full page layouts composed from the design system. Use these as reference when building
          application screens.
        </p>
      </header>

      <div className="docs-home-grid">
        {pageExampleRegistry.map((doc) => (
          <Link key={doc.slug} to={`/pages/${doc.slug}`} className="docs-home-card-link">
            <Card>
              <CardHeader>
                <CardTitle>{doc.name}</CardTitle>
                <CardDescription>{doc.summary}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <p className="docs-page__intro docs-home-footer">
        <Badge size="sm" tone="neutral">
          {pageExampleRegistry.length} page{pageExampleRegistry.length === 1 ? '' : 's'}
        </Badge>
      </p>
    </div>
  );
}
