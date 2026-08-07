import { useCallback, useState } from 'react';
import type { TooltipDatum } from './types';

export interface ChartTooltipState {
  open: boolean;
  top: number;
  left: number;
  data: TooltipDatum[];
}

const INITIAL_STATE: ChartTooltipState = {
  open: false,
  top: 0,
  left: 0,
  data: [],
};

export function useChartTooltipState() {
  const [tooltip, setTooltip] = useState<ChartTooltipState>(INITIAL_STATE);

  const showTooltip = useCallback((top: number, left: number, data: TooltipDatum[]) => {
    setTooltip({ open: true, top, left, data });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip((current) => ({ ...current, open: false }));
  }, []);

  return { tooltip, showTooltip, hideTooltip };
}
