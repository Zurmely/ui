import {
  AccessibilityController,
  Badge,
  Filter,
  FilterItem,
  IconButton,
  Megamenu,
  MegamenuContent,
  MegamenuTrigger,
  ThemeController,
  type AccessibilityPreferences,
} from '@z-ux/ui';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getActiveSection, SECTIONS } from './sections';

export const DOCS_NAV_DRAWER_ID = 'docs-nav-drawer';

function MenuIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M2 4h12M2 8h12M2 12h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DocsHeader({
  accessibility,
  onAccessibilityChange,
  menuOpen,
  onMenuClick,
}: {
  accessibility: AccessibilityPreferences;
  onAccessibilityChange: (value: AccessibilityPreferences) => void;
  menuOpen: boolean;
  onMenuClick: () => void;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeSection = getActiveSection(pathname);

  return (
    <header className="docs-header">
      <IconButton
        className="docs-header__menu"
        aria-label="Open navigation"
        aria-expanded={menuOpen}
        aria-controls={DOCS_NAV_DRAWER_ID}
        variant="secondary"
        size="sm"
        onClick={onMenuClick}
      >
        <MenuIcon />
      </IconButton>

      <div className="docs-header__brand">
        <NavLink to="/" className="docs-header__brand-link">
          Z-UI
        </NavLink>
        <Badge size="sm" tone="neutral">
          Docs
        </Badge>
      </div>

      <Filter
        className="docs-header__sections"
        type="single"
        value={activeSection}
        onValueChange={(value) => {
          const section = SECTIONS.find((item) => item.id === value);
          if (section) navigate(section.path);
        }}
        size="sm"
        aria-label="Documentation section"
      >
        {SECTIONS.map((section) => (
          <FilterItem key={section.id} value={section.id}>
            {section.label}
          </FilterItem>
        ))}
      </Filter>

      <div className="docs-header__spacer" />

      <Megamenu>
        <MegamenuTrigger>Display</MegamenuTrigger>
        <MegamenuContent align="end" className="docs-display-menu__content">
          <section className="docs-display-menu__section" aria-labelledby="docs-display-theme">
            <h2 id="docs-display-theme" className="docs-display-menu__label">
              Theme
            </h2>
            <ThemeController />
          </section>
          <section
            className="docs-display-menu__section"
            aria-labelledby="docs-display-accessibility"
          >
            <h2 id="docs-display-accessibility" className="docs-display-menu__label">
              Accessibility
            </h2>
            <AccessibilityController value={accessibility} onChange={onAccessibilityChange} />
          </section>
        </MegamenuContent>
      </Megamenu>
    </header>
  );
}
