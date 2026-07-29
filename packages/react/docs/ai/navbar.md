# Navbar

## Purpose

Navbar shows a top application bar with dedicated logo and navigation content areas.

## Select when

- Primary site navigation must stay visible at the top of the page.
- Branding and nav links belong in a shared header.

## Prefer instead

| Situation | Use |
| --- | --- |
| Navigation applies only to a subsection | `Breadcrumbs` / `Tabs` |
| Primary actions belong in a floating control. Use | `FloatingActionButton` |

## Import

```tsx
import { Navbar, NavbarLogo, NavbarContent, NavbarItem } from '@z-ui/react';
```

## Compose

- **NavbarLogo** (Optional): Logo or product name.
- **NavbarContent** (Optional): List of `NavbarItem` children.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `label` | for string; default is "Main navigation". |

## Style with tokens

- **Bar surface:** `--z-color-background-surface`, `--z-color-border-subtle`
- **Primary:** `--z-text-title-*`, `--z-color-text-primary`
- **Items:** `--z-text-control-*`, `--z-color-background-subtle`, `--z-color-background-selected`
- **Nav padding:** `--z-spacing-inset-box-compact`, `--z-spacing-inset-box-comfortable`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Navigation applies only to a subsection. Use `Breadcrumbs` or `Tabs`.
- Primary actions belong in a floating control. Use `FloatingActionButton`.
- Do not recreate `Navbar` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Breadcrumbs` — Shows the current page location within a hierarchy
- `Megamenu` — Large dropdown navigation panel
- `Pagination` — Navigate between pages of content
- `Steps` — Multi-step progress indicator

## Human doc

[Navbar.md](../../src/components/navbar/Navbar.md)
