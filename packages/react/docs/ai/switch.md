# Switch

## Purpose

Switch turns a setting on or off with immediate effect. Switch uses semantic tokens for track and thumb states in the light theme and in the dark theme.

## Select when

- A change to a setting applies at once, such as notifications or dark mode.
- The choice is a clear on or off binary.

## Prefer instead

| Situation | Use |
| --- | --- |
| Users must confirm before they apply a change. Use  in a form | `Checkbox` |
| Users select one of several options | `RadioGroup` / `Select` |

## Import

```tsx
import { Switch } from '@z-ui/react/switch';
```

## Compose

- **—** (Optional): Pair with `Field` + `label` for visible labels.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `checked` | to toggle checked behavior. |
| `defaultChecked` | to toggle defaultChecked behavior. |
| `onCheckedChange` | to change behavior. |
| `disabled` | when the control should not accept input. |
| `required` | when the field is required. |
| `invalid` | when validation failed. |
| `name` | for string. |
| `value` | for string. |

## Style with tokens

- **Off track:** `--z-color-border-subtle`, `--z-color-background-surface`
- **On track:** `--z-color-background-primary`, `--z-color-border-primary`
- **Thumb (on):** `--z-color-icon-on-solid`
- **Thumb (off):** `--z-color-icon-primary`
- **Focus:** `--z-color-border-focus`, `--z-color-focus-ring`
- **Invalid:** `--z-color-border-danger`
- **Disabled:** `--z-color-border-disabled`, `--z-color-text-disabled`, `--z-color-background-muted`
- **Track/thumb motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Users must confirm before they apply a change. Use `Checkbox` in a form.
- Users select one of several options. Use `RadioGroup` or `Select`.
- If `prefers-reduced-motion: reduce` is active, Switch removes motion on the track and on the thumb.
- Do not recreate `Switch` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[Switch.md](../../src/components/switch/Switch.md)
