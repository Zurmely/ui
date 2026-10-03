import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DOC_TAB_QUERY_KEY, type DocTabId, parseDocTabParam } from './constants';

export function useDocTab() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = useMemo(
    () => parseDocTabParam(searchParams.get(DOC_TAB_QUERY_KEY)),
    [searchParams],
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
