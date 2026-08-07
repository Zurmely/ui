// @ts-nocheck
import { HeatmapChart } from '@z-ux/charts/heatmap-chart';
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

export const heatmapChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'heatmap-chart',
    name: 'Heatmap chart',
    category: 'Charts',
    summary: 'Shows intensity across a two-dimensional grid with color-encoded values.',
    importPath: '@z-ux/charts/heatmap-chart',
    componentName: 'HeatmapChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderHeatmapChart(props),
    whenToUsePreviews: {
      use: () => renderHeatmapChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard heatmap chart with sample data.',
      code: getHeatmapChartCode(),
      render: () => renderHeatmapChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getHeatmapChartCode({ showLegend: false }),
      render: () => renderHeatmapChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getHeatmapChartCode({ showTooltip: false }),
      render: () => renderHeatmapChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderHeatmapChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <HeatmapChart
      data={HEATMAP_DATA}
      xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
      yLabels={['Morning', 'Afternoon', 'Evening']}
      ariaLabel="Activity heatmap"
      height={280}
    />
  );
}

function getHeatmapChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getHeatmapChartSnippet(extra);
}

function getHeatmapChartSnippet(extra: string) {
  return `import { HeatmapChart } from '@z-ux/charts/heatmap-chart';

<HeatmapChart
  data={data}
  ariaLabel="Activity heatmap"
  height={280}
/>`;
}
