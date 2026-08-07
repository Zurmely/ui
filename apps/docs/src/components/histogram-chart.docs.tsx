// @ts-nocheck
import { HistogramChart } from '@z-ux/charts/histogram-chart';
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

export const histogramChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'histogram-chart',
    name: 'Histogram chart',
    category: 'Charts',
    summary: 'Shows frequency distribution of a numeric variable in bins.',
    importPath: '@z-ux/charts/histogram-chart',
    componentName: 'HistogramChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderHistogramChart(props),
    whenToUsePreviews: {
      use: () => renderHistogramChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard histogram chart with sample data.',
      code: getHistogramChartCode(),
      render: () => renderHistogramChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getHistogramChartCode({ showLegend: false }),
      render: () => renderHistogramChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getHistogramChartCode({ showTooltip: false }),
      render: () => renderHistogramChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderHistogramChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <HistogramChart
      data={HISTOGRAM_VALUES}
      valueAccessor={(row) => row.value}
      showGrid={showGrid}
      ariaLabel="Value distribution"
      height={280}
    />
  );
}

function getHistogramChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getHistogramChartSnippet(extra);
}

function getHistogramChartSnippet(extra: string) {
  return `import { HistogramChart } from '@z-ux/charts/histogram-chart';

<HistogramChart
  data={data}
  valueAccessor={(row) => row.value}
  ariaLabel="Value distribution"
  height={280}
/>`;
}
