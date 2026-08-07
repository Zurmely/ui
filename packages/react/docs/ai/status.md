# Status

## Purpose

Status shows a tone-colored dot with an optional label.

Use Status for live or operational state, such as online, degraded, or error.

## Select when

- You show service, connection, or process state next to other content.
- A dot and a short label are clearer than a full badge.

## Prefer instead

| Situation | Use |
| --- | --- |
| You need long-form messaging. Use | `Alert` |
| You need only a text label without state color. Use | `Badge` |

## Import

```tsx
import { Status } from '@z-ux/ui/status';
```

## Compose

- **children / label** (Optional): Visible status label.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `tone` | for neutral, primary, success, warning, danger, info; default is neutral. |
| `size` | for sm, md, lg; default is md. |
| `label` | for ReactNode. |

## Style with tokens

- **Neutral:** `--z-color-text-secondary`
- **Primary:** `--z-color-text-primary`
- **Success:** `--z-color-text-success`
- **Warning:** `--z-color-text-warning`
- **Danger:** `--z-color-text-danger`
- **Info:** `--z-color-text-info`
- **size="sm" typography:** `--z-text-badge-*`
- **size="md" typography:** `--z-text-label-*`
- **size="lg" typography:** `--z-text-control-*`
- **Indicator shape:** `--z-radius-circle`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need long-form messaging. Use `Alert`.
- You need only a text label without state color. Use `Badge`.
- Do not recreate `Status` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `Badge` — Compact label for status, count, or category
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Indicator` — Notification badge overlay on a trigger element

## Human doc

[Status.md](../../src/components/status/Status.md)
