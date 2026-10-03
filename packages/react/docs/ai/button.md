# Button

## Purpose

Button starts actions and form submissions.

Use it for primary, secondary, ghost, and destructive actions in forms, dialogs, and toolbars.

## Select when

- You submit a form or start a primary or secondary action.
- You need native `<button>` semantics.

## Prefer instead

| Situation | Use |
| --- | --- |
| You navigate to another page | `Link` |
| You show an icon-only action without an accessible name | `IconButton` |

## Import

```tsx
import { Button } from '@z-ux/ui/button';
```

## Compose

- **children** (Required): Button label.
- **icon** (Optional): Leading icon.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `variant` | for primary, secondary, ghost, danger; default is primary. |
| `size` | for sm, md, lg; default is md. |
| `isLoading` | when the control shows a loading state. |
| `disabled` | when the control should not accept input. |
| `icon` | for ReactNode. |
| `asChild` | when you need to merge props onto a child element. |

## Style with tokens

- **Primary fill:** `--z-color-background-primary`, `.hover`, `.active`, `.disabled`, `--z-color-border-primary`
- **Secondary surface:** `--z-color-background-subtle`, `--z-color-background-muted` (hover)
- **Ghost hover:** `--z-color-background-subtle`
- **Danger fill:** `--z-color-background-danger`, `.hover`, `.active`, `.disabled`, `--z-color-border-danger`
- **Label on solid:** `--z-color-text-on-solid`
- **Disabled label:** `--z-color-text-disabled`
- **Focus ring:** `--z-color-focus-ring`
- **Control padding:** `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x`
- **Size sm / lg:** `--z-spacing-inset-control-compact-*`, `--z-spacing-inset-control-comfortable-*`
- **Icon gap:** `--z-spacing-gap-inline`, `--z-spacing-gap-inline-tight`
- **Corner radius:** `--z-radius-control`
- **Control typography:** `--z-text-control-font-family`, `--z-text-control-size`, `--z-text-control-weight`, `--z-text-control-line-height`
- **Hover/pressed motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You navigate to another page.
- You show an icon-only action without an accessible name. Use `IconButton` with `aria-label`.
- Button sets hover and press motion to zero duration when the `prefers-reduced-motion: reduce` media query applies.
- Do not recreate `Button` with raw HTML and one-off CSS when this component fits the task.

## Related

- `FloatingActionButton` — Prominent circular action button
- `IconButton` — Icon-only button with required accessible name
- `Link` — Styled anchor for navigation

## Human doc

[Button.md](../../src/components/button/Button.md)
