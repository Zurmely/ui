// @ts-nocheck
import { BoxPlotChart } from '@z-ux/charts/box-plot-chart';
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

export const boxPlotChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'box-plot-chart',
    name: 'Box plot chart',
    category: 'Charts',
    summary: 'Summarizes distribution with quartiles, median, and outliers per category.',
    importPath: '@z-ux/charts/box-plot-chart',
    componentName: 'BoxPlotChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderBoxPlotChart(props),
    whenToUsePreviews: {
      use: () => renderBoxPlotChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard box plot chart with sample data.',
      code: getBoxPlotChartCode(),
      render: () => renderBoxPlotChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getBoxPlotChartCode({ showLegend: false }),
      render: () => renderBoxPlotChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getBoxPlotChartCode({ showTooltip: false }),
      render: () => renderBoxPlotChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderBoxPlotChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <BoxPlotChart
      data={BOX_PLOT_DATA}
      showGrid={showGrid}
      ariaLabel="Score distributions"
      height={280}
    />
  );
}

function getBoxPlotChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getBoxPlotChartSnippet(extra);
}

function getBoxPlotChartSnippet(extra: string) {
  return `import { BoxPlotChart } from '@z-ux/charts/box-plot-chart';

<BoxPlotChart
  data={data}
  ariaLabel="Score distributions"
  height={280}
/>`;
}
