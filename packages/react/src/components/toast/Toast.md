# Toast

## Overview

Toast shows brief, non-blocking feedback.

Toast auto-dismisses without interrupting the current task.

## When to use

**Use when:**

- You confirm a save, a copy, or a background action.
- You show transient status that does not need a response.

**Do not use when:**

- The message is critical or needs a decision. Use `Alert` or `Dialog`.
- Errors block continued work. Use inline validation or a modal.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@z-ux/ui/toast';
```

## API

Built on `@radix-ui/react-toast`.

| Component | Purpose |
| --- | --- |
| `ToastProvider` | Context and timing defaults |
| `ToastViewport` | Fixed region where toasts render |
| `Toast` | Individual notification root |
| `ToastTitle` | Primary message |
| `ToastDescription` | Supporting detail |
| `ToastAction` | Optional action (requires `altText`) |
| `ToastClose` | Dismiss control |

### Data attributes

Radix exposes `data-state` and swipe `data-swipe` on `Toast`.

## Accessibility

- `ToastTitle` gives the accessible name.
- `ToastAction` requires `altText` for screen readers.
- `ToastClose` exposes `aria-label="Dismiss"`.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Moves focus to action/close when present |
| `Escape` | Dismisses focused toast (Radix default) |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Surface | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-radius-surface` |
| Title / body | `--z-text-title-*`, `--z-text-body-*`, `--z-color-text-primary`, `--z-color-text-secondary` |
| Action | `--z-color-background-primary-subtle`, `--z-color-border-primary`, `--z-color-text-primary` |
| Viewport offset | `--z-spacing-gap-page-section` |
| Motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |
| Elevation | `--z-elevation-overlay` |

## Figma

| Figma | React |
| --- | --- |
| Toast | `<Toast>` with title, description, optional action |

## Notes

- **SSR:** Mount `ToastViewport` in the app shell. Control `open` from client state.
- **Portal:** Radix renders toasts in the viewport (fixed positioning).
- **Reduced motion:** Toast turns off enter and exit animations when `prefers-reduced-motion: reduce` is active.

## Examples

```tsx
<ToastProvider>
  <Toast open onOpenChange={setOpen}>
    <ToastTitle>Saved</ToastTitle>
    <ToastDescription>Your profile was updated.</ToastDescription>
    <ToastAction altText="Undo profile save">Undo</ToastAction>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>
```
