# Tooltip

## Overview

Tooltip shows brief, supplementary information on hover or focus.

Tooltip does not clutter the interface.

## When to use

**Use when:**

- You label icon-only controls with short hints.
- You explain terms that are not familiar next to other content.

**Do not use when:**

- Content is essential to complete a task. Show it in the UI.
- Content is longer than a sentence. Use `Popover` instead.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@z-ux/ui/tooltip';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `open` | `boolean` | Controlled visibility |
| `defaultOpen` | `boolean` | Uncontrolled initial visibility |
| `delayDuration` | `number` | Provider delay in ms |
| `side` | `top`, `right`, `bottom`, `left` | Placement |
| `sideOffset` | `number` | Distance from trigger (default `4`) |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `TooltipProvider` | Yes | Wraps tooltip instances |
| `TooltipTrigger` | Yes | Element that shows the tooltip |
| `TooltipContent` | Yes | Tooltip label |

## Accessibility

The trigger must have an accessible name (visible text or `aria-label`). Tooltip content supplements the trigger. Tooltip content must not be the only label for interactive controls.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Focus trigger to show tooltip |
| `Escape` | Dismiss tooltip |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Fill | `--z-color-overlay-tooltip` |
| Label | `--z-color-text-inverse` |
| Label typography | `--z-text-caption-*` |
| Focus ring | `--z-color-focus-ring` |
| Content enter/exit | `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit` |

## Figma

| Figma | React |
| --- | --- |
| Tooltip / Provider | `<TooltipProvider>` |
| Tooltip / Trigger | `<TooltipTrigger>` |
| Tooltip / Content | `<TooltipContent>` |

## Notes

- **SSR:** Safe. The tooltip renders when triggered.
- **Portal:** Yes. Content renders in a portal.
- **Reduced motion:** Tooltip turns off content animations when `prefers-reduced-motion: reduce` is active.
- **Form:** Tooltips are not form controls.

## Examples

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger aria-label="More info">?</TooltipTrigger>
    <TooltipContent>Additional context</TooltipContent>
  </Tooltip>
</TooltipProvider>
```
