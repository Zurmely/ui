# Checkbox

## Overview

Checkbox records a boolean choice. Checkbox uses consistent semantic styling and accessible keyboard interaction in the light theme and in the dark theme.

## When to use

**Use when:**

- Users need to opt in or out of a single setting.
- A list lets the user select more than one option.

**Do not use when:**

- Only one option in a mutually exclusive set. Use `RadioGroup`.
- You need a toggle with immediate on or off semantics. Use `Switch`.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import { Checkbox } from '@z-ui/react/checkbox';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `checked` | `boolean` \| `'indeterminate'` | — |
| `defaultChecked` | `boolean` \| `'indeterminate'` | `false` |
| `onCheckedChange` | `(checked: boolean \| 'indeterminate') => void` | — |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `invalid` | `boolean` | `false` |
| `name` | `string` | — |
| `value` | `string` | — |

### Data attributes

- `data-state`: `checked`, `unchecked`, or `indeterminate` (from Radix)
- `data-invalid`: `true` when validation fails

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| — | — | Pair with `Field` + `label` for visible labels |

## Accessibility

Set an accessible name with an associated `<label>`, `aria-label`, or `aria-labelledby`. When you use `Checkbox` inside `Field`, wire the label with `htmlFor` that matches the checkbox `id`.

## Keyboard

| Key | Action |
| --- | --- |
| `Space` | Toggles checked state |
| `Tab` | Moves focus to/from the checkbox |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Unchecked surface | `--z-color-border-subtle`, `--z-color-background-surface` |
| Checked fill | `--z-color-background-primary`, `--z-color-border-primary`, `--z-color-icon-on-solid` |
| Focus | `--z-color-border-focus`, `--z-color-focus-ring` |
| Invalid | `--z-color-border-danger` |
| Disabled | `--z-color-border-disabled`, `--z-color-text-disabled`, `--z-color-background-muted` |
| Checked feedback motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Checkbox / Default | `<Checkbox />` |
| Checkbox / Checked | `<Checkbox defaultChecked />` |
| Checkbox / Invalid | `<Checkbox invalid />` |

## Notes

- **SSR:** SSR is safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Supports `name`, `value`, and `required` for native form submission through Radix.

## Examples

```tsx
<Checkbox id="terms" defaultChecked />
<label htmlFor="terms">Accept terms</label>

<Checkbox checked={agreed} onCheckedChange={setAgreed} required invalid={!agreed} />
```
