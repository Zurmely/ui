// @ts-nocheck
import { Sparkline } from '@z-ux/charts/sparkline';
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

export const sparklineDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'sparkline',
    name: 'Sparkline',
    category: 'Charts',
    summary: 'Compact inline trend indicator without axes for dense dashboards.',
    importPath: '@z-ux/charts/sparkline',
    componentName: 'Sparkline',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderSparkline(props),
    whenToUsePreviews: {
      use: () => renderSparkline({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard sparkline with sample data.',
      code: getSparklineCode(),
      render: () => renderSparkline({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getSparklineCode({ showLegend: false }),
      render: () => renderSparkline({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getSparklineCode({ showTooltip: false }),
      render: () => renderSparkline({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderSparkline(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <Sparkline
      data={MONTHLY_DATA}
      series={[{ key: 'revenue', label: 'Revenue' }]}
      xAccessor={(row) => row.month}
      yAccessor={(row, key) => Number(row[key])}
      ariaLabel="Revenue trend"
      height={48}
      width={200}
    />
  );
}

function getSparklineCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getSparklineSnippet(extra);
}

function getSparklineSnippet(extra: string) {
  return `import { Sparkline } from '@z-ux/charts/sparkline';

<Sparkline
  data={data}
  series={[{ key: 'revenue', label: 'Revenue' }]}
  xAccessor={(row) => row.month}
  yAccessor={(row, key) => Number(row[key])}
  ariaLabel="Revenue trend"
  height={48}
  width={200}
/>`;
}
