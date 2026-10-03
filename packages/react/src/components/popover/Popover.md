# Popover

## Overview

Popover shows rich content near a trigger.

The rest of the page stays interactive.

## When to use

**Use when:**

- You show filters, pickers, or short forms near a control.
- The user must see the content while they use other parts of the page.

**Do not use when:**

- The user must complete an action before they continue. Use `Dialog`.
- You need only one word of help. Use `Tooltip`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Popover, PopoverContent, PopoverTrigger } from '@z-ux/ui/popover';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `open` | `boolean` | Controlled open state |
| `defaultOpen` | `boolean` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | Open state change handler |

### PopoverContent

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `align` | `start`, `center`, `end` | Alignment along the trigger edge (default `center`) |
| `sideOffset` | `number` | Distance from the trigger (default `4`) |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `PopoverTrigger` | Yes | Opens the popover |
| `PopoverContent` | Yes | Anchored panel |

## Accessibility

Set the trigger visible text or an `aria-label`.
Add a heading inside `PopoverContent` when the panel has a distinct purpose.

## Keyboard

| Key | Action |
| --- | --- |
| `Enter` / `Space` | Toggle popover on trigger |
| `Escape` | Close popover |
| `Tab` | Move focus into and out of popover content |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Panel surface | `--z-color-background-surface` (raised fill; no drop shadow) |
| Label | `--z-color-text-primary` |
| Focus ring | `--z-color-focus-ring` |
| Content enter/exit | `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit` |

## Figma

| Figma | React |
| --- | --- |
| Popover / Trigger | `<PopoverTrigger>` |
| Popover / Panel | `<PopoverContent>` |

## Notes

- **SSR:** Safe. Portal content renders on the client when open.
- **Portal:** Yes. Content renders in a portal.
- **Reduced motion:** Popover turns off content animations when `prefers-reduced-motion: reduce` is active.
- **Form:** Form controls inside `PopoverContent` behave normally.

## Examples

```tsx
<Popover>
  <PopoverTrigger>Open filters</PopoverTrigger>
  <PopoverContent>
    <p>Filter options</p>
  </PopoverContent>
</Popover>
```
