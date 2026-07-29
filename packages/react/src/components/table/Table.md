# Table

## Overview

Table shows tabular data in semantic HTML. Table uses token-based styling. Table has a scrollable wrapper for narrow viewports.

## When to use

**Use when:**

- You show structured rows and columns of data.
- You handle sortable or interactive rows in the app layer.

**Do not use when:**

- You need layout-only alignment. Use CSS grid or flex.
- A single key-value list is enough. Use a description list.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@z-ui/react/table';
```

## API

Compound parts map to native table elements:

| Component | Element |
| --- | --- |
| `Table` | `table` (wrapped in scroll container) |
| `TableCaption` | `caption` |
| `TableHeader` | `thead` |
| `TableBody` | `tbody` |
| `TableFooter` | `tfoot` |
| `TableRow` | `tr` |
| `TableHead` | `th` |
| `TableCell` | `td` |

`TableHead` defaults `scope="col"`.

## Accessibility

Use `TableCaption` or `aria-label` on the table for an accessible name. Use `scope` on header cells for complex tables.

## Keyboard

Use native table navigation when a cell has an interactive element.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Wrapper border/radius | `--z-color-border-subtle`, `--z-radius-container` |
| Surface | `--z-color-background-surface`, `--z-color-background-subtle` |
| Header/footer text | `--z-text-label-*`, `--z-color-text-secondary` |
| Body text | `--z-text-body-*`, `--z-color-text-primary` |
| Caption | `--z-text-caption-*`, `--z-color-text-secondary` |
| Cell padding | `--z-spacing-inset-control-x`, `--z-spacing-inset-control-y` |
| Caption padding | `--z-spacing-inset-box` |

## Figma

| Figma | React |
| --- | --- |
| Table / Default | `<Table>` with header/body rows |
| Table / With footer | Add `<TableFooter>` |

## Notes

- **SSR:** Safe.
- **Portal:** No.
- **Form:** Cells can contain form controls.

## Examples

```tsx
<Table>
  <TableCaption>Orders</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Order</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>#1024</TableCell>
      <TableCell>Shipped</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
