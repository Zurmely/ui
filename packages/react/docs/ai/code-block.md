# CodeBlock

## Purpose

CodeBlock shows short code text or a longer code sample.

## Select when

- You show a token name, a CSS variable, or a short command.
- You show a multi-line code sample with syntax highlighting.

## Prefer instead

| Situation | Use |
| --- | --- |
| The content is a status label. Use | `Badge` |
| The content is an interactive control | `Button` / `Link` |

## Import

```tsx
import { CodeBlock } from '@z-ui/react/code-block';
```

## Compose

- **children** (Optional): Code text when `code` is not set.
- **code** (Optional): Prefer for multi-line samples.
- **language** (Optional): Label in the multi header; drives highlighting.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `variant` | for single, multi; default is single. |
| `language` | for string; default is tsx for multi highlighting when omitted. |
| `code` | for string. |

## Style with tokens

- **Type size / weight / line height:** `--z-text-caption-*`
- **Font family:** `--z-font-family-mono`
- **Text:** `--z-color-text-primary`
- **Single fill:** `--z-color-background-muted`, `--z-color-background-subtle` (hover/focus-within)
- **Multi fill:** `--z-color-background-subtle`, `--z-color-background-muted` (header)
- **Border:** `--z-color-border-subtle`, `--z-color-border-default` (single hover)
- **Radius:** `--z-radius-control-compact` (single), `--z-radius-surface` (multi)
- **Spacing:** `--z-spacing-inset-box-tight`, `--z-spacing-inset-control-compact-*`, `--z-spacing-inset-container`, `--z-spacing-gap-inline-tight`
- **Motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- **Language label:** `--z-text-badge-*`, `--z-color-text-tertiary`
- **Highlight (comments):** `--z-color-text-tertiary`
- **Highlight (strings):** `--z-color-text-success`
- **Highlight (keywords / functions):** `--z-color-text-info`
- **Highlight (numbers / variables):** `--z-color-text-warning`
- **Highlight (punctuation):** `--z-color-text-secondary`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- The content is a status label. Use `Badge`.
- The content is an interactive control. Use `Button` or `Link`.
- Uses `--z-font-family-mono` because there is no `text.code` semantic role yet.
- Multi uses `prism-react-renderer` with semantic color variables.
- Do not recreate `CodeBlock` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `Badge` — Compact label for status, count, or category
- `Indicator` — Notification badge overlay on a trigger element
- `Progress` — Linear progress indicator

## Human doc

[CodeBlock.md](../../src/components/code-block/CodeBlock.md)
