# NetworkChart

## Overview

The Network chart visualizes data with Z-UI chart tokens and visx primitives.

Product teams use it for visualizes nodes and links for relationship and topology data.

## When to use

**Use when:**

- You need visualizes nodes and links for relationship and topology data.
- The chart must match Z-UI light, dark, and high-contrast themes.

**Do not use when:**

- A table or KPI card communicates the data more clearly.
- You need real-time streaming updates beyond standard React rendering.

## Install

```bash
pnpm add @z-ux/charts @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/charts/styles.css';
import { NetworkChart } from '@z-ux/charts/network-chart';
```

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ariaLabel` | `string` | — | Accessible name for the chart (required). |
| `height` | `number` | `320` | Chart height in pixels. |
| `width` | `number` | responsive | Fixed width; omit for responsive layout. |
| `loading` | `boolean` | `false` | Shows loading state. |
| `className` | `string` | — | Additional class name. |

See TypeScript types for chart-specific props such as `data`, accessors, and `series`.

## Accessibility

- Charts render `role="img"` with the required `ariaLabel`.
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
| Series colors | `--z-color-chart-series-1` … `--z-color-chart-series-8` |
| Grid lines | `--z-color-chart-grid` |
| Axis strokes | `--z-color-chart-axis` |
| Axis labels | `--z-color-chart-axis-label` |
| Positive / negative | `--z-color-chart-positive`, `--z-color-chart-negative` |

## Figma

Map Figma chart series to `--z-color-chart-series-N` tokens. Use structure tokens for grid and axis strokes.

## Notes

- Import `@z-ux/charts/styles.css` once per app or page.
- Charts use visx for layout math; styling comes from Z-UI tokens only.
- Server-side rendering is supported; color hooks resolve after mount.

## Examples

See the docs playground and examples section for live previews.
