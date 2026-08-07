#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../..');

const CHARTS = [
  {
    slug: 'line-chart',
    name: 'Line chart',
    componentName: 'LineChart',
    summary: 'Shows trends over a continuous or ordered dimension with one or more series.',
    displayName: 'Line chart',
  },
  {
    slug: 'area-chart',
    name: 'Area chart',
    componentName: 'AreaChart',
    summary: 'Shows volume under a line with optional stacked series for part-to-whole trends.',
    displayName: 'Area chart',
  },
  {
    slug: 'bar-chart',
    name: 'Bar chart',
    componentName: 'BarChart',
    summary: 'Compares values across categories with grouped, stacked, or horizontal layouts.',
    displayName: 'Bar chart',
  },
  {
    slug: 'pie-chart',
    name: 'Pie chart',
    componentName: 'PieChart',
    summary: 'Shows part-to-whole composition with optional donut styling.',
    displayName: 'Pie chart',
  },
  {
    slug: 'scatter-chart',
    name: 'Scatter chart',
    componentName: 'ScatterChart',
    summary: 'Plots individual observations to reveal correlation and distribution.',
    displayName: 'Scatter chart',
  },
  {
    slug: 'sparkline',
    name: 'Sparkline',
    componentName: 'Sparkline',
    summary: 'Compact inline trend indicator without axes for dense dashboards.',
    displayName: 'Sparkline',
  },
  {
    slug: 'heatmap-chart',
    name: 'Heatmap chart',
    componentName: 'HeatmapChart',
    summary: 'Shows intensity across a two-dimensional grid with color-encoded values.',
    displayName: 'Heatmap chart',
  },
  {
    slug: 'treemap-chart',
    name: 'Treemap chart',
    componentName: 'TreemapChart',
    summary: 'Shows hierarchical part-to-whole composition with nested rectangles.',
    displayName: 'Treemap chart',
  },
  {
    slug: 'box-plot-chart',
    name: 'Box plot chart',
    componentName: 'BoxPlotChart',
    summary: 'Summarizes distribution with quartiles, median, and outliers per category.',
    displayName: 'Box plot chart',
  },
  {
    slug: 'histogram-chart',
    name: 'Histogram chart',
    componentName: 'HistogramChart',
    summary: 'Shows frequency distribution of a numeric variable in bins.',
    displayName: 'Histogram chart',
  },
  {
    slug: 'radial-bar-chart',
    name: 'Radial bar chart',
    componentName: 'RadialBarChart',
    summary: 'Shows categorical values on concentric arcs for compact radial layouts.',
    displayName: 'Radial bar chart',
  },
  {
    slug: 'bubble-chart',
    name: 'Bubble chart',
    componentName: 'BubbleChart',
    summary: 'Extends scatter plots with a third dimension encoded as circle size.',
    displayName: 'Bubble chart',
  },
  {
    slug: 'stream-chart',
    name: 'Stream chart',
    componentName: 'StreamChart',
    summary: 'Shows changing composition over time with stacked flowing areas.',
    displayName: 'Stream chart',
  },
  {
    slug: 'threshold-chart',
    name: 'Threshold chart',
    componentName: 'ThresholdChart',
    summary: 'Highlights values above or below a reference threshold over time.',
    displayName: 'Threshold chart',
  },
  {
    slug: 'network-chart',
    name: 'Network chart',
    componentName: 'NetworkChart',
    summary: 'Visualizes nodes and links for relationship and topology data.',
    displayName: 'Network chart',
  },
  {
    slug: 'candlestick-chart',
    name: 'Candlestick chart',
    componentName: 'CandlestickChart',
    summary: 'Shows open, high, low, and close values for financial time series.',
    displayName: 'Candlestick chart',
  },
  {
    slug: 'funnel-chart',
    name: 'Funnel chart',
    componentName: 'FunnelChart',
    summary: 'Shows progressive reduction across sequential stages in a process.',
    displayName: 'Funnel chart',
  },
  {
    slug: 'waterfall-chart',
    name: 'Waterfall chart',
    componentName: 'WaterfallChart',
    summary: 'Shows how intermediate values build to a final total.',
    displayName: 'Waterfall chart',
  },
];

function humanMarkdown(chart) {
  return `# ${chart.componentName}

## Overview

The ${chart.displayName} visualizes data with Z-UI chart tokens and visx primitives.

Product teams use it for ${chart.summary.toLowerCase().replace(/\.$/, '')}.

## When to use

**Use when:**

- You need ${chart.summary.toLowerCase().replace(/\.$/, '')}.
- The chart must match Z-UI light, dark, and high-contrast themes.

**Do not use when:**

- A table or KPI card communicates the data more clearly.
- You need real-time streaming updates beyond standard React rendering.

## Install

\`\`\`bash
pnpm add @z-ux/charts @z-ux/ui @z-ux/tokens
\`\`\`

\`\`\`tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/charts/styles.css';
import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';
\`\`\`

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`ariaLabel\` | \`string\` | — | Accessible name for the chart (required). |
| \`height\` | \`number\` | \`320\` | Chart height in pixels. |
| \`width\` | \`number\` | responsive | Fixed width; omit for responsive layout. |
| \`loading\` | \`boolean\` | \`false\` | Shows loading state. |
| \`className\` | \`string\` | — | Additional class name. |

See TypeScript types for chart-specific props such as \`data\`, accessors, and \`series\`.

## Accessibility

- Charts render \`role="img"\` with the required \`ariaLabel\`.
- A visually hidden data table provides tabular fallback for screen readers.
- Series colors are paired with legend labels; do not rely on color alone.

## Keyboard

| Key | Action |
| --- | --- |
| Tab | Move focus to interactive legend items when legend toggling is enabled. |
| Enter / Space | Toggle a legend series when interactive. |

## Tokens

| Part | Token |
| --- | --- |
| Series colors | \`--z-color-chart-series-1\` … \`--z-color-chart-series-8\` |
| Grid lines | \`--z-color-chart-grid\` |
| Axis strokes | \`--z-color-chart-axis\` |
| Axis labels | \`--z-color-chart-axis-label\` |
| Positive / negative | \`--z-color-chart-positive\`, \`--z-color-chart-negative\` |

## Figma

Map Figma chart series to \`--z-color-chart-series-N\` tokens. Use structure tokens for grid and axis strokes.

## Notes

- Import \`@z-ux/charts/styles.css\` once per app or page.
- Charts use visx for layout math; styling comes from Z-UI tokens only.
- Server-side rendering is supported; color hooks resolve after mount.

## Examples

See the docs playground and examples section for live previews.
`;
}

function docsTsx(chart) {
  const exportName = `${chart.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/-/g, '')}Doc`;
  const varName = chart.slug.replace(/-/g, '_').toUpperCase();

  return `// @ts-nocheck
import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';
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

export const ${exportName}: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: '${chart.slug}',
    name: '${chart.name}',
    category: 'Charts',
    summary: '${chart.summary}',
    importPath: '@z-ux/charts/${chart.slug}',
    componentName: '${chart.componentName}',
    controls: {
      showLegend: booleanControl('showLegend', true),
      showGrid: booleanControl('showGrid', true),
      showTooltip: booleanControl('showTooltip', true),
    },
    render: (props) => render${chart.componentName}(props),
    whenToUsePreviews: {
      use: () => render${chart.componentName}({ showLegend: true, showGrid: true, showTooltip: true }),
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
      description: 'Standard ${chart.displayName.toLowerCase()} with sample data.',
      code: get${chart.componentName}Code(),
      render: () => render${chart.componentName}({}),
      fullWidth: true,
    },
    {
      label: 'Without legend',
      description: 'Hides the legend for compact layouts.',
      code: get${chart.componentName}Code({ showLegend: false }),
      render: () => render${chart.componentName}({ showLegend: false }),
      fullWidth: true,
    },
    {
      label: 'Without tooltip',
      description: 'Disables hover tooltips for static exports.',
      code: get${chart.componentName}Code({ showTooltip: false }),
      render: () => render${chart.componentName}({ showTooltip: false }),
      fullWidth: true,
    },
  ];

  return doc;
})();

function render${chart.componentName}(props: Record<string, unknown>) {
${renderBody(chart)}
}

function get${chart.componentName}Code(overrides: Record<string, unknown> = {}) {
  const flags = [
    overrides.showLegend === false ? 'showLegend={false}' : null,
    overrides.showGrid === false ? 'showGrid={false}' : null,
    overrides.showTooltip === false ? 'showTooltip={false}' : null,
  ].filter(Boolean);
  const extra = flags.length ? \`\\n  \${flags.join('\\n  ')}\` : '';
  return get${chart.componentName}Snippet(extra);
}

function get${chart.componentName}Snippet(extra: string) {
${snippetBody(chart)}
}
`;
}

function renderBody(chart) {
  const base = `  const showLegend = props.showLegend !== false;
  const showGrid = props.showGrid !== false;
  const showTooltip = props.showTooltip !== false;`;

  const map = {
    'line-chart': `${base}
  return (
    <${chart.componentName}
      data={MONTHLY_DATA}
      series={CHART_SERIES}
      xAccessor={(row) => row.month}
      yAccessor={(row, key) => Number(row[key])}
      showLegend={showLegend}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Monthly revenue and costs"
      height={280}
    />
  );`,
    'area-chart': `${base}
  return (
    <${chart.componentName}
      data={MONTHLY_DATA}
      series={CHART_SERIES}
      xAccessor={(row) => row.month}
      yAccessor={(row, key) => Number(row[key])}
      showLegend={showLegend}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Monthly revenue and costs"
      height={280}
    />
  );`,
    'bar-chart': `${base}
  return (
    <${chart.componentName}
      data={MONTHLY_DATA}
      series={CHART_SERIES}
      xAccessor={(row) => row.month}
      yAccessor={(row, key) => Number(row[key])}
      showLegend={showLegend}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Monthly revenue and costs"
      height={280}
    />
  );`,
    'pie-chart': `${base}
  return (
    <${chart.componentName}
      data={PIE_DATA}
      labelAccessor={(row) => row.label}
      valueAccessor={(row) => row.value}
      showLegend={showLegend}
      showTooltip={showTooltip}
      ariaLabel="Traffic sources"
      height={280}
    />
  );`,
    'scatter-chart': `${base}
  return (
    <${chart.componentName}
      data={SCATTER_DATA}
      xAccessor={(row) => row.x}
      yAccessor={(row) => row.y}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Scatter observations"
      height={280}
    />
  );`,
    'sparkline': `${base}
  return (
    <${chart.componentName}
      data={MONTHLY_DATA}
      series={[{ key: 'revenue', label: 'Revenue' }]}
      xAccessor={(row) => row.month}
      yAccessor={(row, key) => Number(row[key])}
      ariaLabel="Revenue trend"
      height={48}
      width={200}
    />
  );`,
    'heatmap-chart': `${base}
  return (
    <${chart.componentName}
      data={HEATMAP_DATA}
      xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
      yLabels={['Morning', 'Afternoon', 'Evening']}
      ariaLabel="Activity heatmap"
      height={280}
    />
  );`,
    'treemap-chart': `${base}
  return (
    <${chart.componentName}
      data={TREEMAP_DATA}
      ariaLabel="Category treemap"
      height={280}
    />
  );`,
    'box-plot-chart': `${base}
  return (
    <${chart.componentName}
      data={BOX_PLOT_DATA}
      showGrid={showGrid}
      ariaLabel="Score distributions"
      height={280}
    />
  );`,
    'histogram-chart': `${base}
  return (
    <${chart.componentName}
      data={HISTOGRAM_VALUES}
      valueAccessor={(row) => row.value}
      showGrid={showGrid}
      ariaLabel="Value distribution"
      height={280}
    />
  );`,
    'radial-bar-chart': `${base}
  return (
    <${chart.componentName}
      data={MONTHLY_DATA}
      series={CHART_SERIES}
      labelAccessor={(row) => row.month}
      valueAccessor={(row, key) => Number(row[key])}
      showLegend={showLegend}
      showTooltip={showTooltip}
      ariaLabel="Radial monthly values"
      height={280}
    />
  );`,
    'bubble-chart': `${base}
  return (
    <${chart.componentName}
      data={SCATTER_DATA}
      xAccessor={(row) => row.x}
      yAccessor={(row) => row.y}
      sizeAccessor={(row) => row.size}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Bubble observations"
      height={280}
    />
  );`,
    'stream-chart': `${base}
  return (
    <${chart.componentName}
      data={MONTHLY_DATA}
      series={CHART_SERIES}
      xAccessor={(row) => row.month}
      yAccessor={(row, key) => Number(row[key])}
      showLegend={showLegend}
      showTooltip={showTooltip}
      ariaLabel="Revenue stream"
      height={280}
    />
  );`,
    'threshold-chart': `${base}
  return (
    <${chart.componentName}
      data={MONTHLY_DATA}
      xAccessor={(row) => row.month}
      yAccessor={(row) => row.revenue}
      threshold={150}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Revenue threshold"
      height={280}
    />
  );`,
    'network-chart': `${base}
  return (
    <${chart.componentName}
      nodes={NETWORK_NODES}
      links={NETWORK_LINKS}
      showLegend={showLegend}
      showTooltip={showTooltip}
      ariaLabel="Service network"
      height={280}
    />
  );`,
    'candlestick-chart': `${base}
  return (
    <${chart.componentName}
      data={OHLC_DATA}
      xAccessor={(row) => row.date}
      openAccessor={(row) => row.open}
      highAccessor={(row) => row.high}
      lowAccessor={(row) => row.low}
      closeAccessor={(row) => row.close}
      showGrid={showGrid}
      showTooltip={showTooltip}
      ariaLabel="Price candlesticks"
      height={280}
    />
  );`,
    'funnel-chart': `${base}
  return (
    <${chart.componentName}
      data={FUNNEL_DATA}
      labelAccessor={(row) => row.stage}
      valueAccessor={(row) => row.value}
      showLegend={showLegend}
      ariaLabel="Conversion funnel"
      height={280}
    />
  );`,
    'waterfall-chart': `${base}
  return (
    <${chart.componentName}
      data={WATERFALL_DATA}
      labelAccessor={(row) => row.label}
      valueAccessor={(row) => row.value}
      isTotalAccessor={(row) => Boolean(row.isTotal)}
      showGrid={showGrid}
      ariaLabel="Profit waterfall"
      height={280}
    />
  );`,
  };

  return map[chart.slug] ?? map['line-chart'];
}

function snippetBody(chart) {
  const snippets = {
    'pie-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  labelAccessor={(row) => row.label}
  valueAccessor={(row) => row.value}
  ariaLabel="Traffic sources"\${extra}
/>\`;`,
    'sparkline': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  series={[{ key: 'revenue', label: 'Revenue' }]}
  xAccessor={(row) => row.month}
  yAccessor={(row, key) => Number(row[key])}
  ariaLabel="Revenue trend"
  height={48}
  width={200}
/>\`;`,
    'heatmap-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  ariaLabel="Activity heatmap"
  height={280}
/>\`;`,
    'treemap-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  ariaLabel="Category treemap"
  height={280}
/>\`;`,
    'box-plot-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  ariaLabel="Score distributions"
  height={280}
/>\`;`,
    'histogram-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  valueAccessor={(row) => row.value}
  ariaLabel="Value distribution"
  height={280}
/>\`;`,
    'radial-bar-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  series={series}
  labelAccessor={(row) => row.month}
  valueAccessor={(row, key) => Number(row[key])}
  ariaLabel="Radial monthly values"
  height={280}
/>\`;`,
    'scatter-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  xAccessor={(row) => row.x}
  yAccessor={(row) => row.y}
  ariaLabel="Scatter observations"
  height={280}
/>\`;`,
    'bubble-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  xAccessor={(row) => row.x}
  yAccessor={(row) => row.y}
  sizeAccessor={(row) => row.size}
  ariaLabel="Bubble observations"
  height={280}
/>\`;`,
    'threshold-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  xAccessor={(row) => row.month}
  yAccessor={(row) => row.revenue}
  threshold={150}
  ariaLabel="Revenue threshold"
  height={280}
/>\`;`,
    'network-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  nodes={nodes}
  links={links}
  ariaLabel="Service network"
  height={280}
/>\`;`,
    'candlestick-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  xAccessor={(row) => row.date}
  openAccessor={(row) => row.open}
  highAccessor={(row) => row.high}
  lowAccessor={(row) => row.low}
  closeAccessor={(row) => row.close}
  ariaLabel="Price candlesticks"
  height={280}
/>\`;`,
    'funnel-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  labelAccessor={(row) => row.stage}
  valueAccessor={(row) => row.value}
  ariaLabel="Conversion funnel"
  height={280}
/>\`;`,
    'waterfall-chart': `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  labelAccessor={(row) => row.label}
  valueAccessor={(row) => row.value}
  ariaLabel="Profit waterfall"
  height={280}
/>\`;`,
  };

  const defaultSnippet = `  return \`import { ${chart.componentName} } from '@z-ux/charts/${chart.slug}';

<${chart.componentName}
  data={data}
  series={series}
  xAccessor={(row) => row.month}
  yAccessor={(row, key) => Number(row[key])}
  ariaLabel="Monthly metrics"\${extra}
/>\`;`;

  return snippets[chart.slug] ?? defaultSnippet;
}

function main() {
  fs.mkdirSync(path.join(root, 'packages/charts/docs/ai'), { recursive: true });

  for (const chart of CHARTS) {
    const mdDir = path.join(root, 'packages/charts/src/components', chart.slug);
    fs.mkdirSync(mdDir, { recursive: true });
    fs.writeFileSync(path.join(mdDir, `${chart.componentName}.md`), humanMarkdown(chart));

    const docsPath = path.join(root, 'apps/docs/src/components', `${chart.slug}.docs.tsx`);
    fs.writeFileSync(docsPath, docsTsx(chart));
  }

  console.log(`bootstrap-chart-docs: wrote ${CHARTS.length} chart docs`);
}

main();
