# FloatingActionButton

## Purpose

FloatingActionButton shows one primary action.

The action stays fixed above page content, usually in the bottom-right corner.

## Select when

- One high-priority action must stay visible while the user scrolls.
- The action is icon-only and has a clear accessible name.

## Prefer instead

| Situation | Use |
| --- | --- |
| The action is not the primary action. Use an inline  or  instead | `Button` |

## Import

```tsx
import { FloatingActionButton } from '@z-ux/ui/floating-action-button';
```

## Compose

- **icon / children** (Required): Icon content (icon-only).

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `variant` | for primary, secondary, ghost, danger; default is primary. |
| `size` | for sm, md, lg; default is md. |
| `isLoading` | when the control shows a loading state. |
| `disabled` | when the control should not accept input. |
| `icon` | for ReactNode. |
| `asChild` | when you need to merge props onto a child element. |
| `aria-label` | for string; default is required. |

## Style with tokens

- **Fill variants:** Same as `Button` / `IconButton` primary, surface, danger roles
- **Corner shape:** `--z-radius-circle`
- **Fixed offset:** `--z-spacing-gap-page-section`
- **Control typography:** `--z-text-control-*`
- **Interaction motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need more than one action. Use a toolbar or menu instead.
- The action is not the primary action. Use an inline `Button` or `IconButton` instead.
- Do not recreate `FloatingActionButton` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Button` — Triggers actions and form submissions with consistent semantic color treatment
- `IconButton` — Icon-only button with required accessible name
- `Link` — Styled anchor for navigation

## Human doc

[FloatingActionButton.md](../../src/components/floating-action-button/FloatingActionButton.md)
