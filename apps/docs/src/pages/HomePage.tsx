import { Card, CardDescription, CardHeader, CardTitle } from '@z-ui/react';
import { Link } from 'react-router-dom';
import { componentRegistry } from '../components/registry';
import { elementRegistry, pageExampleRegistry } from '../examples/registry';

const SECTION_HUB = [
  {
    title: 'Foundations',
    description: 'Design tokens for color, size, typography, motion, and elevation.',
    path: '/foundations/colors',
  },
  {
    title: 'Components',
    description: `${componentRegistry.length} interactive components with playgrounds and API docs.`,
    path: '/components',
  },
  {
    title: 'Elements',
    description: 'Composed interface patterns built from library primitives.',
    path: '/elements',
  },
  {
    title: 'Pages',
    description: 'Full page examples such as login and dashboard layouts.',
    path: '/pages',
  },
] as const;

export function HomePage() {
  return (
    <div className="docs-page docs-page--about">
      <header className="docs-page__header">
        <h1 className="docs-page__title">Z-UI</h1>
        <p className="docs-page__summary">
          A semantic design system for building accessible interfaces. This documentation covers
          foundation tokens, component APIs, composed elements, and full page examples — all built
          with the same library.
        </p>
      </header>

      <section className="docs-section">
        <h2 className="docs-section__title">Explore</h2>
        <div className="docs-home-grid">
          {SECTION_HUB.map((section) => (
            <Link key={section.path} to={section.path} className="docs-home-card-link">
              <Card>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section__title">What you will find</h2>
        <ul className="docs-about__list">
          <li>
            <strong>Foundations</strong> — token semantics and visual scales for the system.
          </li>
          <li>
            <strong>Components</strong> — live playgrounds, generated code, and markdown API
            reference.
          </li>
          <li>
            <strong>Elements</strong> — {elementRegistry.length} composed pattern
            {elementRegistry.length === 1 ? '' : 's'} such as pricing comparison.
          </li>
          <li>
            <strong>Pages</strong> — {pageExampleRegistry.length} full-screen example
            {pageExampleRegistry.length === 1 ? '' : 's'} including login and dashboard.
          </li>
        </ul>
      </section>
    </div>
  );
}
