# Tooltip

## Purpose

Tooltip shows brief, supplementary information on hover or focus.

Tooltip does not clutter the interface.

## Select when

- You label icon-only controls with short hints.
- You explain terms that are not familiar next to other content.

## Prefer instead

| Situation | Use |
| --- | --- |
| Content is longer than a sentence | `Popover` |

## Import

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@z-ux/ui/tooltip';
```

## Compose

- **TooltipProvider** (Required): Wraps tooltip instances.
- **TooltipTrigger** (Required): Element that shows the tooltip.
- **TooltipContent** (Required): Tooltip label.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `open` | when Controlled visibility. |
| `defaultOpen` | when Uncontrolled initial visibility. |
| `delayDuration` | for number. |
| `side` | for top, right, bottom, left. |
| `sideOffset` | for number. |

## Style with tokens

- **Fill:** `--z-color-overlay-tooltip`
- **Label:** `--z-color-text-inverse`
- **Label typography:** `--z-text-caption-*`
- **Focus ring:** `--z-color-focus-ring`
- **Content enter/exit:** `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Content is essential to complete a task. Show it in the UI.
- Content is longer than a sentence.
- Tooltip turns off content animations when `prefers-reduced-motion: reduce` is active.
- Do not recreate `Tooltip` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Accordion` — Vertically stacked expandable sections
- `Dialog` — Modal overlay for focused tasks and confirmations
- `Drawer` — Slide-in panel for secondary content
- `Menu` — Dropdown menu for actions

## Human doc

[Tooltip.md](../../src/components/tooltip/Tooltip.md)
