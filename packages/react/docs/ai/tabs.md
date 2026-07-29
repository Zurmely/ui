# Tabs

## Purpose

Tabs organize related content into switchable panels. Users can move between views without leaving the page.

## Select when

- You switch between closely related views in the same context.
- Each panel has distinct content. The content does not need to be visible at once.

## Prefer instead

| Situation | Use |
| --- | --- |
| You navigate to a different page. Use  or routing instead | `Link` |

## Import

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@z-ui/react/tabs';
```

## Compose

- **TabsList** (Required): Tab button group.
- **TabsTrigger** (Required): One per tab; set `value`.
- **TabsContent** (Required): Panel for each tab; set matching `value`.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `defaultValue` | for string. |
| `value` | for string. |
| `onValueChange` | when Controlled change handler. |
| `orientation` | for horizontal, vertical. |
| `data-state` | for active, inactive. |

## Style with tokens

- **List chrome:** `--z-color-background-surface`, `--z-color-border-subtle`
- **Unselected trigger:** `--z-color-background-surface`
- **Selected trigger:** `--z-color-background-selected`
- **Label:** `--z-color-text-primary`, `--z-color-text-disabled`
- **Focus ring:** `--z-color-focus-ring`
- **Control typography:** `--z-text-control-*`
- **List padding:** `--z-spacing-inset-box-tight`
- **List radius:** `--z-radius-container`
- **Active trigger motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You navigate to a different page. Use `Link` or routing instead.
- All content must stay visible. Use headings or accordions.
- Do not recreate `Tabs` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Accordion` — Vertically stacked expandable sections
- `Dialog` — Modal overlay for focused tasks and confirmations
- `Drawer` — Slide-in panel for secondary content
- `Menu` — Dropdown menu for actions

## Human doc

[Tabs.md](../../src/components/tabs/Tabs.md)
