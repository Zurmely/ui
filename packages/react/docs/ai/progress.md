# Progress

## Purpose

Progress shows how much of a task is complete with a horizontal bar.

## Select when

- You know or estimate the percentage of an upload, a download, or a multi-step task.
- Users need to see how much of a task remains.

## Prefer instead

| Situation | Use |
| --- | --- |
| You do not know the duration and you can not measure it. Use | `Spinner` |
| You need only a circular gauge. Use | `RadialProgress` |

## Import

```tsx
import { Progress } from '@z-ui/react/progress';
```

## Compose

Use `Progress` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `value` | for number. |
| `max` | for number; default is 100. |
| `indeterminate` | to toggle indeterminate behavior. |
| `aria-label` | for string; default is 'Progress'. |

## Style with tokens

- **Track:** `--z-color-background-muted`, `--z-radius-pill`, `--z-radius-control` (height)
- **Indicator:** `--z-color-background-primary`
- **Indeterminate motion:** `--z-motion-duration-continuous`, `--z-motion-easing-continuous`
- **Determinate motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You do not know the duration and you can not measure it. Use `Spinner`.
- You need only a circular gauge. Use `RadialProgress`.
- Indeterminate animation collapses to a static fill.
- Do not recreate `Progress` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `Badge` — Compact label for status, count, or category
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Indicator` — Notification badge overlay on a trigger element

## Human doc

[Progress.md](../../src/components/progress/Progress.md)
