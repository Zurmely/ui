# Stack

## Overview

Stack puts child elements in a horizontal or vertical flex layout. Stack uses semantic spacing that stays the same between items.

## When to use

**Use when:**

- You group related controls or content. You need spacing that stays the same between items.
- You build a simple form layout or a toolbar layout.

**Do not use when:**

- You need a complex grid layout.
- Spacing must be different for each child. Use a custom layout instead.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/sizes.css';
import { Stack } from '@z-ui/react/stack';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `direction` | `horizontal`, `vertical` | Flex direction (default `vertical`) |
| `gap` | `sm`, `md`, `lg` | Semantic spacing scale (default `md`) |

A vertical Stack uses `--z-spacing-stack-*` tokens. A horizontal Stack uses `--z-spacing-gap-*` tokens.

## Accessibility

Stack is a layout container. Set accessible names to child interactive elements when you need them.

## Keyboard

Not applicable. Stack is a layout container only.

## Tokens

| Direction | Gap | Token |
| --- | --- | --- |
| vertical | sm | `--z-spacing-stack-form` |
| vertical | md | `--z-spacing-stack-component` |
| vertical | lg | `--z-spacing-stack-section` |
| horizontal | sm | `--z-spacing-gap-inline-tight` |
| horizontal | md | `--z-spacing-gap-component` |
| horizontal | lg | `--z-spacing-gap-section` |

## Figma

| Figma | React |
| --- | --- |
| Stack / Vertical | `<Stack direction="vertical">` |
| Stack / Horizontal | `<Stack direction="horizontal">` |

## Notes

- **SSR:** Safe.
- **Portal:** No.
- **Form:** Use Stack to group form fields. Pair Stack with `Field` for labeled inputs.

## Examples

```tsx
<Stack direction="vertical" gap="md">
  <FieldLabel>Email</FieldLabel>
  <TextField />
</Stack>

<Stack direction="horizontal" gap="sm">
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</Stack>
```
