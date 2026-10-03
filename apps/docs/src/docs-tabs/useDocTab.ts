import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  COMPONENT_DOC_TABS,
  DOC_TAB_QUERY_KEY,
  DOC_TABS,
  type DocTabId,
  parseDocTabParam,
} from './constants';

type UseDocTabOptions = {
  /** When true, `?tab=playground` is accepted; foundation pages omit this. */
  componentPage?: boolean;
};

export function useDocTab(options: UseDocTabOptions = {}) {
  const validTabValues = useMemo(
    () => (options.componentPage ? COMPONENT_DOC_TABS.map((tab) => tab.value) : DOC_TABS.map((tab) => tab.value)),
    [options.componentPage],
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = useMemo(
    () => parseDocTabParam(searchParams.get(DOC_TAB_QUERY_KEY), validTabValues),
    [searchParams, validTabValues],
  );

  const setActiveTab = useCallback(
    (tab: DocTabId) => {
      const next = new URLSearchParams(searchParams);
      if (tab === 'design') {
        next.delete(DOC_TAB_QUERY_KEY);
      } else {
        next.set(DOC_TAB_QUERY_KEY, tab);
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  return { activeTab, setActiveTab };
}
