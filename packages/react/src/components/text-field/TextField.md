# Text Field

## Overview

TextField gives a styled native `<input>`.

TextField works with `Field` context for ids, validation state, and `aria-describedby` wiring.

## When to use

**Use when:**

- You collect text on one line in a form.
- You compose TextField inside `Field` for label and error association.

**Do not use when:**

- You need multi-line text. Use `Textarea`.
- A dedicated component fits the input type better, such as `Select`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { TextField } from '@z-ux/ui/text-field';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `name` | `string` | — |
| `value` / `defaultValue` | `string` | — |
| `required` | `boolean` | from `Field` context |
| `disabled` | `boolean` | from `Field` context |
| `invalid` | `boolean` | from `Field` context |
| `placeholder` | `string` | — |

### Data attributes

- `data-disabled`, `data-invalid`

## Accessibility

Use `FieldLabel` or give `aria-label` or `aria-labelledby`.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Moves focus to/from the input |
| Text keys | Enters text |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Background | `--z-color-background-surface`, `--z-color-background-muted` (disabled) |
| Border | `--z-color-border-subtle`, `.default`, `.focus`, `.danger`, `.disabled` |
| Value text | `--z-color-text-primary`, `--z-color-text-disabled` |
| Placeholder | `--z-color-text-tertiary`, `--z-color-text-disabled` |
| Focus ring | `--z-color-focus-ring` |
| Control typography | `--z-text-control-*` |
| Border feedback motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Text field / Default | `<TextField>` |
| Text field / Invalid | `<TextField invalid>` or `<Field invalid>` |
| Text field / Disabled | `<TextField disabled>` or `<Field disabled>` |

## Notes

- **SSR:** Safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Native `<input>`. It supports `name`, `value`, `defaultValue`, and `required`.

## Examples

```tsx
<Field id="email">
  <FieldLabel>Email</FieldLabel>
  <TextField name="email" placeholder="you@example.com" />
</Field>
```
