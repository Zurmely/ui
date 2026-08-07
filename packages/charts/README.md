# @z-ux/charts

Token-styled chart components for Z-UI, built on [visx](https://airbnb.io/visx/).

## Install

```bash
pnpm add @z-ux/charts @z-ux/ui @z-ux/tokens
```

## Usage

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/charts/styles.css';
import { LineChart } from '@z-ux/charts/line-chart';

<LineChart
  data={data}
  series={[{ key: 'revenue', label: 'Revenue' }]}
  xAccessor={(row) => row.month}
  yAccessor={(row, key) => Number(row[key])}
  ariaLabel="Monthly revenue"
/>
```

See the docs site for every chart type and live examples.
