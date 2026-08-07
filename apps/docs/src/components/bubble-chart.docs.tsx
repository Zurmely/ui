// @ts-nocheck
import { BubbleChart } from '@z-ux/charts/bubble-chart';
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

export const bubbleChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'bubble-chart',
    name: 'Bubble chart',
    category: 'Charts',
    summary: 'Extends scatter plots with a third dimension encoded as circle size.',
    importPath: '@z-ux/charts/bubble-chart',
    componentName: 'BubbleChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderBubbleChart(props),
    whenToUsePreviews: {
      use: () => renderBubbleChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard bubble chart with sample data.',
      code: getBubbleChartCode(),
      render: () => renderBubbleChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getBubbleChartCode({ showLegend: false }),
      render: () => renderBubbleChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getBubbleChartCode({ showTooltip: false }),
      render: () => renderBubbleChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderBubbleChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <BubbleChart
      data={SCATTER_DATA}
      xAccessor={(row) => row.x}
      yAccessor={(row) => row.y}
      sizeAccessor={(row) => row.size}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Bubble observations"
      height={280}
    />
  );
}

function getBubbleChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getBubbleChartSnippet(extra);
}

function getBubbleChartSnippet(extra: string) {
  return `import { BubbleChart } from '@z-ux/charts/bubble-chart';

<BubbleChart
  data={data}
  xAccessor={(row) => row.x}
  yAccessor={(row) => row.y}
  sizeAccessor={(row) => row.size}
  ariaLabel="Bubble observations"
  height={280}
/>`;
}
