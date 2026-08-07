# Table

## Purpose

Table shows tabular data in semantic HTML.

Table uses token-based styling.

## Select when

- You show structured rows and columns of data.
- You handle sortable or interactive rows in the app layer.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@z-ux/ui/table';
```

## Compose

Use `Table` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| — | See human doc API table for props. |

## Style with tokens

- **Wrapper border/radius:** `--z-color-border-subtle`, `--z-radius-container`
- **Surface:** `--z-color-background-surface`, `--z-color-background-subtle`
- **Header/footer text:** `--z-text-label-*`, `--z-color-text-secondary`
- **Body text:** `--z-text-body-*`, `--z-color-text-primary`
- **Caption:** `--z-text-caption-*`, `--z-color-text-secondary`
- **Cell padding:** `--z-spacing-inset-control-x`, `--z-spacing-inset-control-y`
- **Caption padding:** `--z-spacing-inset-box`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need layout-only alignment. Use CSS grid or flex.
- A single key-value list is enough. Use a description list.
- Do not recreate `Table` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Carousel` — Scrollable content with previous and next controls
- `Timeline` — Chronological list of events

## Human doc

[Table.md](../../src/components/table/Table.md)
