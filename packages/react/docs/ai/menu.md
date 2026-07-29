# Menu

## Purpose

Menu shows a list of actions or choices in a dropdown anchored to a trigger.

## Select when

- You give secondary actions for a control or a row.
- You select one option from a short list of commands.

## Prefer instead

| Situation | Use |
| --- | --- |
| You select a single value in a form field. Use | `Select` |
| You navigate across pages. Use a nav list or | `Link` |

## Import

```tsx
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '@z-ui/react/menu';
```

## Compose

- **MenuTrigger** (Required): Opens the menu.
- **MenuContent** (Required): Dropdown panel.
- **MenuItem** (Required): Action or option.
- **MenuSeparator** (Optional): Visual divider.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `open` | when Controlled open state. |
| `defaultOpen` | when Uncontrolled initial state. |
| `onOpenChange` | when Open state change handler. |
| `selected` | when On `MenuItem`; sets `data-selected`. |
| `data-highlighted` | for —. |
| `sideOffset` | for number. |

## Style with tokens

- **Panel surface:** `--z-color-background-surface`, `--z-color-border-subtle`
- **Item hover:** `--z-color-background-subtle`
- **Item selected:** `--z-color-background-selected`
- **Disabled label:** `--z-color-text-disabled`
- **Separator:** `--z-color-border-subtle`
- **Focus ring:** `--z-color-focus-ring`
- **Trigger/item padding:** `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x`
- **Panel padding:** `--z-spacing-inset-box-tight`
- **Separator margin:** `--z-spacing-inset-box-tight`
- **Control typography:** `--z-text-control-*`
- **Overlay offset:** `--z-spacing-offset-overlay` (default `sideOffset={4}`)
- **Content enter/exit:** `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You select a single value in a form field. Use `Select`.
- You navigate across pages. Use a nav list or `Link`.
- Menu turns off content animations when `prefers-reduced-motion: reduce` is active.
- Do not recreate `Menu` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Accordion` — Vertically stacked expandable sections
- `Dialog` — Modal overlay for focused tasks and confirmations
- `Drawer` — Slide-in panel for secondary content
- `Popover` — Floating content anchored to a trigger

## Human doc

[Menu.md](../../src/components/menu/Menu.md)
