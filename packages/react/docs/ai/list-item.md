# ListItem

## Purpose

ListItem gives a shared horizontal layout with leading, content, and trailing regions.

Use it for list rows, settings rows, navigation links, and flexible compositions with open slots.

## Select when

- You need a row with optional leading and trailing content.
- You build list items, settings rows, or navigation links with a consistent layout.
- You need a single trailing form control with automatic label wiring.

## Prefer instead

| Situation | Use |
| --- | --- |
| You need toolbar keyboard behavior. Use | `Toolbar` |

## Import

```tsx
import { ListItem, ListItemIcon } from '@z-ux/ui/list-item';
```

## Compose

- **leading** (Optional): Start region; accepts any `ReactNode`.
- **trailing** (Optional): End region; accepts any `ReactNode`.
- **control** (Optional): Trailing form control with automatic `aria-labelledby` / `aria-describedby` wiring.
- **label** (Optional): Primary text in content region.
- **description** (Optional): Supporting text in content region.
- **children** (Optional): Additional content below label/description.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `as` | for div, li, a, button. |
| `variant` | for plain, contained, compact. |
| `size` | for sm, md, lg. |
| `align` | for start, center. |
| `interactive` | when Hover/active affordance; defaults to `true` for `a` and `button`. |
| `selected` | when Sets `data-selected`; defaults `aria-current="page"` for `as="a"`. |
| `disabled` | when Non-interactive state with `data-disabled`. |
| `invalid` | when Field state when `control` is present. |

## Style with tokens

- **Root padding:** `--z-spacing-inset-box` (`sm`: `--z-spacing-inset-box-compact`, `lg`: `--z-spacing-inset-box-comfortable`; horizontal padding removed for `variant="compact"`)
- **Gap:** `--z-spacing-gap-component`, `--z-spacing-stack-form`
- **Label:** `--z-text-control-*`, `--z-color-text-primary`
- **Description:** `--z-text-caption-*`, `--z-color-text-tertiary`
- **Icon:** `--z-color-icon-secondary`
- **Interactive hover/active:** `--z-color-background-subtle`, `--z-color-background-muted`
- **Contained surface:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-radius-surface`
- **Selected:** `--z-color-background-selected`
- **Disabled:** `--z-color-text-disabled`
- **Link radius:** `--z-radius-control`
- **Link motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need toolbar keyboard behavior. Use `Toolbar`.
- You need a bullet or numbered list container. Wrap `ListItem as="li"` in your own `<ul>` or `<ol>`.
- Do not recreate `ListItem` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Card` — Container for grouped content with header, body, and footer
- `Stack` — Flex layout with consistent gap spacing
- `Toolbar` — Grouped actions with leading, center, and trailing regions and roving keyboar...

## Human doc

[ListItem.md](../../src/components/list-item/ListItem.md)
