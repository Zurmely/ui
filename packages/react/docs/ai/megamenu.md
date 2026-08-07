# Megamenu

## Purpose

Megamenu shows a large dropdown panel for navigation.

Megamenu builds on the Popover pattern.

## Select when

- A top-level nav item is the trigger. Megamenu opens many links or feature categories in groups.
- A simple `Menu` surface is too small for the content.

## Prefer instead

| Situation | Use |
| --- | --- |
| You need only a short list of actions. Use | `Menu` |
| Navigation stays visible on the page. Use  or a sidebar | `Navbar` |

## Import

```tsx
import { Megamenu, MegamenuContent, MegamenuItem, MegamenuTrigger } from '@z-ux/ui';
```

## Compose

Use `Megamenu` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `selected` | to toggle selected behavior. |
| `open / defaultOpen` | to toggle open / defaultOpen behavior. |

## Style with tokens

- **Trigger/content surface:** `--z-color-background-surface`, `--z-color-border-subtle`
- **Item hover/selected:** `--z-color-background-subtle`, `--z-color-background-selected`
- **Control typography:** `--z-text-control-*`
- **Content enter/exit:** `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need only a short list of actions. Use `Menu`.
- Navigation stays visible on the page. Use `Navbar` or a sidebar.
- Megamenu turns off content animations when `prefers-reduced-motion: reduce` is active.
- Do not recreate `Megamenu` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Breadcrumbs` — Shows the current page location within a hierarchy
- `Navbar` — Top navigation bar with logo and links
- `Pagination` — Navigate between pages of content
- `Steps` — Multi-step progress indicator

## Human doc

[Megamenu.md](../../src/components/megamenu/Megamenu.md)
