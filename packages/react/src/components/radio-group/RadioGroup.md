# Radio Group

## Overview

Radio Group lets the user pick one option from a small set.
The group has consistent styling and full keyboard navigation.

## When to use

**Use when:**

- Users must choose one option from 2–7 visible choices.
- All options must stay visible. The user does not open a menu.

**Do not use when:**

- Users can select many options. Use `Checkbox`.
- There are many options. Use `Select` or a searchable list.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import { RadioGroup, RadioGroupItem } from '@z-ui/react/radio-group';
```

## API

### RadioGroup

| Prop | Values | Default |
| --- | --- | --- |
| `value` | `string` | — |
| `defaultValue` | `string` | — |
| `onValueChange` | `(value: string) => void` | — |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `invalid` | `boolean` | `false` |
| `name` | `string` | — |
| `orientation` | `horizontal` \| `vertical` | `vertical` |

### RadioGroupItem

| Prop | Values | Default |
| --- | --- | --- |
| `value` | `string` | — (required) |
| `disabled` | `boolean` | `false` |

### Data attributes

- `data-state` on items: `checked` or `unchecked` (from Radix)
- `data-invalid` on group: `true` when validation fails

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` | Yes | `RadioGroupItem` elements |
| Label | Recommended | Associate each item with a visible label |

## Accessibility

Set `RadioGroup` an `aria-label` or an `aria-labelledby`.
Set each `RadioGroupItem` an accessible name with an `aria-label` or an associated `<label>`.

## Keyboard

| Key | Action |
| --- | --- |
| `ArrowUp` / `ArrowLeft` | Previous item |
| `ArrowDown` / `ArrowRight` | Next item |
| `Space` | Select the focused item |
| `Tab` | Move focus into and out of the group |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Unchecked surface | `--z-color-border-subtle`, `--z-color-background-surface` |
| Checked indicator | `--z-color-background-primary`, `--z-color-border-primary` |
| Focus | `--z-color-border-focus`, `--z-color-focus-ring` |
| Invalid | `--z-color-border-danger` |
| Disabled | `--z-color-border-disabled`, `--z-color-text-disabled`, `--z-color-background-muted` |
| Checked feedback motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Radio / Group | `<RadioGroup>` |
| Radio / Item | `<RadioGroupItem value="…">` |

## Notes

- **SSR:** Safe. The component does not use browser globals at import.
- **Portal:** No.
- **Form:** Supports `name` and `required` on the group for native form submission.

## Examples

```tsx
<RadioGroup defaultValue="free" aria-label="Plan">
  <RadioGroupItem value="free" aria-label="Free" />
  <RadioGroupItem value="pro" aria-label="Pro" />
</RadioGroup>
```
