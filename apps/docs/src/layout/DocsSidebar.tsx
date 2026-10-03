import { IconButton } from '@z-ux/ui';
import { useEffect, useState } from 'react';
import { DocsNavContent } from './DocsNav';

const STORAGE_KEY = 'docs-component-sidebar-collapsed';

function SidebarToggleIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      {collapsed ? (
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M10 3L5 8l5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function DocsSidebar({
  collapsed,
  onCollapsedChange,
}: {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}) {
  return (
    <aside
      className={`docs-sidebar docs-sidebar--desktop${collapsed ? ' docs-sidebar--collapsed' : ''}`}
    >
      <div className="docs-sidebar__toolbar">
        <IconButton
          type="button"
          size="sm"
          variant="secondary"
          aria-label={collapsed ? 'Expand component navigation' : 'Collapse component navigation'}
          aria-expanded={!collapsed}
          aria-controls="docs-component-nav"
          onClick={() => onCollapsedChange(!collapsed)}
        >
          <SidebarToggleIcon collapsed={collapsed} />
        </IconButton>
      </div>
      <div id="docs-component-nav" className="docs-sidebar__body" hidden={collapsed}>
        <DocsNavContent />
      </div>
    </aside>
  );
}

export function useDocsSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(STORAGE_KEY) === 'true');
    } catch {
      setCollapsed(false);
    }
  }, []);

  const setCollapsedPersisted = (value: boolean) => {
    setCollapsed(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
    } catch {
      /* ignore */
    }
  };

  return [collapsed, setCollapsedPersisted] as const;
}
