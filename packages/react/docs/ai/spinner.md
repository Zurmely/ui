# Spinner

## Purpose

Spinner shows a loading or busy state.

It uses primary-colored motion and respects reduced-motion preferences.

## Select when

- A page section loads data and you need a centered busy indicator.
- A button submits a form and you want inline loading feedback with `isLoading`.
- A short async action runs and duration is unknown.

## Prefer instead

| Situation | Use |
| --- | --- |
| Progress is measurable. Use  or  instead | `Progress` |

## Import

```tsx
import { Spinner } from '@z-ux/ui/spinner';
```

## Compose

Use `Spinner` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `size` | for sm, md, lg; default is md. |
| `aria-label` | for string; default is "Loading". |

## Style with tokens

- **Indicator:** `--z-color-border-primary`
- **Rotation:** `--z-motion-duration-continuous`, `--z-motion-easing-continuous`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Progress is measurable. Use `Progress` or `RadialProgress` instead.
- The control can show loading state alone. Use `Button isLoading` and `aria-busy` on the parent.
- With `prefers-reduced-motion: reduce`, rotation stops. The indicator becomes a static ring.
- Do not recreate `Spinner` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Avatar` — Displays a user image with fallback initials
- `Badge` — Compact label for status, count, or category
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Indicator` — Notification badge overlay on a trigger element

## Human doc

[Spinner.md](../../src/components/spinner/Spinner.md)
