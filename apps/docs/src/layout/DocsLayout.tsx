import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@z-ux/ui';
import { docsIconProps } from '../icons/docs-icon';
import { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  type AccessibilityPreferences,
} from '@z-ux/ui';
import { useLocation } from 'react-router-dom';
import { DocsHeader, DOCS_NAV_DRAWER_ID } from './DocsHeader';
import { DocsMobileNav, DocsNavContent } from './DocsNav';
import { getActiveSection, sectionHasSidebar } from './sections';

const DEFAULT_ACCESSIBILITY: AccessibilityPreferences = {
  contrast: 'system',
  motion: 'system',
  transparency: 'system',
  linkUnderline: 'auto',
};

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'docs-sidebar-collapsed';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [accessibility, setAccessibility] = useState<AccessibilityPreferences>(DEFAULT_ACCESSIBILITY);
  const location = useLocation();
  const activeSection = getActiveSection(location.pathname);
  const showSidebar = sectionHasSidebar(activeSection);
  const showTocGrid = location.pathname.startsWith('/components/');

  useEffect(() => {
    try {
      setSidebarCollapsed(window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true');
    } catch {
      setSidebarCollapsed(false);
    }
  }, []);

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed((value) => {
      const next = !value;
      try {
        window.localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, next ? 'true' : 'false');
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <div
      className={`docs-shell${showTocGrid ? ' docs-shell--with-toc' : ''}${showSidebar ? '' : ' docs-shell--no-sidebar'}`}
    >
      {showSidebar ? (
        <aside
          className={`docs-sidebar docs-sidebar--desktop${sidebarCollapsed ? ' docs-sidebar--collapsed' : ''}`}
        >
          <div className="docs-sidebar__toolbar">
            <IconButton
              type="button"
              size="sm"
              variant="secondary"
              className="docs-sidebar__collapse"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!sidebarCollapsed}
              onClick={toggleSidebarCollapsed}
            >
              {sidebarCollapsed ? (
                <ChevronRight {...docsIconProps()} />
              ) : (
                <ChevronLeft {...docsIconProps()} />
              )}
            </IconButton>
          </div>
          {!sidebarCollapsed ? <DocsNavContent /> : null}
        </aside>
      ) : null}

      <div className="docs-main">
        <DocsHeader
          accessibility={accessibility}
          onAccessibilityChange={setAccessibility}
          menuOpen={navOpen}
          onMenuClick={() => setNavOpen(true)}
        />

        <Drawer open={navOpen} onOpenChange={setNavOpen}>
          <DrawerContent side="left" className="docs-drawer" id={DOCS_NAV_DRAWER_ID}>
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
            </DrawerHeader>
            <DocsMobileNav onNavigate={() => setNavOpen(false)} />
          </DrawerContent>
        </Drawer>

        <main className="docs-content">{children}</main>
      </div>
    </div>
  );
}
