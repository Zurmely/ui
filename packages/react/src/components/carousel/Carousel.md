# Carousel

## Overview

Carousel shows a sequence of content slides in a scrollable viewport.

Carousel has previous and next controls.

## When to use

**Use when:**

- You highlight a small set of featured cards, images, or testimonials.
- You need horizontal or vertical slide browsing without pagination.

**Do not use when:**

- All items must stay visible at once. Use a grid or a list.
- Content is long-form. Use in-page sections.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@z-ux/ui/carousel';
```

## API

| Prop | Component | Values | Default |
| --- | --- | --- | --- |
| `orientation` | `Carousel` | `horizontal`, `vertical` | `horizontal` |

### Data attributes

- `data-orientation` on `Carousel`, `CarouselContent`, and `CarouselItem`
- `data-disabled` on navigation buttons when scrolling is not available

### Compound parts

| Part | Role |
| --- | --- |
| `Carousel` | Root region (`role="region"`) |
| `CarouselContent` | Scrollable viewport with snap |
| `CarouselItem` | Individual slide (`role="group"`) |
| `CarouselPrevious` | Previous slide button |
| `CarouselNext` | Next slide button |

## Accessibility

Set `aria-label` on `Carousel` to name the carousel region. Navigation buttons expose `Previous slide` and `Next slide` labels by default.

## Keyboard

When you focus `CarouselContent`:

| Key | Action |
| --- | --- |
| `ArrowLeft` / `ArrowUp` | Previous slide (orientation-dependent) |
| `ArrowRight` / `ArrowDown` | Next slide (orientation-dependent) |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Content gap | `--z-spacing-gap-inline` |
| Control padding | `--z-spacing-inset-control-y` |
| Control radius | `--z-radius-control` |
| Control surface | `--z-color-background-surface`, `--z-color-border-subtle` |
| Control text | `--z-text-control-*`, `--z-color-text-primary` |
| Hover surface | `--z-color-background-subtle` |
| Motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

Carousel uses `behavior: 'auto'` for scroll when the `prefers-reduced-motion: reduce` media query applies.

## Figma

| Figma | React |
| --- | --- |
| Carousel / Horizontal | `<Carousel orientation="horizontal">` |
| Carousel / Vertical | `<Carousel orientation="vertical">` |

## Notes

- **SSR:** SSR is safe. Scroll state starts on the client.
- **Portal:** No.
- **Form:** Not a form control.
- **Composition:** `CarouselContent` must sit inside `Carousel`. Each `CarouselItem` is one viewport wide (`flex: 0 0 100%`) and snaps. Previous and next scroll by one viewport.

## Examples

```tsx
<Carousel aria-label="Featured products">
  <CarouselPrevious />
  <CarouselContent>
    <CarouselItem>Product A</CarouselItem>
    <CarouselItem>Product B</CarouselItem>
  </CarouselContent>
  <CarouselNext />
</Carousel>
```
