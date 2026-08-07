// @ts-nocheck
import { ScatterChart } from '@z-ux/charts/scatter-chart';
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

export const scatterChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'scatter-chart',
    name: 'Scatter chart',
    category: 'Charts',
    summary: 'Plots individual observations to reveal correlation and distribution.',
    importPath: '@z-ux/charts/scatter-chart',
    componentName: 'ScatterChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderScatterChart(props),
    whenToUsePreviews: {
      use: () => renderScatterChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard scatter chart with sample data.',
      code: getScatterChartCode(),
      render: () => renderScatterChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getScatterChartCode({ showLegend: false }),
      render: () => renderScatterChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getScatterChartCode({ showTooltip: false }),
      render: () => renderScatterChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderScatterChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <ScatterChart
      data={SCATTER_DATA}
      xAccessor={(row) => row.x}
      yAccessor={(row) => row.y}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Scatter observations"
      height={280}
    />
  );
}

function getScatterChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getScatterChartSnippet(extra);
}

function getScatterChartSnippet(extra: string) {
  return `import { ScatterChart } from '@z-ux/charts/scatter-chart';

<ScatterChart
  data={data}
  xAccessor={(row) => row.x}
  yAccessor={(row) => row.y}
  ariaLabel="Scatter observations"
  height={280}
/>`;
}
