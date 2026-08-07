# TreemapChart

## Purpose

The Treemap chart visualizes data with Z-UI chart tokens and visx primitives.

Product teams use it for shows hierarchical part-to-whole composition with nested rectangles.

## Select when

- You need shows hierarchical part-to-whole composition with nested rectangles.
- The chart must match Z-UI light, dark, and high-contrast themes.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import '@z-ux/charts/styles.css';
import { TreemapChart } from '@z-ux/charts/treemap-chart';
```

## Compose

Use `TreemapChart` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `ariaLabel` | for string. |
| `height` | for number; default is 320. |
| `width` | for number; default is responsive. |
| `loading` | to toggle loading behavior. |
| `className` | for string. |

## Style with tokens

- **Series colors:** `--z-color-chart-series-1` … `--z-color-chart-series-8`
- **Grid lines:** `--z-color-chart-grid`
- **Axis strokes:** `--z-color-chart-axis`
- **Axis labels:** `--z-color-chart-axis-label`
- **Positive / negative:** `--z-color-chart-positive`, `--z-color-chart-negative`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- A table or KPI card communicates the data more clearly.
- You need real-time streaming updates beyond standard React rendering.
- Do not recreate `TreemapChart` with raw HTML and one-off CSS when this component fits the task.

## Related

- `AreaChart` — Shows volume under a line with optional stacked series for part-to-whole trends
- `BarChart` — Compares values across categories with grouped, stacked, or horizontal layouts
- `BoxPlotChart` — Summarizes distribution with quartiles, median, and outliers per category
- `BubbleChart` — Extends scatter plots with a third dimension encoded as circle size

## Human doc

[TreemapChart.md](../../src/components/treemap-chart/TreemapChart.md)
