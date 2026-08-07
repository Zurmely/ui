# Checkbox

## Purpose

Checkbox records a boolean choice.

Checkbox uses consistent semantic styling and accessible keyboard interaction in the light theme and in the dark theme.

## Select when

- Users need to opt in or out of a single setting.
- A list lets the user select more than one option.

## Prefer instead

| Situation | Use |
| --- | --- |
| Only one option in a mutually exclusive set. Use | `RadioGroup` |
| You need a toggle with immediate on or off semantics. Use | `Switch` |

## Import

```tsx
import { Checkbox } from '@z-ux/ui/checkbox';
```

## Compose

- **—** (Optional): Pair with `Field` + `label` for visible labels.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `checked` | for boolean \; default is 'indeterminate'. |
| `defaultChecked` | for boolean \; default is 'indeterminate'. |
| `onCheckedChange` | to change behavior. |
| `disabled` | when the control should not accept input. |
| `required` | when the field is required. |
| `invalid` | when validation failed. |
| `name` | for string. |
| `value` | for string. |

## Style with tokens

- **Unchecked surface:** `--z-color-border-subtle`, `--z-color-background-surface`
- **Checked fill:** `--z-color-background-primary`, `--z-color-border-primary`, `--z-color-icon-on-solid`
- **Focus:** `--z-color-border-focus`, `--z-color-focus-ring`
- **Invalid:** `--z-color-border-danger`
- **Disabled:** `--z-color-border-disabled`, `--z-color-text-disabled`, `--z-color-background-muted`
- **Checked feedback motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Only one option in a mutually exclusive set. Use `RadioGroup`.
- You need a toggle with immediate on or off semantics. Use `Switch`.
- Do not recreate `Checkbox` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control
- `Filter` — Toggle group for filtering content

## Human doc

[Checkbox.md](../../src/components/checkbox/Checkbox.md)
