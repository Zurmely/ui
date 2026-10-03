import type { ReactNode } from 'react';
import { FoundationPageHeader } from '../components/FoundationPageHeader';
import { TableOfContents, type TocItem } from '../layout/TableOfContents';
import { ChangelogPanel } from './ChangelogPanel';
import { DocPageTabs } from './DocPageTabs';
import { FoundationWritingPanel } from './WritingPanel';
import { useDocTab } from './useDocTab';
import { DOC_TAB_IDS, type DocTabId } from './constants';

interface FoundationTabbedPageProps {
  title: string;
  path: string;
  summary: ReactNode;
  changelogKey: string;
  designUsage: ReactNode;
  codeReference: ReactNode;
  writing?: ReactNode;
  tocByTab: Record<DocTabId, TocItem[]>;
}

export function FoundationTabbedPage({
  title,
  path,
  summary,
  changelogKey,
  designUsage,
  codeReference,
  writing,
  tocByTab,
}: FoundationTabbedPageProps) {
  const { activeTab, setActiveTab } = useDocTab();
  const tocItems = tocByTab[activeTab] ?? [];

  return (
    <div className="docs-page docs-page--with-toc">
      <div className="docs-page__main">
        <FoundationPageHeader title={title} path={path} summary={summary} />

        <DocPageTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          design={<div className="docs-tab-panel">{designUsage}</div>}
          code={<div className="docs-tab-panel">{codeReference}</div>}
          writing={
            <div className="docs-tab-panel">
              <FoundationWritingPanel>{writing}</FoundationWritingPanel>
            </div>
          }
          changelog={
            <div className="docs-tab-panel">
              <ChangelogPanel pageKey={changelogKey} />
            </div>
          }
        />
      </div>

      <TableOfContents items={tocItems} pageTitle={title} pageDescription={undefined} />
    </div>
  );
}

export function foundationTocItem(id: string, title: string): TocItem {
  return { id, title };
}

export function buildFoundationToc(
  design: TocItem[],
  code: TocItem[],
  writing: TocItem[] = [],
): Record<DocTabId, TocItem[]> {
  return {
    [DOC_TAB_IDS.design]: design,
    [DOC_TAB_IDS.code]: code,
    [DOC_TAB_IDS.writing]: writing,
    [DOC_TAB_IDS.changelog]: [],
  };
}
