# Range Slider

## Overview

RangeSlider selects a numeric value or a range on a track.

Use one thumb or two thumbs in range mode.

## When to use

**Use when:**

- You adjust volume, price filters, or numeric preferences.
- You compose `RangeSlider` inside `Field` for labels and validation.

**Do not use when:**

- You need precise numeric entry. Pair with `TextField`.

## Install

```tsx
import { RangeSlider } from '@z-ux/ui/range-slider';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `min` / `max` / `step` | `number` | `0` / `100` / `1` |
| `range` | `boolean` | `false` |
| `value` / `defaultValue` | `number` or `[number, number]` | `min` |
| `disabled` / `invalid` / `required` | `boolean` | from `Field` context |

## Accessibility

Set the control a `FieldLabel` or an `aria-label`.

## Keyboard

| Key | Action |
| --- | --- |
| `ArrowLeft` / `ArrowRight` | Adjust the value |
| `Home` / `End` | Jump to the minimum or the maximum in range mode |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Track fill | `--z-color-background-muted`, `--z-color-background-primary` |
| Thumb | `--z-color-background-surface`, `--z-color-border-strong` |
| Invalid track | `--z-color-border-danger` |
| Disabled thumb | `--z-color-border-disabled` |
| Corner radius | `--z-radius-control-compact` |

## Figma

| Figma | React |
| --- | --- |
| Slider / single thumb | `RangeSlider` |
| Slider / range | `RangeSlider range` |

## Notes

- **SSR:** SSR is safe.
- **Portal:** No.
- **Form:** Compose inside `Field` for labels and validation. Native range input semantics apply.

## Examples

```tsx
<Field id="price">
  <FieldLabel>Price range</FieldLabel>
  <RangeSlider range defaultValue={[20, 80]} onValueChange={setPrice} />
</Field>
```
