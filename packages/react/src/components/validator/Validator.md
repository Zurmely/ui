# Validator

## Overview

Validator wraps form controls with inline validation logic. Validator passes `invalid` state through `Field` context and shows feedback through `ValidatorMessage`.

## When to use

**Use when:**

- You run synchronous or async validation against a controlled value.
- You show inline errors without manual wiring of `Field invalid` and `FieldError`.

**Do not use when:**

- Server-side-only validation with no client feedback is enough.

## Install

```tsx
import { Validator, ValidatorMessage } from '@z-ui/react/validator';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `value` | `unknown` | required |
| `validate` | `(value) => string \| undefined` | — |
| `validateOn` | `change`, `blur`, `submit` | `change` |

## Accessibility

Compose with `FieldLabel` and controls that inherit `Field` context.

## Keyboard

Inherited from wrapped controls.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Error message | `--z-color-text-danger` |
| Caption typography | `--z-text-caption-font-family`, `--z-text-caption-size`, `--z-text-caption-weight`, `--z-text-caption-line-height` |

## Figma

| Figma | React |
| --- | --- |
| Form validation / inline error | `ValidatorMessage` |
| Field wrapper with validation | `Validator` |

## Notes

- **SSR:** SSR is safe. Validation runs on the client when `validateOn` triggers.
- **Portal:** No.
- **Form:** Passes `invalid` through `Field` context. Compose with `Field`, `FieldLabel`, and form controls.

## Examples

```tsx
<Validator value={email} validate={(v) => (v.includes('@') ? undefined : 'Invalid email')}>
  <FieldLabel>Email</FieldLabel>
  <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
  <ValidatorMessage />
</Validator>
```
