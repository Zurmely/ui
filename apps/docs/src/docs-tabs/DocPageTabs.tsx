import { Tabs, TabsContent, TabsList, TabsTrigger } from '@z-ux/ui';
import type { ReactNode } from 'react';
import { DOC_TABS, type DocTabId } from './constants';

export interface DocPageTabPanels {
  design: ReactNode;
  code: ReactNode;
  writing: ReactNode;
  changelog: ReactNode;
}

interface DocPageTabsProps extends DocPageTabPanels {
  activeTab: DocTabId;
  onTabChange: (tab: DocTabId) => void;
}

export function DocPageTabs({
  activeTab,
  onTabChange,
  design,
  code,
  writing,
  changelog,
}: DocPageTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as DocTabId)}
      className="docs-page-tabs"
    >
      <TabsList aria-label="Documentation sections">
        {DOC_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="docs-page-tabs__panels">
        <TabsContent value="design">{design}</TabsContent>
        <TabsContent value="code">{code}</TabsContent>
        <TabsContent value="writing">{writing}</TabsContent>
        <TabsContent value="changelog">{changelog}</TabsContent>
      </div>
    </Tabs>
  );
}
