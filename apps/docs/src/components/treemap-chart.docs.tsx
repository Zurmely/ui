// @ts-nocheck
import { TreemapChart } from '@z-ux/charts/treemap-chart';
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

export const treemapChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'treemap-chart',
    name: 'Treemap chart',
    category: 'Charts',
    summary: 'Shows hierarchical part-to-whole composition with nested rectangles.',
    importPath: '@z-ux/charts/treemap-chart',
    componentName: 'TreemapChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderTreemapChart(props),
    whenToUsePreviews: {
      use: () => renderTreemapChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard treemap chart with sample data.',
      code: getTreemapChartCode(),
      render: () => renderTreemapChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getTreemapChartCode({ showLegend: false }),
      render: () => renderTreemapChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getTreemapChartCode({ showTooltip: false }),
      render: () => renderTreemapChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderTreemapChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <TreemapChart
      data={TREEMAP_DATA}
      ariaLabel="Category treemap"
      height={280}
    />
  );
}

function getTreemapChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getTreemapChartSnippet(extra);
}

function getTreemapChartSnippet(extra: string) {
  return `import { TreemapChart } from '@z-ux/charts/treemap-chart';

<TreemapChart
  data={data}
  ariaLabel="Category treemap"
  height={280}
/>`;
}
