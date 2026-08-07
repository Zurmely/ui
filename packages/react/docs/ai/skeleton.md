# Skeleton

## Purpose

Skeleton holds layout space while content loads.

It shows structure-colored placeholder boxes with a shimmer.

## Select when

- Content shape is known but data is still loading.
- You need placeholders for text roles or control-sized blocks without mounting the real component.

## Prefer instead

| Situation | Use |
| --- | --- |
| An in-control busy state is enough. Use  or  on actions | `Spinner` |

## Import

```tsx
import { Skeleton } from '@z-ux/ui/skeleton';
```

## Compose

Use `Skeleton` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `radius` | for control, control-compact, surface, container, pill, circle; default is control. |
| `text` | for display, h1–h6, title, body, control, label, caption. |
| `width` | for string \; default is number. |
| `height` | for string \; default is number. |
| `aria-label` | for string; default is — (decorative when omitted). |

## Style with tokens

- **Fill:** `--z-color-background-muted`, `--z-color-background-subtle`
- **Border:** `--z-color-border-subtle`
- **Radius:** `--z-radius-control`, `--z-radius-control-compact`, `--z-radius-surface`, `--z-radius-container`, `--z-radius-pill`, `--z-radius-circle`
- **Text height:** `--z-text-{role}-size`, `--z-text-{role}-line-height`
- **Shimmer:** `--z-motion-duration-continuous`, `--z-motion-easing-continuous`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- An in-control busy state is enough. Use `Spinner` or `isLoading` on actions.
- Progress is measurable. Use a progress indicator.
- Shimmer stops. Muted structure fill remains.
- Do not recreate `Skeleton` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `Badge` — Compact label for status, count, or category
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Indicator` — Notification badge overlay on a trigger element

## Human doc

[Skeleton.md](../../src/components/skeleton/Skeleton.md)
