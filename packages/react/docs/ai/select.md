# Select

## Purpose

Select lets the user choose one value from a list in a compact, field-like control with an accessible dropdown menu.

## Select when

- Users pick one option from more than ~7 choices.
- The layout has little space. Put options in a dropdown.

## Prefer instead

| Situation | Use |
| --- | --- |
| All options should remain visible. Use | `RadioGroup` |

## Import

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@z-ui/react/select';
```

## Compose

Use `Select` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| — | See human doc API table for props. |

## Style with tokens

- **Trigger surface:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-text-primary`
- **Trigger hover:** `--z-color-background-subtle`
- **Focus:** `--z-color-border-focus`, `--z-color-focus-ring`
- **Invalid:** `--z-color-border-danger`
- **Disabled:** `--z-color-border-disabled`, `--z-color-text-disabled`, `--z-color-background-muted`
- **Placeholder:** `--z-color-text-tertiary`
- **Menu surface:** `--z-color-background-surface`, `--z-color-border-subtle`
- **Menu elevation:** `--z-elevation-overlay`
- **Item hover:** `--z-color-background-subtle`
- **Item highlighted/selected:** `--z-color-background-selected`
- **Control typography:** `--z-text-control-*`
- **Trigger padding:** `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x`
- **Menu radius:** `--z-radius-container`
- **Viewport padding:** `--z-spacing-inset-box-tight`
- **Item padding:** `--z-spacing-inset-control-compact-y`, `--z-spacing-inset-control-compact-x`, `--z-spacing-select-item-padding-start`
- **Trigger feedback motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- **Content enter:** `--z-motion-duration-enter`, `--z-motion-easing-enter`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- All options should remain visible. Use `RadioGroup`.
- Users must select many options. Use checkboxes or a multi-select pattern.
- Select turns off content enter animation when `prefers-reduced-motion: reduce` is active.
- Do not recreate `Select` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[Select.md](../../src/components/select/Select.md)
