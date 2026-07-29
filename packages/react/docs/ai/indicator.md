# Indicator

## Purpose

Indicator puts a badge or dot on another element. Indicator shows status, a count, or that the user must look at the element. For example, Indicator can show an unread notification count on an avatar.

## Select when

- You show an unread count on an icon or an avatar.
- You show new or active status with a dot.

## Prefer instead

| Situation | Use |
| --- | --- |
| You need a standalone label. Use | `Badge` |
| You need a page-level alert. Use | `Alert` |

## Import

```tsx
import { Avatar, Indicator, IndicatorItem } from '@z-ui/react';
```

## Compose

- **children (on Indicator)** (Required): The base element being annotated.
- **IndicatorItem** (Required): The overlay badge or dot.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `variant` | for badge, dot. |
| `placement` | for top-start, top-end, bottom-start, bottom-end. |
| `tone` | for neutral, primary, success, warning, danger, info. |
| `label` | for string. |

## Style with tokens

- **Badge typography:** `--z-text-badge-*`
- **Badge padding:** `--z-spacing-inset-compact`
- **Badge/dot fill:** `--z-color-background-{tone}`
- **Badge text:** `--z-color-text-on-solid`, `--z-color-text-secondary`
- **Ring border:** `--z-color-background-surface`
- **Shape:** `--z-radius-pill`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need a standalone label. Use `Badge`.
- You need a page-level alert. Use `Alert`.
- Do not recreate `Indicator` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `Badge` — Compact label for status, count, or category
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Progress` — Linear progress indicator

## Human doc

[Indicator.md](../../src/components/indicator/Indicator.md)
