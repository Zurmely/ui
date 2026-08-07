// @ts-nocheck
import { NetworkChart } from '@z-ux/charts/network-chart';
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

export const networkChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'network-chart',
    name: 'Network chart',
    category: 'Charts',
    summary: 'Visualizes nodes and links for relationship and topology data.',
    importPath: '@z-ux/charts/network-chart',
    componentName: 'NetworkChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderNetworkChart(props),
    whenToUsePreviews: {
      use: () => renderNetworkChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard network chart with sample data.',
      code: getNetworkChartCode(),
      render: () => renderNetworkChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getNetworkChartCode({ showLegend: false }),
      render: () => renderNetworkChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getNetworkChartCode({ showTooltip: false }),
      render: () => renderNetworkChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderNetworkChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <NetworkChart
      nodes={NETWORK_NODES}
      links={NETWORK_LINKS}
      showLegend={showLegend}
      showTooltip={showTooltip}
      ariaLabel="Service network"
      height={280}
    />
  );
}

function getNetworkChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getNetworkChartSnippet(extra);
}

function getNetworkChartSnippet(extra: string) {
  return `import { NetworkChart } from '@z-ux/charts/network-chart';

<NetworkChart
  nodes={nodes}
  links={links}
  ariaLabel="Service network"
  height={280}
/>`;
}
