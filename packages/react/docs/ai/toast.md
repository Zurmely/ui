# Toast

## Purpose

Toast shows brief, non-blocking feedback.

Toast auto-dismisses without interrupting the current task.

## Select when

- You confirm a save, a copy, or a background action.
- You show transient status that does not need a response.

## Prefer instead

| Situation | Use |
| --- | --- |
| The message is critical or needs a decision | `Alert` / `Dialog` |

## Import

```tsx
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@z-ux/ui/toast';
```

## Compose

Use `Toast` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| — | See human doc API table for props. |

## Style with tokens

- **Surface:** `--z-color-background-surface`, `--z-elevation-overlay`, `--z-radius-surface`
- **Title / body:** `--z-text-title-*`, `--z-text-body-*`, `--z-color-text-primary`, `--z-color-text-secondary`
- **Action:** `--z-color-background-primary-subtle`, `--z-color-border-primary`, `--z-color-text-primary`
- **Viewport offset:** `--z-spacing-gap-page-section`
- **Motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- **Elevation:** `--z-elevation-overlay`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- The message is critical or needs a decision. Use `Alert` or `Dialog`.
- Errors block continued work. Use inline validation or a modal.
- Toast turns off enter and exit animations when `prefers-reduced-motion: reduce` is active.
- Do not recreate `Toast` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Alert` — Communicates important messages with semantic tone treatment

## Human doc

[Toast.md](../../src/components/toast/Toast.md)
