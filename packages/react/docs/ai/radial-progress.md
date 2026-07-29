# RadialProgress

## Purpose

RadialProgress shows task completion in a compact circular indicator.

## Select when

- The layout has little space. A circular gauge fits it.
- You show completion inline near an avatar, a button, or a card.

## Prefer instead

| Situation | Use |
| --- | --- |
| A full-width linear bar is clearer. Use | `Progress` |
| You need activity without measurable progress. Use | `Spinner` |

## Import

```tsx
import { RadialProgress } from '@z-ui/react/radial-progress';
```

## Compose

Use `RadialProgress` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `value` | for number. |
| `max` | for number; default is 100. |
| `indeterminate` | to toggle indeterminate behavior. |
| `size` | for sm, md, lg; default is md. |
| `aria-label` | for string; default is 'Progress'. |

## Style with tokens

- **Track stroke:** `--z-color-background-muted`
- **Indicator stroke:** `--z-color-background-primary`
- **Indeterminate motion:** `--z-motion-duration-continuous`, `--z-motion-easing-continuous`
- **Determinate motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- A full-width linear bar is clearer. Use `Progress`.
- You need activity without measurable progress. Use `Spinner`.
- Indeterminate spin collapses to a static ring.
- Do not recreate `RadialProgress` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `Badge` — Compact label for status, count, or category
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Indicator` — Notification badge overlay on a trigger element

## Human doc

[RadialProgress.md](../../src/components/radial-progress/RadialProgress.md)
