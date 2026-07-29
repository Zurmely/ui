# OTP Input

## Overview

OTPInput collects one-time passwords in many single-digit fields.
The component moves focus to the next field after you enter a digit.
You can paste a full code into the fields.
OTPInput works with `Field`.

## When to use

**Use when:**

- You check an SMS code or an email code.
- You collect a short numeric PIN.

**Do not use when:**

- You need an alphanumeric password.

## Install

```tsx
import { OTPInput } from '@z-ui/react/otp-input';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `length` | `number` | `6` |
| `value` / `defaultValue` | `string` | — |
| `disabled` / `invalid` / `required` | `boolean` | from `Field` context |

## Accessibility

Set the group a `FieldLabel` or an `aria-label`.

## Keyboard

| Key | Action |
| --- | --- |
| `ArrowLeft` / `ArrowRight` | Move between digits |
| `Backspace` | Clear the digit and move to the previous field |
| Paste | Fill all digits |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Digit gap | `--z-spacing-gap-inline` |
| Digit field | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-default`, `--z-color-border-focus`, `--z-color-border-danger` |
| Disabled digit | `--z-color-background-muted`, `--z-color-text-disabled`, `--z-color-border-disabled` |
| Control typography | `--z-text-control-font-family`, `--z-text-control-size`, `--z-text-control-weight`, `--z-text-control-line-height` |
| Corner radius | `--z-radius-control` |
| Motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| OTP input group | `OTPInput` |
| OTP digit field | `OTPInput` cell |

## Notes

- **SSR:** SSR is safe. Paste handling requires the client.
- **Portal:** No.
- **Form:** Compose inside `Field` for labels and validation. Controlled `value` and `onChange` are supported.

## Examples

```tsx
<Field id="otp">
  <FieldLabel>Verification code</FieldLabel>
  <OTPInput length={6} value={code} onChange={setCode} />
</Field>
```
