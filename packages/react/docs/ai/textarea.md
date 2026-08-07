# Textarea

## Purpose

Textarea gives a styled native `<textarea>`.

Textarea works with `Field` context for ids, validation state, and `aria-describedby` wiring.

## Select when

- You collect text on more than one line in a form.
- You compose Textarea inside `Field` for label and error association.

## Prefer instead

| Situation | Use |
| --- | --- |
| Single-line text is enough. Use | `TextField` |

## Import

```tsx
import { Textarea } from '@z-ux/ui/textarea';
```

## Compose

Use `Textarea` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `name` | for string. |
| `value / defaultValue` | for string. |
| `required` | when the field is required. |
| `disabled` | when the control should not accept input. |
| `invalid` | when validation failed. |
| `placeholder` | for string. |

## Style with tokens

- **Background:** `--z-color-background-surface`, `--z-color-background-muted` (disabled)
- **Border:** `--z-color-border-subtle`, `.default`, `.focus`, `.danger`, `.disabled`
- **Value text:** `--z-color-text-primary`, `--z-color-text-disabled`
- **Placeholder:** `--z-color-text-tertiary`, `--z-color-text-disabled`
- **Focus ring:** `--z-color-focus-ring`
- **Control typography:** `--z-text-control-*`
- **Border feedback motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Single-line text is enough. Use `TextField`.
- Do not recreate `Textarea` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[Textarea.md](../../src/components/textarea/Textarea.md)
