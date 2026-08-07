# Timeline

## Purpose

Timeline shows a sequence of events with markers, dates, titles, and descriptions.

Timeline supports vertical and horizontal layouts.

## Select when

- You show activity history, release notes, or process steps over time.
- Events have a clear chronological order.

## Prefer instead

| Situation | Use |
| --- | --- |
| Data is tabular. Use | `Table` |

## Import

```tsx
import { Timeline, TimelineItem } from '@z-ux/ui/timeline';
```

## Compose

Use `Timeline` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `orientation` | for horizontal, vertical; default is vertical. |

## Style with tokens

- **Connector line:** `--z-color-border-subtle`
- **Marker dot:** `--z-color-background-primary`, `--z-radius-circle`
- **Marker ring:** `--z-elevation-ring`
- **Date:** `--z-text-caption-*`, `--z-color-text-secondary`
- **Title:** `--z-text-title-*`, `--z-color-text-primary`
- **Description:** `--z-text-body-*`, `--z-color-text-secondary`
- **Spacing:** `--z-spacing-stack-component`, `--z-spacing-gap-inline`, `--z-spacing-gap-section`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need non-sequential navigation. Use tabs or a stepper.
- Data is tabular. Use `Table`.
- Do not recreate `Timeline` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Carousel` — Scrollable content with previous and next controls
- `Table` — Structured data table

## Human doc

[Timeline.md](../../src/components/timeline/Timeline.md)
