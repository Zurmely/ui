# Field

## Overview

Field groups a form control with a label, a description, and an error message.

Field uses context to connect shared ids and accessibility attributes.

## When to use

**Use when:**

- You build a labeled input with optional hint text or a validation error.
- Two or more subcomponents need the same `id`, `disabled`, `invalid`, and `required` state.

**Do not use when:**

- You use a standalone control without a label. Set an explicit `aria-label` on the control instead.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import { Field, FieldDescription, FieldError, FieldLabel } from '@z-ux/ui/field';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `id` | `string` | auto-generated |
| `disabled` | `boolean` | `false` |
| `invalid` | `boolean` | `false` |
| `required` | `boolean` | `false` |

### Subcomponents

| Component | Role |
| --- | --- |
| `FieldLabel` | Visible label with `htmlFor` |
| `FieldDescription` | Hint text |
| `FieldError` | Validation message (`role="alert"`) |

### Data attributes

- `data-disabled`, `data-invalid` on the field wrapper

## Accessibility

Set `FieldLabel` text or an explicit `aria-label` on the associated control.

## Keyboard

The child control handles keyboard interaction. Examples are `TextField` and `Textarea`.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Label | `--z-color-text-primary` |
| Label typography | `--z-text-label-*` |
| Description | `--z-color-text-tertiary` |
| Description typography | `--z-text-caption-*` |
| Error | `--z-color-text-danger` |
| Error typography | `--z-text-caption-*` |
| Stack gap | `--z-spacing-stack-form` |

## Figma

| Figma | React |
| --- | --- |
| Field / Default | `<Field>` |
| Field / Invalid | `<Field invalid>` |
| Field / Disabled | `<Field disabled>` |

## Notes

- **SSR:** Field is safe for SSR. Field uses `useId` when you omit `id`.
- **Portal:** No.
- **Form:** Field passes `disabled`, `invalid`, and `required` to child controls through context.

## Examples

```tsx
<Field id="email" required invalid>
  <FieldLabel>Email</FieldLabel>
  <TextField name="email" />
  <FieldDescription>Work email only.</FieldDescription>
  <FieldError>Email is required.</FieldError>
</Field>
```
