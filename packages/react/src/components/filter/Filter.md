# Filter

## Overview

Filter shows a chip-style toggle group for list filtering. Filter supports single selection or multiple selection.

## When to use

**Use when:**

- You filter table rows, cards, or search results.
- You give a compact set of filters with single selection or multiple selection.

**Do not use when:**

- You have more than about 8 options. Use `Select` or `Tabs` instead.

## Install

```tsx
import { Filter, FilterItem } from '@z-ui/react/filter';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `type` | `single`, `multiple` | `single` |
| `value` / `defaultValue` | `string` or `string[]` | — |
| `size` | `sm`, `md`, `lg` | `md` |
| `disabled` | `boolean` | — |

## Accessibility

Set `aria-label` on `Filter` or connect `Filter` to visible label text.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Moves focus between filter items |
| `Enter` / `Space` | Toggles selection |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Chip gap | `--z-spacing-gap-inline-tight` |
| Chip padding | `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x` |
| Size `sm` / `lg` | `--z-spacing-inset-control-compact-*`, `--z-spacing-inset-control-comfortable-*` |
| Chip surface | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-default` |
| Selected chip | `--z-color-background-selected`, `--z-color-border-strong` |
| Disabled chip | `--z-color-background-muted`, `--z-color-text-disabled`, `--z-color-border-disabled` |
| Control typography | `--z-text-control-font-family`, `--z-text-control-size`, `--z-text-control-weight`, `--z-text-control-line-height` |
| Motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Filter chip group | `Filter` |
| Filter chip | `FilterItem` |
| Selected filter | `FilterItem` with `data-state="on"` |

## Notes

- **SSR:** SSR is safe.
- **Portal:** No.
- **Form:** Filter is not a form control. Use controlled `value` and `onValueChange` for state.

## Examples

```tsx
<Filter type="multiple" value={tags} onValueChange={setTags} aria-label="Tags">
  <FilterItem value="design">Design</FilterItem>
  <FilterItem value="eng">Engineering</FilterItem>
</Filter>
```
