# ListItem

## Overview

ListItem gives a shared horizontal layout with leading, content, and trailing regions.

Use it for list rows, settings rows, navigation links, and flexible compositions with open slots.

## When to use

**Use when:**

- You need a row with optional leading and trailing content.
- You build list items, settings rows, or navigation links with a consistent layout.
- You need a single trailing form control with automatic label wiring.

**Do not use when:**

- You need toolbar keyboard behavior. Use `Toolbar`.
- You need a bullet or numbered list container. Wrap `ListItem as="li"` in your own `<ul>` or `<ol>`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { ListItem, ListItemIcon } from '@z-ux/ui/list-item';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `as` | `div`, `li`, `a`, `button` | Host element (default `div`) |
| `variant` | `plain`, `contained`, `compact` | Visual treatment (default `plain`). `compact` removes horizontal padding. |
| `size` | `sm`, `md`, `lg` | Controls vertical padding |
| `align` | `start`, `center` | Cross-axis alignment |
| `interactive` | `boolean` | Hover/active affordance; defaults to `true` for `a` and `button` |
| `selected` | `boolean` | Sets `data-selected`; defaults `aria-current="page"` for `as="a"` |
| `disabled` | `boolean` | Non-interactive state with `data-disabled` |
| `invalid` | `boolean` | Field state when `control` is present |
| `required` | `boolean` | Field state when `control` is present |
| `asChild` | `boolean` | Merge props onto child element via Radix Slot |
| `data-size` | `sm`, `md`, `lg` | Reflected on root |
| `data-align` | `start`, `center` | Reflected on root |
| `data-variant` | `plain`, `contained`, `compact` | Reflected on root |
| `data-interactive` | `true` | When interactive affordance is active |
| `data-selected` | `true` | When `selected` is true |
| `data-disabled` | `true` | When `disabled` is true |
| `data-invalid` | `true` | When `invalid` is true |
| `data-control` | `true` | When `control` slot is present |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `leading` | No | Start region; accepts any `ReactNode` |
| `trailing` | No | End region; accepts any `ReactNode` |
| `control` | No | Trailing form control with automatic `aria-labelledby` / `aria-describedby` wiring |
| `label` | No | Primary text in content region |
| `description` | No | Supporting text in content region |
| `children` | No | Additional content below label/description |

Use `ListItemIcon` for decorative SVG icons in leading or trailing slots.

### Migration from removed components

| Old component | New usage |
| --- | --- |
| `Row` | `<ListItem leading trailing label description align />` |
| `ListRow` | `<ListItem as="li" interactive leading trailing label />` inside `<ul>` |
| `SettingRow` | `<ListItem label control description disabled invalid required />` |
| `NavRow` | `<ListItem as="a" href label selected leading trailing />` |
| `List` + `ListItem` | Use native `<ul>` / `<ol>` with `<ListItem as="li" />` children |

## Accessibility

Set a visible `label` or make sure `children` show the item purpose. `ListItemIcon` is decorative (`aria-hidden`).

When `control` is present, ListItem injects `aria-labelledby` and `aria-describedby` on supported controls (Switch, Checkbox, RadioGroup, Button, IconButton) unless the control already sets them.

For `as="a"` with `selected`, `aria-current="page"` is set by default. Pass `aria-current` to override.

## Keyboard

When `as="button"` or `as="a"`, keyboard behavior follows the native element. When `interactive` is set on other hosts, focus behavior follows the host element or `asChild` child.

Do not place interactive controls in `trailing` when the row itself is interactive (link or button). A dev warning is emitted in development.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Root padding | `--z-spacing-inset-box` (`sm`: `--z-spacing-inset-box-compact`, `lg`: `--z-spacing-inset-box-comfortable`; horizontal padding removed for `variant="compact"`) |
| Gap | `--z-spacing-gap-component`, `--z-spacing-stack-form` |
| Label | `--z-text-control-*`, `--z-color-text-primary` |
| Description | `--z-text-caption-*`, `--z-color-text-tertiary` |
| Icon | `--z-color-icon-secondary` |
| Interactive hover/active | `--z-color-background-subtle`, `--z-color-background-muted` |
| Contained surface | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-radius-surface` |
| Selected | `--z-color-background-selected` |
| Disabled | `--z-color-text-disabled` |
| Link radius | `--z-radius-control` |
| Link motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| List item / row layout | `ListItem` |
| Contained list item | `ListItem variant="contained"` |
| Compact list item | `ListItem variant="compact"` |
| Icon slot | `ListItemIcon` |
| Setting row | `ListItem` with `control` |
| Nav item | `ListItem as="a"` with `selected` |

## Notes

ListItem renders inline. No portal. When `control` is present, `FieldProvider` propagates `disabled`, `invalid`. `required` to child controls via field context.

`Select` is not supported in the `control` slot. Compose Select with `Field` instead.

## Examples

```tsx
<ListItem
  variant="contained"
  leading={<ListItemIcon><BellIcon /></ListItemIcon>}
  label="Notifications"
  description="Email and push alerts"
  trailing={<Badge tone="info">New</Badge>}
/>
```
