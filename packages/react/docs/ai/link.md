# Link

## Purpose

Link shows styled navigation to another location. Link uses semantic tokens for link text color in the light theme and in the dark theme.

## Select when

- You navigate to another page, route, or external URL.
- You add inline text navigation within content.

## Prefer instead

| Situation | Use |
| --- | --- |
| You trigger an in-page action | `Button` / `IconButton` |

## Import

```tsx
import { Link } from '@z-ui/react/link';
```

## Compose

- **children** (Required): Link label text.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `disabled` | when the control should not accept input. |
| `href` | for string. |

## Style with tokens

- **Default:** `--z-color-text-link`
- **Hover:** `--z-color-text-link-hover`
- **Disabled:** `--z-color-text-disabled`
- **Focus ring:** `--z-color-focus-ring`
- **Control typography:** `--z-text-control-*`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You trigger an in-page action. Use `Button` or `IconButton`.
- The control must not navigate. Use a button instead.
- Do not recreate `Link` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Button` — Triggers actions and form submissions with consistent semantic color treatment
- `FloatingActionButton` — Prominent circular action button
- `IconButton` — Icon-only button with required accessible name

## Human doc

[Link.md](../../src/components/link/Link.md)
