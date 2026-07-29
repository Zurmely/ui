# Drawer

## Purpose

Drawer shows slide-in panel content from an edge of the viewport. Drawer blocks interaction with the page behind it. Drawer suits navigation, filters. secondary workflows that need more space than a dialog but do not navigate away.

## Select when

- You show navigation or settings in a side panel.
- You show filters or detail views without leaving the current page.

## Prefer instead

| Situation | Use |
| --- | --- |
| You need a short confirmation. Use | `Dialog` |
| You need brief contextual content | `Popover` / `Tooltip` |

## Import

```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@z-ui/react/drawer';
```

## Compose

- **DrawerTrigger** (Optional): Opens the drawer.
- **DrawerContent** (Required): Slide-in panel (includes overlay).
- **DrawerHeader** (Optional): Groups title and description.
- **DrawerTitle** (Required): Accessible name for the drawer.
- **DrawerDescription** (Optional): Supporting context.
- **DrawerFooter** (Optional): Action area aligned to the end.
- **DrawerClose** (Optional): Dismiss control.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `open` | when Controlled open state. |
| `defaultOpen` | when Uncontrolled initial state. |
| `onOpenChange` | when Open state change handler. |
| `modal` | when Trap focus and block outside interaction. |
| `side` | for left, right, top, bottom. |

## Style with tokens

- **Scrim:** `--z-color-overlay-scrim` (opaque when `data-transparency="reduced"`)
- **Panel surface:** `--z-color-background-surface`, `--z-color-border-subtle`
- **Title:** `--z-color-text-primary`
- **Title typography:** `--z-text-title-*`
- **Description:** `--z-color-text-secondary`
- **Description typography:** `--z-text-body-*`
- **Close control typography:** `--z-text-control-*`
- **Close control hover:** `--z-color-background-subtle`
- **Focus ring:** `--z-color-focus-ring`
- **Header/footer padding:** `--z-spacing-inset-box-comfortable`
- **Content gap:** `--z-spacing-gap-component`
- **Footer actions gap:** `--z-spacing-gap-inline`
- **Slide animation:** `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need a short confirmation. Use `Dialog`.
- You need brief contextual content. Use `Popover` or `Tooltip`.
- Drawer turns off overlay and panel animations when `prefers-reduced-motion: reduce` is active.
- Do not recreate `Drawer` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Accordion` — Vertically stacked expandable sections
- `Dialog` — Modal overlay for focused tasks and confirmations
- `Menu` — Dropdown menu for actions
- `Popover` — Floating content anchored to a trigger

## Human doc

[Drawer.md](../../src/components/drawer/Drawer.md)
