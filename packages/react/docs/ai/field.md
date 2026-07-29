# Field

## Purpose

Field groups a form control with a label, a description, and an error message. Field uses context to connect shared ids and accessibility attributes.

## Select when

- You build a labeled input with optional hint text or a validation error.
- Two or more subcomponents need the same `id`, `disabled`, `invalid`, and `required` state.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Field, FieldDescription, FieldError, FieldLabel } from '@z-ui/react/field';
```

## Compose

- **FieldLabel**: Visible label with `htmlFor`.
- **FieldDescription**: Hint text.
- **FieldError**: Validation message (`role="alert"`).

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `id` | for string; default is auto-generated. |
| `disabled` | when the control should not accept input. |
| `invalid` | when validation failed. |
| `required` | when the field is required. |

## Style with tokens

- **Label:** `--z-color-text-primary`
- **Label typography:** `--z-text-label-*`
- **Description:** `--z-color-text-tertiary`
- **Description typography:** `--z-text-caption-*`
- **Error:** `--z-color-text-danger`
- **Error typography:** `--z-text-caption-*`
- **Stack gap:** `--z-spacing-stack-form`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You use a standalone control without a label. Set an explicit `aria-label` on the control instead.
- Do not recreate `Field` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `FileInput` — Styled file upload control
- `Filter` — Toggle group for filtering content

## Human doc

[Field.md](../../src/components/field/Field.md)
