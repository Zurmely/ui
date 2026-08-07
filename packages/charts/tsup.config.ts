import { defineConfig } from 'tsup';

const chartEntries = [
  'line-chart',
  'area-chart',
  'bar-chart',
  'pie-chart',
  'scatter-chart',
  'sparkline',
  'heatmap-chart',
  'treemap-chart',
  'box-plot-chart',
  'histogram-chart',
  'radial-bar-chart',
  'bubble-chart',
  'stream-chart',
  'threshold-chart',
  'network-chart',
  'candlestick-chart',
  'funnel-chart',
  'waterfall-chart',
] as const;

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'primitives/index': 'src/primitives/index.ts',
    ...Object.fromEntries(
      chartEntries.map((name) => [`components/${name}/index`, `src/components/${name}/index.ts`]),
    ),
  },
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', '@z-ux/ui', /^@z-ux\/ui\//, /^@visx\//],
  treeshake: true,
});
