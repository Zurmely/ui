# IconButton

## Purpose

IconButton triggers icon-only actions.

IconButton uses the same semantic color tokens in the light theme and in the dark theme.

## Select when

- You trigger a compact action with an icon for close, edit, or delete.
- The layout has little space. Do not show a text label.

## Prefer instead

| Situation | Use |
| --- | --- |
| A visible text label is available | `Button` |
| You navigate to another page | `Link` |

## Import

```tsx
import { IconButton } from '@z-ux/ui/icon-button';
```

## Compose

- **children** (Required): Icon content (decorative; name comes from `aria-label`).

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `variant` | for primary, secondary, ghost, danger; default is primary. |
| `size` | for sm, md, lg; default is md. |
| `isLoading` | when the control shows a loading state. |
| `disabled` | when the control should not accept input. |
| `asChild` | when you need to merge props onto a child element. |
| `aria-label` | for string; default is **Required**. |

## Style with tokens

- **Primary fill:** `--z-color-background-primary`, `.hover`, `.active`, `.disabled`, `--z-color-border-primary`
- **Secondary surface:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-default`
- **Ghost hover:** `--z-color-background-subtle`
- **Danger fill:** `--z-color-background-danger`, `.hover`, `.active`, `.disabled`, `--z-color-border-danger`
- **Label on solid:** `--z-color-text-on-solid`
- **Disabled label:** `--z-color-text-disabled`
- **Focus ring:** `--z-color-focus-ring`
- **Corner radius:** `--z-radius-control`
- **Control typography:** `--z-text-control-*`
- **Hover/pressed motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- A visible text label is available. Use `Button` with an `icon` slot instead.
- You navigate to another page.
- If the user sets `prefers-reduced-motion: reduce`, motion for interactions uses zero duration.
- Do not recreate `IconButton` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Button` — Triggers actions and form submissions with consistent semantic color treatment
- `FloatingActionButton` — Prominent circular action button
- `Link` — Styled anchor for navigation

## Human doc

[IconButton.md](../../src/components/icon-button/IconButton.md)
