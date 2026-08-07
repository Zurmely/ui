# Stack

## Purpose

Stack puts child elements in a horizontal or vertical flex layout.

Stack uses semantic spacing that stays the same between items.

## Select when

- You group related controls or content. You need spacing that stays the same between items.
- You build a simple form layout or a toolbar layout.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Stack } from '@z-ux/ui/stack';
```

## Compose

Use `Stack` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `direction` | for horizontal, vertical. |
| `gap` | for sm, md, lg. |

## Style with tokens

- **vertical:** `--z-spacing-stack-form`
- **vertical:** `--z-spacing-stack-component`
- **vertical:** `--z-spacing-stack-section`
- **horizontal:** `--z-spacing-gap-inline-tight`
- **horizontal:** `--z-spacing-gap-component`
- **horizontal:** `--z-spacing-gap-section`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need a complex grid layout.
- Spacing must be different for each child. Use a custom layout instead.
- Do not recreate `Stack` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Card` — Container for grouped content with header, body, and footer
- `ListItem` — Unified row layout for lists, settings, navigation, and flexible compositions...
- `Toolbar` — Grouped actions with leading, center, and trailing regions and roving keyboar...

## Human doc

[Stack.md](../../src/components/stack/Stack.md)
