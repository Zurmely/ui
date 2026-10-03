import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@z-ux/ui';
import { Link } from 'react-router-dom';
import { FOUNDATION_NAV, componentRegistry } from '../components/registry';
import { elementRegistry, pageExampleRegistry } from '../examples/registry';
import { CopyButton } from '../playground/CopyButton';

const INSTALL = 'pnpm add @z-ux/ui @z-ux/tokens';
const TOKEN_IMPORTS = `import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import '@z-ux/tokens/elevation.css';`;

const SECTION_HUB = [
  {
    title: 'Foundations',
    description: 'Color, size, typography, motion, and elevation tokens with roles and recipes.',
    path: '/foundations/colors',
  },
  {
    title: 'Components',
    description: `${componentRegistry.length} components with playgrounds, copyable examples, and API reference.`,
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
          Semantic design system for accessible interfaces. These docs describe the published{' '}
          <code>@z-ux/ui</code> components and <code>@z-ux/tokens</code> variables that already
          exist in the repository. Use a documented component or token without guessing props,
          defaults, or roles.
        </p>
      </header>

      <section className="docs-section">
        <h2 className="docs-section__title">Get started</h2>
        <p className="docs-page__intro">
          Install the packages, load token CSS once at the app root, then import a component from
          its subpath or from <code>@z-ux/ui</code>.
        </p>
        <div className="docs-page__install">
          <Card className="docs-page__install-row">
            <CardContent className="docs-page__install-content">
              <code className="docs-page__install-code">{INSTALL}</code>
              <CopyButton text={INSTALL} />
            </CardContent>
          </Card>
          <Card className="docs-page__install-row">
            <CardContent className="docs-page__install-content">
              <code className="docs-page__install-code">{TOKEN_IMPORTS}</code>
              <CopyButton text={TOKEN_IMPORTS} />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section__title">How to read a component page</h2>
        <ul className="docs-about__list">
          <li>
            <strong>Playground</strong> — change props and copy the generated snippet. The snippet
            matches the live render.
          </li>
          <li>
            <strong>Examples</strong> — realistic compositions. Prefer these when the playground
            cannot show compound parts.
          </li>
          <li>
            <strong>When to use</strong> — product scenarios and the sibling component to use
            instead.
          </li>
          <li>
            <strong>API, accessibility, keyboard, tokens</strong> — the contract implemented in
            code. Do not assume a behavior that is not listed.
          </li>
        </ul>
      </section>

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
        <h2 className="docs-section__title">Foundation tokens</h2>
        <p className="docs-page__intro">
          Components consume semantic <code>--z-*</code> variables. Theme authors bind primitives.
          Open a foundation page for the role, the CSS name, and a recipe.
        </p>
        <div className="docs-home-grid">
          {FOUNDATION_NAV.map((item) => (
            <Link key={item.path} to={item.path} className="docs-home-card-link">
              <Card>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>
                    {item.slug === 'colors' && 'Background, text, icon, border, chart, focus, and overlay roles.'}
                    {item.slug === 'sizes' && 'Spacing inset, gap, stack, offset, and radius roles.'}
                    {item.slug === 'typography' && 'Font primitives and text roles. 12px is the minimum size.'}
                    {item.slug === 'motion' && 'Duration and easing for interaction, layout, enter, exit, and loops.'}
                    {item.slug === 'elevation' && 'Raised, overlay, modal shadows, and outline rings.'}
                  </CardDescription>
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
            <strong>Components</strong> — {componentRegistry.length} playgrounds with generated
            code and markdown API reference.
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
