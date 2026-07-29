# RadioGroup

## Purpose

Radio Group lets the user pick one option from a small set.

## Select when

- Users must choose one option from 2–7 visible choices.
- All options must stay visible. The user does not open a menu.

## Prefer instead

| Situation | Use |
| --- | --- |
| Users can select many options. Use | `Checkbox` |
| There are many options. Use  or a searchable list | `Select` |

## Import

```tsx
import { RadioGroup, RadioGroupItem } from '@z-ui/react/radio-group';
```

## Compose

- **children** (Required): `RadioGroupItem` elements.
- **Label** (Optional): Associate each item with a visible label.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| — | See human doc API table for props. |

## Style with tokens

- **Unchecked surface:** `--z-color-border-subtle`, `--z-color-background-surface`
- **Checked indicator:** `--z-color-background-primary`, `--z-color-border-primary`
- **Focus:** `--z-color-border-focus`, `--z-color-focus-ring`
- **Invalid:** `--z-color-border-danger`
- **Disabled:** `--z-color-border-disabled`, `--z-color-text-disabled`, `--z-color-background-muted`
- **Checked feedback motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Users can select many options. Use `Checkbox`.
- There are many options. Use `Select` or a searchable list.
- Do not recreate `RadioGroup` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[RadioGroup.md](../../src/components/radio-group/RadioGroup.md)
