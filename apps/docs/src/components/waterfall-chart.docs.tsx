// @ts-nocheck
import { WaterfallChart } from '@z-ux/charts/waterfall-chart';
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

export const waterfallChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'waterfall-chart',
    name: 'Waterfall chart',
    category: 'Charts',
    summary: 'Shows how intermediate values build to a final total.',
    importPath: '@z-ux/charts/waterfall-chart',
    componentName: 'WaterfallChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderWaterfallChart(props),
    whenToUsePreviews: {
      use: () => renderWaterfallChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard waterfall chart with sample data.',
      code: getWaterfallChartCode(),
      render: () => renderWaterfallChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getWaterfallChartCode({ showLegend: false }),
      render: () => renderWaterfallChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getWaterfallChartCode({ showTooltip: false }),
      render: () => renderWaterfallChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderWaterfallChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <WaterfallChart
      data={WATERFALL_DATA}
      labelAccessor={(row) => row.label}
      valueAccessor={(row) => row.value}
      isTotalAccessor={(row) => Boolean(row.isTotal)}
      showGrid={showGrid}
      ariaLabel="Profit waterfall"
      height={280}
    />
  );
}

function getWaterfallChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getWaterfallChartSnippet(extra);
}

function getWaterfallChartSnippet(extra: string) {
  return `import { WaterfallChart } from '@z-ux/charts/waterfall-chart';

<WaterfallChart
  data={data}
  labelAccessor={(row) => row.label}
  valueAccessor={(row) => row.value}
  ariaLabel="Profit waterfall"
  height={280}
/>`;
}
