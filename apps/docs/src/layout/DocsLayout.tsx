import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  type AccessibilityPreferences,
} from '@z-ux/ui';
import { useLocation } from 'react-router-dom';
import { DocsHeader, DOCS_NAV_DRAWER_ID } from './DocsHeader';
import { DocsMobileNav } from './DocsNav';
import { DocsSidebar, useDocsSidebarCollapsed } from './DocsSidebar';
import { getActiveSection, sectionHasSidebar } from './sections';

const DEFAULT_ACCESSIBILITY: AccessibilityPreferences = {
  contrast: 'system',
  motion: 'system',
  transparency: 'system',
  linkUnderline: 'auto',
};

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useDocsSidebarCollapsed();
  const [accessibility, setAccessibility] = useState<AccessibilityPreferences>(DEFAULT_ACCESSIBILITY);
  const location = useLocation();
  const activeSection = getActiveSection(location.pathname);
  const showSidebar = sectionHasSidebar(activeSection);
  const showTocGrid = location.pathname.startsWith('/components/');

  return (
    <div
      className={`docs-shell${showTocGrid ? ' docs-shell--with-toc' : ''}${showSidebar ? '' : ' docs-shell--no-sidebar'}${sidebarCollapsed && showSidebar ? ' docs-shell--sidebar-collapsed' : ''}`}
    >
      {showSidebar ? (
        <DocsSidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
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
