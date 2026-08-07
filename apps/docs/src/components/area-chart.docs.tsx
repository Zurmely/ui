// @ts-nocheck
import { AreaChart } from '@z-ux/charts/area-chart';
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

export const areaChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'area-chart',
    name: 'Area chart',
    category: 'Charts',
    summary: 'Shows volume under a line with optional stacked series for part-to-whole trends.',
    importPath: '@z-ux/charts/area-chart',
    componentName: 'AreaChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderAreaChart(props),
    whenToUsePreviews: {
      use: () => renderAreaChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard area chart with sample data.',
      code: getAreaChartCode(),
      render: () => renderAreaChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getAreaChartCode({ showLegend: false }),
      render: () => renderAreaChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getAreaChartCode({ showTooltip: false }),
      render: () => renderAreaChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderAreaChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <AreaChart
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

function getAreaChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getAreaChartSnippet(extra);
}

function getAreaChartSnippet(extra: string) {
  return `import { AreaChart } from '@z-ux/charts/area-chart';

<AreaChart
  data={data}
  series={series}
  xAccessor={(row) => row.month}
  yAccessor={(row, key) => Number(row[key])}
  ariaLabel="Monthly metrics"${extra}
/>`;
}
