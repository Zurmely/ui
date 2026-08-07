# Separator

## Overview

Separator shows a divider between content regions.

It uses a subtle border color in a horizontal or vertical orientation.

## When to use

**Use when:**

- You divide sections of content or toolbar groups.
- You need a visual divider between related items.

**Do not use when:**

- Spacing alone is enough. Use layout spacing.
- The divider is decorative in one semantic group. Set `aria-hidden` on a decorative element.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Separator } from '@z-ux/ui/separator';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `orientation` | `horizontal`, `vertical` | `horizontal` |

### Data attributes

- `data-orientation`

### Slots

None.

## Accessibility

You do not need an accessible name. The component uses `role="separator"` and `aria-orientation` for assistive technologies.

## Keyboard

Not focusable. No keyboard interactions.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Divider | `--z-color-border-subtle` |

## Figma

| Figma | React |
| --- | --- |
| Separator / Horizontal | `<Separator orientation="horizontal" />` |
| Separator / Vertical | `<Separator orientation="vertical" />` |

## Notes

- **SSR:** Safe. The component does not use browser globals at import.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Separator />
<Separator orientation="vertical" />
```
