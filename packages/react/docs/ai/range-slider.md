# RangeSlider

## Purpose

RangeSlider selects a numeric value or a range on a track.

## Select when

- You adjust volume, price filters, or numeric preferences.
- You compose `RangeSlider` inside `Field` for labels and validation.

## Prefer instead

| Situation | Use |
| --- | --- |
| You need precise numeric entry. Pair with | `TextField` |

## Import

```tsx
import { RangeSlider } from '@z-ui/react/range-slider';
```

## Compose

Use `RangeSlider` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `min / max / step` | for number; default is 0 / 100 / 1. |
| `range` | to toggle range behavior. |
| `value / defaultValue` | for number or [number, number]; default is min. |
| `disabled / invalid / required` | to toggle disabled / invalid / required behavior. |

## Style with tokens

- **Track fill:** `--z-color-background-muted`, `--z-color-background-primary`
- **Thumb:** `--z-color-background-surface`, `--z-color-border-strong`
- **Invalid track:** `--z-color-border-danger`
- **Disabled thumb:** `--z-color-border-disabled`
- **Corner radius:** `--z-radius-control-compact`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need precise numeric entry. Pair with `TextField`.
- Do not recreate `RangeSlider` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[RangeSlider.md](../../src/components/range-slider/RangeSlider.md)
