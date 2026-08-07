# Z-UI Chart Color Semantics

**Status:** Draft  
**Audience:** Designers and developers  
**Related:** [COLOR-SEMANTICS.md](./COLOR-SEMANTICS.md), [`colors.css`](./colors.css)

This document defines semantic color tokens for data visualization in Z-UI charts.

---

## 1. Why chart semantics exist

Charts need a categorical palette that is distinct from status meanings (danger, success, warning, info). Chart tokens give series colors, grid lines, axis strokes, and positive/negative semantics that stay stable across light and dark themes.

| Token group | Purpose | Example |
| --- | --- | --- |
| **Series** | Categorical data series (up to 8) | `--z-color-chart-series-1` |
| **Series subtle** | Area fills and band backgrounds | `--z-color-chart-series-1-subtle` |
| **Structure** | Grid, axis, labels, reference lines | `--z-color-chart-grid` |
| **Direction** | Positive/negative change | `--z-color-chart-positive` |

---

## 2. Series palette

Eight series colors alias existing primitives at steps that hold contrast on chart surfaces in both themes:

| Series | Light | Dark | Primitive family |
| --- | --- | --- | --- |
| 1 | `--blue-600` | `--blue-500` | blue |
| 2 | `--green-600` | `--green-500` | green |
| 3 | `--purple-600` | `--purple-500` | purple |
| 4 | `--orange-600` | `--orange-500` | orange |
| 5 | `--pink-600` | `--pink-500` | pink |
| 6 | `--olive-600` | `--olive-500` | olive |
| 7 | `--salmon-600` | `--salmon-500` | salmon |
| 8 | `--rose-600` | `--rose-500` | rose |

Subtle fill tokens use `-200` in light theme and `-900` in dark theme for the same families.

---

## 3. Structure tokens

| Token | Role |
| --- | --- |
| `--z-color-chart-grid` | Grid line stroke |
| `--z-color-chart-axis` | Axis line stroke |
| `--z-color-chart-axis-label` | Tick label color |
| `--z-color-chart-reference` | Reference/threshold line |
| `--z-color-chart-muted` | De-emphasized chart chrome |

---

## 4. Direction tokens

| Token | Role |
| --- | --- |
| `--z-color-chart-positive` | Upward or favorable change (aliases success) |
| `--z-color-chart-negative` | Downward or unfavorable change (aliases danger) |

Use direction tokens only when the chart encodes change direction. Do not use them as generic series colors.

---

## 5. Usage rules

1. Chart components **must** consume `--z-color-chart-*` tokens — never raw primitives in chart CSS.
2. JavaScript color resolution (for visx `fill`/`stroke` props) **must** go through `useChartSeriesColors()` or `useChartTheme()` so theme changes stay in sync.
3. Color **must not** be the only way to distinguish series — pair with labels, patterns, or legend entries.
4. High-contrast mode strengthens grid and axis tokens for readability.

---

## 6. CSS custom properties

All chart tokens use the `--z-color-chart-*` prefix and live in [`colors.css`](./colors.css) under the light, dark, and high-contrast blocks.
