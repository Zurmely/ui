# Breadcrumbs

## Purpose

Breadcrumbs show the current page location in a site hierarchy. Breadcrumbs let you go to ancestor pages with one click.

## Select when

- Users need context about where they are in a multi-level structure.
- Users must reach ancestor pages with one click.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { BreadcrumbItem, BreadcrumbLink, Breadcrumbs, BreadcrumbSeparator } from '@z-ui/react';
```

## Compose

- **children** (Required): `BreadcrumbItem` and `BreadcrumbSeparator` children.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `label` | for string; default is "Breadcrumb". |
| `current` | to toggle current behavior. |

## Style with tokens

- **Link:** `--z-color-text-secondary`, `--z-color-text-link-hover`
- **Current page:** `--z-color-text-primary`
- **Separator:** `--z-color-text-tertiary`
- **Caption typography:** `--z-text-caption-*`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- The hierarchy is flat or only one level deep.
- A sidebar or tabs work better for navigation.
- Do not recreate `Breadcrumbs` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Megamenu` — Large dropdown navigation panel
- `Navbar` — Top navigation bar with logo and links
- `Pagination` — Navigate between pages of content
- `Steps` — Multi-step progress indicator

## Human doc

[Breadcrumbs.md](../../src/components/breadcrumbs/Breadcrumbs.md)
