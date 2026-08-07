import type { ChartMargin } from './types';

export const DEFAULT_MARGIN: ChartMargin = {
  top: 24,
  right: 24,
  bottom: 40,
  left: 48,
};

export const SPARKLINE_MARGIN: ChartMargin = {
  top: 4,
  right: 4,
  bottom: 4,
  left: 4,
};

export const CHART_SERIES_COUNT = 8;

export const CHART_TOKEN_NAMES = {
  grid: '--z-color-chart-grid',
  axis: '--z-color-chart-axis',
  axisLabel: '--z-color-chart-axis-label',
  reference: '--z-color-chart-reference',
  muted: '--z-color-chart-muted',
  positive: '--z-color-chart-positive',
  negative: '--z-color-chart-negative',
} as const;
