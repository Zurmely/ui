// @ts-nocheck
import { ThresholdChart } from '@z-ux/charts/threshold-chart';
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

export const thresholdChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'threshold-chart',
    name: 'Threshold chart',
    category: 'Charts',
    summary: 'Highlights values above or below a reference threshold over time.',
    importPath: '@z-ux/charts/threshold-chart',
    componentName: 'ThresholdChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderThresholdChart(props),
    whenToUsePreviews: {
      use: () => renderThresholdChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard threshold chart with sample data.',
      code: getThresholdChartCode(),
      render: () => renderThresholdChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getThresholdChartCode({ showLegend: false }),
      render: () => renderThresholdChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getThresholdChartCode({ showTooltip: false }),
      render: () => renderThresholdChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderThresholdChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <ThresholdChart
      data={MONTHLY_DATA}
      xAccessor={(row) => row.month}
      yAccessor={(row) => row.revenue}
      threshold={150}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Revenue threshold"
      height={280}
    />
  );
}

function getThresholdChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getThresholdChartSnippet(extra);
}

function getThresholdChartSnippet(extra: string) {
  return `import { ThresholdChart } from '@z-ux/charts/threshold-chart';

<ThresholdChart
  data={data}
  xAccessor={(row) => row.month}
  yAccessor={(row) => row.revenue}
  threshold={150}
  ariaLabel="Revenue threshold"
  height={280}
/>`;
}
