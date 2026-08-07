export const MONTHLY_DATA = [
  { month: 'Jan', revenue: 120, costs: 80 },
  { month: 'Feb', revenue: 180, costs: 95 },
  { month: 'Mar', revenue: 150, costs: 110 },
  { month: 'Apr', revenue: 210, costs: 120 },
  { month: 'May', revenue: 190, costs: 130 },
  { month: 'Jun', revenue: 240, costs: 140 },
];

export const CHART_SERIES = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'costs', label: 'Costs' },
];

export const PIE_DATA = [
  { label: 'Organic', value: 42 },
  { label: 'Paid', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Direct', value: 12 },
];

export const FUNNEL_DATA = [
  { stage: 'Visits', value: 1000 },
  { stage: 'Signups', value: 420 },
  { stage: 'Trials', value: 180 },
  { stage: 'Paid', value: 64 },
];

export const HEATMAP_DATA = [
  { bin: 0, bins: [{ bin: 0, count: 2 }, { bin: 1, count: 5 }, { bin: 2, count: 3 }, { bin: 3, count: 8 }, { bin: 4, count: 1 }] },
  { bin: 1, bins: [{ bin: 0, count: 4 }, { bin: 1, count: 7 }, { bin: 2, count: 6 }, { bin: 3, count: 2 }, { bin: 4, count: 5 }] },
  { bin: 2, bins: [{ bin: 0, count: 1 }, { bin: 1, count: 3 }, { bin: 2, count: 9 }, { bin: 3, count: 4 }, { bin: 4, count: 6 }] },
];

export const BOX_PLOT_DATA = [
  { label: 'Team A', min: 12, max: 98, median: 54, firstQuartile: 38, thirdQuartile: 72 },
  { label: 'Team B', min: 20, max: 88, median: 48, firstQuartile: 35, thirdQuartile: 65 },
  { label: 'Team C', min: 8, max: 92, median: 50, firstQuartile: 30, thirdQuartile: 70 },
];

export const NETWORK_NODES = [
  { id: 'api', label: 'API', x: 0.2, y: 0.3 },
  { id: 'db', label: 'Database', x: 0.7, y: 0.25 },
  { id: 'cache', label: 'Cache', x: 0.5, y: 0.7 },
  { id: 'worker', label: 'Worker', x: 0.85, y: 0.65 },
];

export const NETWORK_LINKS = [
  { source: 'api', target: 'db' },
  { source: 'api', target: 'cache' },
  { source: 'worker', target: 'db' },
  { source: 'worker', target: 'cache' },
];

export const OHLC_DATA = [
  { date: 'Mon', open: 100, high: 112, low: 96, close: 108 },
  { date: 'Tue', open: 108, high: 115, low: 102, close: 104 },
  { date: 'Wed', open: 104, high: 110, low: 98, close: 109 },
  { date: 'Thu', open: 109, high: 118, low: 105, close: 116 },
  { date: 'Fri', open: 116, high: 120, low: 110, close: 112 },
];

export const WATERFALL_DATA = [
  { label: 'Start', value: 100 },
  { label: 'Sales', value: 45 },
  { label: 'Costs', value: -28 },
  { label: 'Tax', value: -12 },
  { label: 'Total', value: 105, isTotal: true },
];

export const TREEMAP_DATA = {
  name: 'Categories',
  children: [
    { name: 'Electronics', value: 120 },
    { name: 'Apparel', value: 80 },
    { name: 'Home', value: 60 },
    { name: 'Sports', value: 40 },
  ],
};

export const SCATTER_DATA = [
  { x: 12, y: 24, size: 8 },
  { x: 32, y: 18, size: 14 },
  { x: 45, y: 52, size: 20 },
  { x: 28, y: 36, size: 10 },
  { x: 60, y: 44, size: 16 },
  { x: 72, y: 28, size: 12 },
];

export const HISTOGRAM_VALUES = [
  { value: 12 },
  { value: 18 },
  { value: 22 },
  { value: 24 },
  { value: 28 },
  { value: 31 },
  { value: 35 },
  { value: 38 },
  { value: 42 },
  { value: 45 },
  { value: 48 },
  { value: 52 },
];
