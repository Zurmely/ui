// @ts-nocheck
import { LineChart } from '@z-ux/charts/line-chart';
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

export const lineChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'line-chart',
    name: 'Line chart',
    category: 'Charts',
    summary: 'Shows trends over a continuous or ordered dimension with one or more series.',
    importPath: '@z-ux/charts/line-chart',
    componentName: 'LineChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderLineChart(props),
    whenToUsePreviews: {
      use: () => renderLineChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard line chart with sample data.',
      code: getLineChartCode(),
      render: () => renderLineChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getLineChartCode({ showLegend: false }),
      render: () => renderLineChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getLineChartCode({ showTooltip: false }),
      render: () => renderLineChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderLineChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <LineChart
      data={MONTHLY_DATA}
      series={CHART_SERIES}
      xAccessor={(row) => row.month}
      yAccessor={(row, key) => Number(row[key])}
      showLegend={showLegend}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Monthly revenue and costs"
      height={280}
    />
  );
}

function getLineChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getLineChartSnippet(extra);
}

function getLineChartSnippet(extra: string) {
  return `import { LineChart } from '@z-ux/charts/line-chart';

<LineChart
  data={data}
  series={series}
  xAccessor={(row) => row.month}
  yAccessor={(row, key) => Number(row[key])}
  ariaLabel="Monthly metrics"${extra}
/>`;
}
