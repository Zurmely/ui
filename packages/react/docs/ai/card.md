# Card

## Purpose

Card groups related content in a bordered surface. Card has optional header, body, and footer slots.

## Select when

- You show a self-contained unit of information, such as a plan summary, a profile snippet, or a settings group.
- Content needs visual separation from the page background.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@z-ui/react/card';
```

## Compose

Use `Card` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| — | See human doc API table for props. |

## Style with tokens

- **Surface:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-radius-container`
- **Title:** `--z-color-text-primary`, `--z-text-title-*`
- **Description:** `--z-color-text-tertiary`, `--z-text-caption-*`
- **Content:** `--z-color-text-primary`, `--z-text-body-*`
- **Footer:** `--z-color-text-secondary`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- The surface is interactive navigation. Use links or list items.
- You need a full-page layout container. Use page layout primitives.
- Do not recreate `Card` with raw HTML and one-off CSS when this component fits the task.

## Related

- `ListItem` — Unified row layout for lists, settings, navigation, and flexible compositions...
- `Stack` — Flex layout with consistent gap spacing
- `Toolbar` — Grouped actions with leading, center, and trailing regions and roving keyboar...

## Human doc

[Card.md](../../src/components/card/Card.md)
