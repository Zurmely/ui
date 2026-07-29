# Skeleton

## Overview

Skeleton holds layout space while content loads.
It shows structure-colored placeholder boxes with a shimmer.
The `.z-skeleton` class applies to text lines and to blocks that look like components.

## When to use

**Use when:**

- Content shape is known but data is still loading.
- You need placeholders for text roles or control-sized blocks without mounting the real component.

**Do not use when:**

- An in-control busy state is enough. Use `Spinner` or `isLoading` on actions.
- Progress is measurable. Use a progress indicator.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import { Skeleton } from '@z-ui/react/skeleton';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `radius` | `control`, `control-compact`, `surface`, `container`, `pill`, `circle` | `control` |
| `text` | `display`, `h1`–`h6`, `title`, `body`, `control`, `label`, `caption` | — |
| `width` | `string` \| `number` | `100%` via CSS |
| `height` | `string` \| `number` | `1em`, or text-role line box when `text` is set |
| `aria-label` | `string` | — (decorative when omitted) |

### Data attributes

- `data-radius`
- `data-text`

### Slots

None. Compose multiple skeletons to mirror layouts.

## Accessibility

Decorative by default (`aria-hidden="true"`). Put `aria-busy` on a loading container, or pass `aria-label` on a single skeleton to expose `role="status"`.

## Keyboard

Not focusable. No keyboard interactions.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Fill | `--z-color-background-muted`, `--z-color-background-subtle` |
| Border | `--z-color-border-subtle` |
| Radius | `--z-radius-control`, `--z-radius-control-compact`, `--z-radius-surface`, `--z-radius-container`, `--z-radius-pill`, `--z-radius-circle` |
| Text height | `--z-text-{role}-size`, `--z-text-{role}-line-height` |
| Shimmer | `--z-motion-duration-continuous`, `--z-motion-easing-continuous` |

## Figma

| Figma | React |
| --- | --- |
| Skeleton / Control | `<Skeleton />` |
| Skeleton / Circle | `<Skeleton radius="circle" />` |
| Skeleton / Body | `<Skeleton text="body" width="12rem" />` |

## Notes

- **SSR:** Safe. Animation is CSS-only.
- **Portal:** No.
- **Form:** Not a form control. Replace fields with skeletons while loading.
- **Reduced motion:** Shimmer stops. Muted structure fill remains.

## Examples

```tsx
{/* Text line */}
<Skeleton text="body" width="16rem" />

{/* Avatar-sized circle */}
<Skeleton radius="circle" width="2rem" />

{/* Button-shaped block */}
<Skeleton radius="control" width="6rem" height="2.25rem" />

{/* Field-shaped block */}
<Skeleton radius="control" height="2.5rem" />

{/* Labeled region */}
<div aria-busy="true" aria-live="polite">
  <Skeleton text="title" width="10rem" />
  <Skeleton text="body" width="100%" />
  <Skeleton text="body" width="80%" />
</div>
```
