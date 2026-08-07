# Badge

## Purpose

Badge shows a short status label or a count.

Badge uses a subtle background color for each tone, in the light theme and in the dark theme.

## Select when

- You show a status, a category, or a count next to other text.
- A short label needs the emphasis of a tone, but not the emphasis of `Alert`.

## Prefer instead

| Situation | Use |
| --- | --- |
| You show a critical system message. Use | `Alert` |
| The content is interactive | `Button` / `Link` |

## Import

```tsx
import { Badge } from '@z-ux/ui/badge';
```

## Compose

- **children** (Required): Badge label.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `tone` | for neutral, primary, success, warning, danger, info; default is neutral. |
| `size` | for sm, md, lg; default is md. |

## Style with tokens

- **Neutral:** `--z-color-background-subtle`, `--z-color-text-secondary`, `--z-color-border-subtle`
- **Primary:** `--z-color-background-primary-subtle`, `--z-color-text-primary`, `--z-color-border-primary`
- **Success:** `--z-color-background-success-subtle`, `--z-color-text-success`, `--z-color-border-success`
- **Warning:** `--z-color-background-warning-subtle`, `--z-color-text-warning`, `--z-color-border-warning`
- **Danger:** `--z-color-background-danger-subtle`, `--z-color-text-danger`, `--z-color-border-danger`
- **Info:** `--z-color-background-info-subtle`, `--z-color-text-info`, `--z-color-border-info`
- **Corner radius:** `--z-radius-pill`
- **size="sm" padding:** `--z-spacing-inset-box-tight`, `--z-spacing-inset-control-compact-x`
- **size="md" padding:** `--z-spacing-inset-control-compact-y`, `--z-spacing-inset-control-x`
- **size="lg" padding:** `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x`
- **size="sm" typography:** `--z-text-badge-*`
- **size="md" typography:** `--z-text-label-*`
- **size="lg" typography:** `--z-text-control-*`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You show a critical system message. Use `Alert`.
- The content is interactive. Use `Button` or `Link`.
- Do not recreate `Badge` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Indicator` — Notification badge overlay on a trigger element
- `Progress` — Linear progress indicator

## Human doc

[Badge.md](../../src/components/badge/Badge.md)
