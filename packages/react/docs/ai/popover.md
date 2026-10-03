# Popover

## Purpose

Popover shows rich content near a trigger.

The rest of the page stays interactive.

## Select when

- You show filters, pickers, or short forms near a control.
- The user must see the content while they use other parts of the page.

## Prefer instead

| Situation | Use |
| --- | --- |
| The user must complete an action before they continue. Use | `Dialog` |
| You need only one word of help. Use | `Tooltip` |

## Import

```tsx
import { Popover, PopoverContent, PopoverTrigger } from '@z-ux/ui/popover';
```

## Compose

- **PopoverTrigger** (Required): Opens the popover.
- **PopoverContent** (Required): Anchored panel.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `open` | when Controlled open state. |
| `defaultOpen` | when Uncontrolled initial state. |
| `onOpenChange` | when Open state change handler. |
| `align` | for start, center, end. |
| `sideOffset` | for number. |

## Style with tokens

- **Panel surface:** `--z-color-background-surface`
- **Content surface:** `--z-color-background-surface`, `--z-elevation-overlay`
- **Label:** `--z-color-text-primary`
- **Focus ring:** `--z-color-focus-ring`
- **Content enter/exit:** `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- The user must complete an action before they continue. Use `Dialog`.
- You need only one word of help. Use `Tooltip`.
- Popover turns off content animations when `prefers-reduced-motion: reduce` is active.
- Do not recreate `Popover` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Accordion` — Vertically stacked expandable sections
- `Dialog` — Modal overlay for focused tasks and confirmations
- `Drawer` — Slide-in panel for secondary content
- `Menu` — Dropdown menu for actions

## Human doc

[Popover.md](../../src/components/popover/Popover.md)
