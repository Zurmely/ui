import { Badge } from '@z-ux/ui';
import { componentRegistry, getComponentGroups } from '../components/registry';
import { ComponentCard } from './ComponentCard';

export function ComponentsIndexPage() {
  const componentGroups = getComponentGroups();

  return (
    <div className="docs-page">
      <header className="docs-page__header">
        <h1 className="docs-page__title">Components</h1>
        <p className="docs-page__summary">
          Browse all {componentRegistry.length} published Z-UI components. Each card shows a live
          preview. Open a page for the playground, copyable examples, when-to-use guidance, and
          the API, accessibility, keyboard, and token contract.
        </p>
      </header>

      {componentGroups.map((group) => (
        <section key={group.category} className="docs-section docs-home-category">
          <div className="docs-home-category__header">
            <h2 className="docs-section__title">{group.category}</h2>
            <Badge size="sm" tone="neutral">
              {group.docs.length} component{group.docs.length === 1 ? '' : 's'}
            </Badge>
          </div>
          <div className="docs-home-grid">
            {group.docs.map((doc) => (
              <ComponentCard key={doc.slug} doc={doc} />
            ))}
          </div>
        </section>
      ))}

      <p className="docs-page__intro docs-home-footer">
        {componentRegistry.length} components with interactive playgrounds.
      </p>
    </div>
  );
}
