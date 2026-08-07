# Pagination

## Purpose

Pagination helps users move between pages of content.

Pagination has previous and next controls, numbered links, and ellipsis gaps.

## Select when

- You split content across many pages.
- Users need to open a nearby page number.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Pagination, PaginationEllipsis, PaginationItem, PaginationLink } from '@z-ux/ui';
```

## Compose

Use `Pagination` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `label` | for string; default is "Pagination". |
| `current` | to toggle current behavior. |
| `disabled` | when the control should not accept input. |

## Style with tokens

- **Link surface:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-strong`
- **Current page:** `--z-color-background-selected`
- **Disabled:** `--z-color-text-disabled`
- **Ellipsis:** `--z-color-text-tertiary`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You use infinite scroll or a load-more pattern.
- The dataset fits on one page.
- Do not recreate `Pagination` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Breadcrumbs` — Shows the current page location within a hierarchy
- `Megamenu` — Large dropdown navigation panel
- `Navbar` — Top navigation bar with logo and links
- `Steps` — Multi-step progress indicator

## Human doc

[Pagination.md](../../src/components/pagination/Pagination.md)
