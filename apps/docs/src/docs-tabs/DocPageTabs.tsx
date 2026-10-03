import { Tabs, TabsContent, TabsList, TabsTrigger } from '@z-ux/ui';
import type { ReactNode } from 'react';
import { DOC_TAB_IDS, DOC_TABS, type DocTabId } from './constants';

export interface DocPageTabPanels {
  design: ReactNode;
  code: ReactNode;
  writing: ReactNode;
  changelog: ReactNode;
}

interface DocPageTabsProps extends DocPageTabPanels {
  activeTab: DocTabId;
  onTabChange: (tab: DocTabId) => void;
  className?: string;
  tabs?: { value: DocTabId; label: string }[];
  playground?: ReactNode;
  /** Compact page chrome shown on the left when the scroll subheader is pinned (component pages). */
  subheaderInfo?: ReactNode;
  subheaderPinned?: boolean;
}

export function DocPageTabs({
  activeTab,
  onTabChange,
  design,
  code,
  writing,
  changelog,
  playground,
  tabs = DOC_TABS,
  subheaderInfo,
  subheaderPinned = false,
  className,
}: DocPageTabsProps) {
  const subheaderClassName = [
    'docs-page__subheader',
    subheaderPinned ? 'docs-page__subheader--pinned' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as DocTabId)}
      className={['docs-page-tabs', className].filter(Boolean).join(' ')}
    >
      <div className={subheaderClassName}>
        {subheaderInfo ? (
          <div className="docs-page__subheader-info" aria-hidden={!subheaderPinned}>
            {subheaderInfo}
          </div>
        ) : null}
        <TabsList className="docs-page__subheader-tabs" aria-label="Documentation sections">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="docs-page-tabs__panels">
        <TabsContent value={DOC_TAB_IDS.design}>{design}</TabsContent>
        {playground !== undefined ? (
          <TabsContent value={DOC_TAB_IDS.playground}>{playground}</TabsContent>
        ) : null}
        <TabsContent value={DOC_TAB_IDS.code}>{code}</TabsContent>
        <TabsContent value={DOC_TAB_IDS.writing}>{writing}</TabsContent>
        <TabsContent value={DOC_TAB_IDS.changelog}>{changelog}</TabsContent>
      </div>
    </Tabs>
  );
}
