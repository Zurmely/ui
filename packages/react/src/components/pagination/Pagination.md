# Pagination

## Overview

Pagination helps users move between pages of content.

Pagination has previous and next controls, numbered links, and ellipsis gaps.

## When to use

**Use when:**

- You split content across many pages.
- Users need to open a nearby page number.

**Do not use when:**

- You use infinite scroll or a load-more pattern.
- The dataset fits on one page.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@z-ux/ui';
```

## API

| Prop | Component | Values | Default |
| --- | --- | --- | --- |
| `label` | `Pagination` | `string` | `"Pagination"` |
| `current` | `PaginationLink` | `boolean` | `false` |
| `disabled` | `PaginationLink` | `boolean` | `false` |

### Data attributes

- `aria-current="page"` on the current page link
- `aria-disabled` on disabled links

## Accessibility

Set an `aria-label` on previous and next links.
Set `current` on `PaginationLink` for the active page. `current` and `disabled` use the `Link` contract.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Move focus between pagination links |
| `Enter` | Activate the focused link |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Link surface | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-strong` |
| Current page | `--z-color-background-selected` |
| Disabled | `--z-color-text-disabled` |
| Ellipsis | `--z-color-text-tertiary` |

## Figma

| Figma | React |
| --- | --- |
| Pagination / Default | `<Pagination>` |
| Pagination / Current | `<PaginationLink current>` |
| Pagination / Ellipsis | `<PaginationEllipsis>` |

## Notes

- **SSR:** Safe. The component does not use browser globals at import.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Pagination>
  <PaginationItem>
    <PaginationLink href="/page/1" aria-label="Previous page">Prev</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="/page/2" current>2</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="/page/3" aria-label="Next page">Next</PaginationLink>
  </PaginationItem>
</Pagination>
```
