// @ts-nocheck
import { RadialBarChart } from '@z-ux/charts/radial-bar-chart';
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

export const radialBarChartDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'radial-bar-chart',
    name: 'Radial bar chart',
    category: 'Charts',
    summary: 'Shows categorical values on concentric arcs for compact radial layouts.',
    importPath: '@z-ux/charts/radial-bar-chart',
    componentName: 'RadialBarChart',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => renderRadialBarChart(props),
    whenToUsePreviews: {
      use: () => renderRadialBarChart({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard radial bar chart with sample data.',
      code: getRadialBarChartCode(),
      render: () => renderRadialBarChart({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: getRadialBarChartCode({ showLegend: false }),
      render: () => renderRadialBarChart({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: getRadialBarChartCode({ showTooltip: false }),
      render: () => renderRadialBarChart({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function renderRadialBarChart(props: Record<string, unknown>) {
  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;
  return (
    <RadialBarChart
      data={MONTHLY_DATA}
      series={CHART_SERIES}
      labelAccessor={(row) => row.month}
      valueAccessor={(row, key) => Number(row[key])}
      showLegend={showLegend}
      showTooltip={showTooltip}
      ariaLabel="Radial monthly values"
      height={280}
    />
  );
}

function getRadialBarChartCode(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? `\n  ${flags.join('\n  ')}` : '';
  return getRadialBarChartSnippet(extra);
}

function getRadialBarChartSnippet(extra: string) {
  return `import { RadialBarChart } from '@z-ux/charts/radial-bar-chart';

<RadialBarChart
  data={data}
  series={series}
  labelAccessor={(row) => row.month}
  valueAccessor={(row, key) => Number(row[key])}
  ariaLabel="Radial monthly values"
  height={280}
/>`;
}
