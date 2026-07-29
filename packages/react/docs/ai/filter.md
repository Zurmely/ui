# Filter

## Purpose

Filter shows a chip-style toggle group for list filtering. Filter supports single selection or multiple selection.

## Select when

- You filter table rows, cards, or search results.
- You give a compact set of filters with single selection or multiple selection.

## Prefer instead

| Situation | Use |
| --- | --- |
| You have more than about 8 options. Use  or  instead | `Select` |

## Import

```tsx
import { Filter, FilterItem } from '@z-ui/react/filter';
```

## Compose

Use `Filter` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `type` | for single, multiple; default is single. |
| `value / defaultValue` | for string or string[]. |
| `size` | for sm, md, lg; default is md. |
| `disabled` | when the control should not accept input. |

## Style with tokens

- **Chip gap:** `--z-spacing-gap-inline-tight`
- **Chip padding:** `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x`
- **Size sm / lg:** `--z-spacing-inset-control-compact-*`, `--z-spacing-inset-control-comfortable-*`
- **Chip surface:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-default`
- **Selected chip:** `--z-color-background-selected`, `--z-color-border-strong`
- **Disabled chip:** `--z-color-background-muted`, `--z-color-text-disabled`, `--z-color-border-disabled`
- **Control typography:** `--z-text-control-font-family`, `--z-text-control-size`, `--z-text-control-weight`, `--z-text-control-line-height`
- **Motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You have more than about 8 options. Use `Select` or `Tabs` instead.
- Do not recreate `Filter` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[Filter.md](../../src/components/filter/Filter.md)
