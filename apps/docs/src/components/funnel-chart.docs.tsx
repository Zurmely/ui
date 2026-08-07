// @ts-nocheck
import { FunnelChart } from '@z-ux/charts/funnel-chart';
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

export const funnelChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'funnel-chart',
    name: 'Funnel chart',
    category: 'Charts',
    summary: 'Shows progressive reduction across sequential stages in a process.',
    importPath: '@z-ux/charts/funnel-chart',
    componentName: 'FunnelChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderFunnelChart(props),
    whenToUsePreviews: {
      use: () => renderFunnelChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard funnel chart with sample data.',
      code: getFunnelChartCode(),
      render: () => renderFunnelChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getFunnelChartCode({ showLegend: false }),
      render: () => renderFunnelChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getFunnelChartCode({ showTooltip: false }),
      render: () => renderFunnelChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderFunnelChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <FunnelChart
      data={FUNNEL_DATA}
      labelAccessor={(row) => row.stage}
      valueAccessor={(row) => row.value}
      showLegend={showLegend}
      ariaLabel="Conversion funnel"
      height={280}
    />
  );
}

function getFunnelChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getFunnelChartSnippet(extra);
}

function getFunnelChartSnippet(extra: string) {
  return `import { FunnelChart } from '@z-ux/charts/funnel-chart';

<FunnelChart
  data={data}
  labelAccessor={(row) => row.stage}
  valueAccessor={(row) => row.value}
  ariaLabel="Conversion funnel"
  height={280}
/>`;
}
