# Textarea

## Overview

Textarea gives a styled native `<textarea>`. Textarea works with `Field` context for ids, validation state, and `aria-describedby` wiring.

## When to use

**Use when:**

- You collect text on more than one line in a form.
- You compose Textarea inside `Field` for label and error association.

**Do not use when:**

- Single-line text is enough. Use `TextField`.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import { Textarea } from '@z-ui/react/textarea';
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
| `Tab` | Moves focus to/from the textarea |
| Text keys | Enters text (including newlines) |

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
| Textarea / Default | `<Textarea>` |
| Textarea / Invalid | `<Textarea invalid>` or `<Field invalid>` |
| Textarea / Disabled | `<Textarea disabled>` or `<Field disabled>` |

## Notes

- **SSR:** Safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Native `<textarea>`. It supports `name`, `value`, `defaultValue`, and `required`.

## Examples

```tsx
<Field id="bio">
  <FieldLabel>Bio</FieldLabel>
  <Textarea name="bio" placeholder="Tell us about yourself" />
</Field>
```
