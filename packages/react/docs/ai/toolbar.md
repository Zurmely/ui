# Toolbar

## Purpose

Toolbar groups related actions and controls in a single keyboard-navigable region with leading, center. trailing areas. Slot allowlists keep toolbars visually consistent.

## Select when

- You group document, table, or panel actions.
- You need keyboard navigation with a roving tab index across controls.

## Prefer instead

| Situation | Use |
| --- | --- |
| You need a single action button | `Button` |
| You need navigation links ( or ) | `Navbar` |

## Import

```tsx
import { Toolbar, Button, Separator } from '@z-ui/react';
```

## Compose

- **leading** (Optional): Start region; single or array.
- **children** (Optional): Center region.
- **trailing** (Optional): End region.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `label` | for string. |
| `orientation` | for horizontal, vertical. |
| `data-orientation` | for horizontal, vertical. |

## Style with tokens

- **Surface:** `--z-color-background-surface`, `--z-color-border-subtle`
- **Padding:** `--z-spacing-inset-box-compact`
- **Gap:** `--z-spacing-gap-component`, `--z-spacing-gap-inline`
- **Radius:** `--z-radius-surface`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need a single action button (`Button`).
- You need navigation links (`ListItem as="a"` or `Navbar`).
- Do not recreate `Toolbar` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Card` — Container for grouped content with header, body, and footer
- `ListItem` — Unified row layout for lists, settings, navigation, and flexible compositions...
- `Stack` — Flex layout with consistent gap spacing

## Human doc

[Toolbar.md](../../src/components/toolbar/Toolbar.md)
