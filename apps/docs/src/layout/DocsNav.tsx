import { ListItem } from '@z-ui/react';
import type { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ELEMENT_NAV, PAGE_EXAMPLE_NAV } from '../examples/registry';
import { FOUNDATION_NAV, getNavGroups } from '../components/registry';
import { getActiveSection } from './sections';

function DocsNavLink({
  to,
  label,
  selected,
  onNavigate,
}: {
  to: string;
  label: string;
  selected: boolean;
  onNavigate?: () => void;
}) {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
    onNavigate?.();
  };

  return (
    <li>
      <ListItem
        as="a"
        href={to}
        size="sm"
        label={label}
        selected={selected}
        onClick={handleClick}
      />
    </li>
  );
}

export function DocsNavContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const activeSection = getActiveSection(pathname);

  if (activeSection === 'foundations') {
    return (
      <nav className="docs-sidebar__nav" aria-label="Foundations">
        <div className="docs-sidebar__group">
          <h2 className="docs-sidebar__group-title">Foundations</h2>
          <ul className="docs-sidebar__list">
            {FOUNDATION_NAV.map((item) => (
              <DocsNavLink
                key={item.slug}
                to={item.path}
                label={item.name}
                selected={pathname === item.path}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  if (activeSection === 'components') {
    const navGroups = getNavGroups();

    return (
      <nav className="docs-sidebar__nav" aria-label="Components">
        <div className="docs-sidebar__group">
          <h2 className="docs-sidebar__group-title">Components</h2>
          <ul className="docs-sidebar__list">
            <DocsNavLink
              to="/components"
              label="All components"
              selected={pathname === '/components'}
              onNavigate={onNavigate}
            />
          </ul>
        </div>

        {navGroups.map((group) => (
          <div key={group.category} className="docs-sidebar__group">
            <h2 className="docs-sidebar__group-title">{group.category}</h2>
            <ul className="docs-sidebar__list">
              {group.items.map((item) => (
                <DocsNavLink
                  key={item.slug}
                  to={item.path}
                  label={item.name}
                  selected={pathname === item.path}
                  onNavigate={onNavigate}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    );
  }

  if (activeSection === 'elements') {
    return (
      <nav className="docs-sidebar__nav" aria-label="Elements">
        <div className="docs-sidebar__group">
          <h2 className="docs-sidebar__group-title">Elements</h2>
          <ul className="docs-sidebar__list">
            <DocsNavLink
              to="/elements"
              label="All elements"
              selected={pathname === '/elements'}
              onNavigate={onNavigate}
            />
            {ELEMENT_NAV.map((item) => (
              <DocsNavLink
                key={item.slug}
                to={item.path}
                label={item.name}
                selected={pathname === item.path}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  if (activeSection === 'pages') {
    return (
      <nav className="docs-sidebar__nav" aria-label="Page examples">
        <div className="docs-sidebar__group">
          <h2 className="docs-sidebar__group-title">Pages</h2>
          <ul className="docs-sidebar__list">
            <DocsNavLink
              to="/pages"
              label="All pages"
              selected={pathname === '/pages'}
              onNavigate={onNavigate}
            />
            {PAGE_EXAMPLE_NAV.map((item) => (
              <DocsNavLink
                key={item.slug}
                to={item.path}
                label={item.name}
                selected={pathname === item.path}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  return null;
}
