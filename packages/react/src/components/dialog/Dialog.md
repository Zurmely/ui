# Dialog

## Overview

Dialog shows focused modal content that needs user attention or action.

Dialog blocks interaction with the page behind it.

## When to use

**Use when:**

- You confirm a destructive or irreversible action.
- You collect short, focused input without navigating away.

**Do not use when:**

- You need brief contextual help. Use `Tooltip` or `Popover`.
- You need a full-page workflow. Use a dedicated route or a drawer pattern.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import '@z-ux/tokens/elevation.css';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@z-ux/ui/dialog';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `open` | `boolean` | Controlled open state |
| `defaultOpen` | `boolean` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | Open state change handler |
| `modal` | `boolean` | Trap focus and block outside interaction |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `DialogTrigger` | No | Opens the dialog |
| `DialogContent` | Yes | Modal panel (includes overlay) |
| `DialogTitle` | Yes | Accessible name for the dialog |
| `DialogDescription` | No | Supporting context |
| `DialogHeader` | No | Title and description layout region |
| `DialogFooter` | No | Action button layout region (aligned end) |
| `DialogClose` | No | Dismiss control |

## Accessibility

Set `DialogTitle` for every dialog. Add `DialogDescription` when extra context helps screen-reader users.

## Keyboard

| Key | Action |
| --- | --- |
| `Escape` | Closes the dialog |
| `Tab` | Cycles focus within the dialog |
| `Enter` / `Space` | Activates focused control |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Scrim | `--z-color-overlay-scrim` (opaque when `data-transparency="reduced"`) |
| Panel surface | `--z-color-background-surface`, `--z-color-border-subtle` |
| Title | `--z-color-text-primary` |
| Title typography | `--z-text-title-*` |
| Description | `--z-color-text-secondary` |
| Description typography | `--z-text-body-*` |
| Close control typography | `--z-text-control-*` |
| Close control hover | `--z-color-background-subtle` |
| Focus ring | `--z-color-focus-ring` |
| Panel padding | `--z-spacing-inset-box-comfortable` |
| Content gap | `--z-spacing-gap-component` |
| Close control padding | `--z-spacing-inset-control-compact-y`, `--z-spacing-inset-control-compact-x` |
| Overlay enter/exit | `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit` |

## Figma

| Figma | React |
| --- | --- |
| Dialog / Overlay | Built into `DialogContent` |
| Dialog / Panel | `<DialogContent>` |
| Dialog / Title | `<DialogTitle>` |
| Dialog / Description | `<DialogDescription>` |
| Dialog / Close | `<DialogClose>` |

## Notes

- **SSR:** SSR is safe. Portal content renders on the client when open.
- **Portal:** Yes — overlay and content render in a portal.
- **Reduced motion:** Dialog turns off overlay and content animations when `prefers-reduced-motion: reduce` is active.
- **Form:** Place form controls inside `DialogContent`. Submit handlers work as usual.

## Examples

```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Delete project</DialogTitle>
    <DialogDescription>This action cannot be undone.</DialogDescription>
    <DialogClose>Cancel</DialogClose>
  </DialogContent>
</Dialog>
```
