# Dialog

## Purpose

Dialog shows focused modal content that needs user attention or action.

Dialog blocks interaction with the page behind it.

## Select when

- You confirm a destructive or irreversible action.
- You collect short, focused input without navigating away.

## Prefer instead

| Situation | Use |
| --- | --- |
| You need brief contextual help | `Tooltip` / `Popover` |

## Import

```tsx
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@z-ux/ui/dialog';
```

## Compose

- **DialogTrigger** (Optional): Opens the dialog.
- **DialogContent** (Required): Modal panel (includes overlay).
- **DialogTitle** (Required): Accessible name for the dialog.
- **DialogDescription** (Optional): Supporting context.
- **DialogHeader** (Optional): Title and description layout region.
- **DialogFooter** (Optional): Action button layout region (aligned end).
- **DialogClose** (Optional): Dismiss control.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `open` | when Controlled open state. |
| `defaultOpen` | when Uncontrolled initial state. |
| `onOpenChange` | when Open state change handler. |
| `modal` | when Trap focus and block outside interaction. |

## Style with tokens

- **Scrim:** `--z-color-overlay-scrim` (opaque when `data-transparency="reduced"`)
- **Panel surface:** `--z-color-background-surface` on flat `--z-color-overlay-scrim` (no chrome border, no drop shadow)
- **Title:** `--z-color-text-primary`
- **Title typography:** `--z-text-title-*`
- **Description:** `--z-color-text-secondary`
- **Description typography:** `--z-text-body-*`
- **Close control typography:** `--z-text-control-*`
- **Close control hover:** `--z-color-background-subtle`
- **Focus ring:** `--z-color-focus-ring`
- **Panel padding:** `--z-spacing-inset-box-comfortable`
- **Content gap:** `--z-spacing-gap-component`
- **Close control padding:** `--z-spacing-inset-control-compact-y`, `--z-spacing-inset-control-compact-x`
- **Overlay enter/exit:** `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need brief contextual help. Use `Tooltip` or `Popover`.
- You need a full-page workflow. Use a dedicated route or a drawer pattern.
- Dialog turns off overlay and content animations when `prefers-reduced-motion: reduce` is active.
- Do not recreate `Dialog` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Accordion` — Vertically stacked expandable sections
- `Drawer` — Slide-in panel for secondary content
- `Menu` — Dropdown menu for actions
- `Popover` — Floating content anchored to a trigger

## Human doc

[Dialog.md](../../src/components/dialog/Dialog.md)
