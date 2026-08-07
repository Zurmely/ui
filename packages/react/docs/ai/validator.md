# Validator

## Purpose

Validator wraps form controls with inline validation logic.

Validator passes `invalid` state through `Field` context and shows feedback through `ValidatorMessage`.

## Select when

- You run synchronous or async validation against a controlled value.
- You show inline errors without manual wiring of `Field invalid` and `FieldError`.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Validator, ValidatorMessage } from '@z-ux/ui/validator';
```

## Compose

Use `Validator` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `value` | for unknown; default is required. |
| `validate` | to change behavior. |
| `validateOn` | for change, blur, submit; default is change. |

## Style with tokens

- **Error message:** `--z-color-text-danger`
- **Caption typography:** `--z-text-caption-font-family`, `--z-text-caption-size`, `--z-text-caption-weight`, `--z-text-caption-line-height`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Server-side-only validation with no client feedback is enough.
- Do not recreate `Validator` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[Validator.md](../../src/components/validator/Validator.md)
