# OTPInput

## Purpose

OTPInput collects one-time passwords in many single-digit fields.

The component moves focus to the next field after you enter a digit.

## Select when

- You check an SMS code or an email code.
- You collect a short numeric PIN.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { OTPInput } from '@z-ux/ui/otp-input';
```

## Compose

Use `OTPInput` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `length` | for number; default is 6. |
| `value / defaultValue` | for string. |
| `disabled / invalid / required` | to toggle disabled / invalid / required behavior. |

## Style with tokens

- **Digit gap:** `--z-spacing-gap-inline`
- **Digit field:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-default`, `--z-color-border-focus`, `--z-color-border-danger`
- **Disabled digit:** `--z-color-background-muted`, `--z-color-text-disabled`, `--z-color-border-disabled`
- **Control typography:** `--z-text-control-font-family`, `--z-text-control-size`, `--z-text-control-weight`, `--z-text-control-line-height`
- **Corner radius:** `--z-radius-control`
- **Motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need an alphanumeric password.
- Do not recreate `OTPInput` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[OTPInput.md](../../src/components/otp-input/OTPInput.md)
