# Drawer

## Overview

Drawer shows slide-in panel content from an edge of the viewport.

Drawer blocks interaction with the page behind it.

## When to use

**Use when:**

- You show navigation or settings in a side panel.
- You show filters or detail views without leaving the current page.

**Do not use when:**

- You need a short confirmation. Use `Dialog`.
- You need brief contextual content. Use `Popover` or `Tooltip`.

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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@z-ux/ui/drawer';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `open` | `boolean` | Controlled open state |
| `defaultOpen` | `boolean` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | Open state change handler |
| `modal` | `boolean` | Trap focus and block outside interaction |
| `side` | `left`, `right`, `top`, `bottom` | Edge the panel slides from (default `right`) |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `DrawerTrigger` | No | Opens the drawer |
| `DrawerContent` | Yes | Slide-in panel (includes overlay) |
| `DrawerHeader` | No | Groups title and description |
| `DrawerTitle` | Yes | Accessible name for the drawer |
| `DrawerDescription` | No | Supporting context |
| `DrawerFooter` | No | Action area aligned to the end |
| `DrawerClose` | No | Dismiss control |

## Accessibility

Set `DrawerTitle` for every drawer. Add `DrawerDescription` when extra context helps screen-reader users.

## Keyboard

| Key | Action |
| --- | --- |
| `Escape` | Closes the drawer |
| `Tab` | Cycles focus within the drawer |
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
| Header/footer padding | `--z-spacing-inset-box-comfortable` |
| Content gap | `--z-spacing-gap-component` |
| Footer actions gap | `--z-spacing-gap-inline` |
| Slide animation | `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit` |

## Figma

| Figma | React |
| --- | --- |
| Drawer / Overlay | Built into `DrawerContent` |
| Drawer / Panel | `<DrawerContent>` |
| Drawer / Header | `<DrawerHeader>` |
| Drawer / Title | `<DrawerTitle>` |
| Drawer / Description | `<DrawerDescription>` |
| Drawer / Footer | `<DrawerFooter>` |
| Drawer / Close | `<DrawerClose>` |

## Notes

- **SSR:** SSR is safe. Portal content renders on the client when open.
- **Portal:** Yes — overlay and content render in a portal.
- **Reduced motion:** Drawer turns off overlay and panel animations when `prefers-reduced-motion: reduce` is active.
- **Form:** Place form controls inside `DrawerContent`. Submit handlers work as usual.

## Examples

```tsx
<Drawer>
  <DrawerTrigger>Open settings</DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Manage your preferences.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>Done</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```
