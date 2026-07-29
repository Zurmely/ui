# Carousel

## Purpose

Carousel shows a sequence of content slides in a scrollable viewport. Carousel has previous and next controls. Carousel supports keyboard navigation.

## Select when

- You highlight a small set of featured cards, images, or testimonials.
- You need horizontal or vertical slide browsing without pagination.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@z-ui/react/carousel';
```

## Compose

Use `Carousel` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `orientation` | for horizontal, vertical; default is horizontal. |

## Style with tokens

- **Content gap:** `--z-spacing-gap-inline`
- **Control padding:** `--z-spacing-inset-control-y`
- **Control radius:** `--z-radius-control`
- **Control surface:** `--z-color-background-surface`, `--z-color-border-subtle`
- **Control text:** `--z-text-control-*`, `--z-color-text-primary`
- **Hover surface:** `--z-color-background-subtle`
- **Motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- All items must stay visible at once. Use a grid or a list.
- Content is long-form. Use in-page sections.
- Do not recreate `Carousel` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Table` — Structured data table
- `Timeline` — Chronological list of events

## Human doc

[Carousel.md](../../src/components/carousel/Carousel.md)
