# Separator

## Purpose

Separator shows a divider between content regions.

It uses a subtle border color in a horizontal or vertical orientation.

## Select when

- You divide sections of content or toolbar groups.
- You need a visual divider between related items.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Separator } from '@z-ux/ui/separator';
```

## Compose

Use `Separator` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `orientation` | for horizontal, vertical; default is horizontal. |

## Style with tokens

- **Divider:** `--z-color-border-subtle`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Spacing alone is enough. Use layout spacing.
- The divider is decorative in one semantic group. Set `aria-hidden` on a decorative element.
- Do not recreate `Separator` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `Badge` — Compact label for status, count, or category
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Indicator` — Notification badge overlay on a trigger element

## Human doc

[Separator.md](../../src/components/separator/Separator.md)
