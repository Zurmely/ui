import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  type AccessibilityPreferences,
} from '@z-ui/react';
import { useLocation } from 'react-router-dom';
import { DocsHeader, DOCS_NAV_DRAWER_ID } from './DocsHeader';
import { DocsNavContent } from './DocsNav';
import { getActiveSection, sectionHasSidebar } from './sections';

const DEFAULT_ACCESSIBILITY: AccessibilityPreferences = {
  contrast: 'system',
  motion: 'system',
  transparency: 'system',
  linkUnderline: 'auto',
};

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [accessibility, setAccessibility] = useState<AccessibilityPreferences>(DEFAULT_ACCESSIBILITY);
  const location = useLocation();
  const activeSection = getActiveSection(location.pathname);
  const showSidebar = sectionHasSidebar(activeSection);
  const showTocGrid = location.pathname.startsWith('/components/');

  return (
    <div
      className={`docs-shell${showTocGrid ? ' docs-shell--with-toc' : ''}${showSidebar ? '' : ' docs-shell--no-sidebar'}`}
    >
      {showSidebar ? (
        <aside className="docs-sidebar docs-sidebar--desktop">
          <DocsNavContent />
        </aside>
      ) : null}

      <div className="docs-main">
        <DocsHeader
          accessibility={accessibility}
          onAccessibilityChange={setAccessibility}
          showMenuButton={showSidebar}
          menuOpen={navOpen}
          onMenuClick={() => setNavOpen(true)}
        />

        {showSidebar ? (
          <Drawer open={navOpen} onOpenChange={setNavOpen}>
            <DrawerContent side="left" className="docs-drawer" id={DOCS_NAV_DRAWER_ID}>
              <DrawerHeader>
                <DrawerTitle>Navigation</DrawerTitle>
              </DrawerHeader>
              <DocsNavContent onNavigate={() => setNavOpen(false)} />
            </DrawerContent>
          </Drawer>
        ) : null}

        <main className="docs-content">{children}</main>
      </div>
    </div>
  );
}
