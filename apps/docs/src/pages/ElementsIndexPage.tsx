import { Badge, Card, CardDescription, CardHeader, CardTitle } from '@z-ux/ui';
import { Link } from 'react-router-dom';
import { elementRegistry } from '../examples/registry';

export function ElementsIndexPage() {
  return (
    <div className="docs-page">
      <header className="docs-page__header">
        <h1 className="docs-page__title">Elements</h1>
        <p className="docs-page__summary">
          Composed interface patterns built only from published Z-UI components. Each page lists
          the parts it uses so you can open the matching API docs.
        </p>
      </header>

      <div className="docs-home-grid">
        {elementRegistry.map((doc) => (
          <Link key={doc.slug} to={`/elements/${doc.slug}`} className="docs-home-card-link">
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
          {elementRegistry.length} element{elementRegistry.length === 1 ? '' : 's'}
        </Badge>
      </p>
    </div>
  );
}
