// @ts-nocheck
import { PieChart } from '@z-ux/charts/pie-chart';
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

export const pieChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'pie-chart',
    name: 'Pie chart',
    category: 'Charts',
    summary: 'Shows part-to-whole composition with optional donut styling.',
    importPath: '@z-ux/charts/pie-chart',
    componentName: 'PieChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderPieChart(props),
    whenToUsePreviews: {
      use: () => renderPieChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard pie chart with sample data.',
      code: getPieChartCode(),
      render: () => renderPieChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getPieChartCode({ showLegend: false }),
      render: () => renderPieChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getPieChartCode({ showTooltip: false }),
      render: () => renderPieChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderPieChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <PieChart
      data={PIE_DATA}
      labelAccessor={(row) => row.label}
      valueAccessor={(row) => row.value}
      showLegend={showLegend}
      showTooltip={showTooltip}
      ariaLabel="Traffic sources"
      height={280}
    />
  );
}

function getPieChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getPieChartSnippet(extra);
}

function getPieChartSnippet(extra: string) {
  return `import { PieChart } from '@z-ux/charts/pie-chart';

<PieChart
  data={data}
  labelAccessor={(row) => row.label}
  valueAccessor={(row) => row.value}
  ariaLabel="Traffic sources"${extra}
/>`;
}
