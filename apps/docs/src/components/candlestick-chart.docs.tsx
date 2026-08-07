// @ts-nocheck
import { CandlestickChart } from '@z-ux/charts/candlestick-chart';
import type { ComponentDoc } from '../playground/types';
import { booleanControl } from './shared-controls';
import {
  CHART_SERIES,
  MONTHLY_DATA,
  PIE_DATA,
  FUNNEL_DATA,
  HEATMAP_DATA,
  BOX_PLOT_DATA,
  NETWORK_NODES,
  NETWORK_LINKS,
  OHLC_DATA,
  WATERFALL_DATA,
  TREEMAP_DATA,
  SCATTER_DATA,
  HISTOGRAM_VALUES,
} from './chart-sample-data';

export const candlestickChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'candlestick-chart',
    name: 'Candlestick chart',
    category: 'Charts',
    summary: 'Shows open, high, low, and close values for financial time series.',
    importPath: '@z-ux/charts/candlestick-chart',
    componentName: 'CandlestickChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderCandlestickChart(props),
    whenToUsePreviews: {
      use: () => renderCandlestickChart({ showLegend: true, showGrid: true, showTooltip: true }),
      doNotUse: () => (
        <div className="docs-chart-fallback">
          <p>Use a table when exact values matter more than shape.</p>
        </div>
      ),
    },
  };

  doc.examples = [
    {
      label: 'Default',
      description: 'Standard candlestick chart with sample data.',
      code: getCandlestickChartCode(),
      render: () => renderCandlestickChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getCandlestickChartCode({ showLegend: false }),
      render: () => renderCandlestickChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getCandlestickChartCode({ showTooltip: false }),
      render: () => renderCandlestickChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderCandlestickChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <CandlestickChart
      data={OHLC_DATA}
      xAccessor={(row) => row.date}
      openAccessor={(row) => row.open}
      highAccessor={(row) => row.high}
      lowAccessor={(row) => row.low}
      closeAccessor={(row) => row.close}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Price candlesticks"
      height={280}
    />
  );
}

function getCandlestickChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getCandlestickChartSnippet(extra);
}

function getCandlestickChartSnippet(extra: string) {
  return `import { CandlestickChart } from '@z-ux/charts/candlestick-chart';

<CandlestickChart
  data={data}
  xAccessor={(row) => row.date}
  openAccessor={(row) => row.open}
  highAccessor={(row) => row.high}
  lowAccessor={(row) => row.low}
  closeAccessor={(row) => row.close}
  ariaLabel="Price candlesticks"
  height={280}
/>`;
}
