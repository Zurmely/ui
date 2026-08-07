# FloatingActionButton

## Overview

FloatingActionButton shows one primary action.

The action stays fixed above page content, usually in the bottom-right corner.

## When to use

**Use when:**

- One high-priority action must stay visible while the user scrolls.
- The action is icon-only and has a clear accessible name.

**Do not use when:**

- You need more than one action. Use a toolbar or menu instead.
- The action is not the primary action. Use an inline `Button` or `IconButton` instead.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { FloatingActionButton } from '@z-ux/ui/floating-action-button';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `primary`, `secondary`, `ghost`, `danger` | `primary` |
| `size` | `sm`, `md`, `lg` | `md` |
| `isLoading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `icon` | `ReactNode` | — |
| `asChild` | `boolean` | `false` |
| `aria-label` | `string` | required |

### Data attributes

- `data-variant`, `data-size`, `data-loading`, `data-disabled`

If `disabled` or `isLoading` is true, the `asChild` host is behaviorally disabled. The contract is the same as for `Button` and `Link`.

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `icon` / `children` | Yes | Icon content (icon-only) |

## Accessibility

You need to give `aria-label` because the control is icon-only.

## Keyboard

| Key | Action |
| --- | --- |
| `Enter` / `Space` | Activates the button |
| `Tab` | Moves focus to/from the button |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Fill variants | Same as `Button` / `IconButton` primary, surface, danger roles |
| Corner shape | `--z-radius-circle` |
| Fixed offset | `--z-spacing-gap-page-section` |
| Control typography | `--z-text-control-*` |
| Interaction motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

**Token gap:** No semantic elevation token or shadow token exists for the floating lift effect.

## Figma

| Figma | React |
| --- | --- |
| FAB / Primary | `<FloatingActionButton variant="primary">` |
| FAB / Secondary | `<FloatingActionButton variant="secondary">` |

## Notes

- **SSR:** FloatingActionButton is safe for SSR. It uses `position: fixed` without browser globals at import.
- **Portal:** No.
- **Form:** FloatingActionButton renders a native `<button>`. It respects `type` and `disabled`.

## Examples

```tsx
<FloatingActionButton aria-label="Create" icon={<PlusIcon />} />
<FloatingActionButton aria-label="Delete" variant="danger" size="lg" icon={<TrashIcon />} />
```
