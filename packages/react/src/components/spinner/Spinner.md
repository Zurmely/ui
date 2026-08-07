# Spinner

## Overview

Spinner shows a loading or busy state.

It uses primary-colored motion and respects reduced-motion preferences.

## When to use

**Use when:**

- A page section loads data and you need a centered busy indicator.
- A button submits a form and you want inline loading feedback with `isLoading`.
- A short async action runs and duration is unknown.

**Do not use when:**

- Progress is measurable. Use `Progress` or `RadialProgress` instead.
- The control can show loading state alone. Use `Button isLoading` and `aria-busy` on the parent.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { Spinner } from '@z-ux/ui/spinner';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `aria-label` | `string` | `"Loading"` |

### Data attributes

- `data-size`

### Slots

None.

## Accessibility

The default `aria-label` is `"Loading"`. Change it when the busy context needs a more specific label, for example `"Saving changes"`.

## Keyboard

Not focusable. No keyboard interactions.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Indicator | `--z-color-border-primary` |
| Rotation | `--z-motion-duration-continuous`, `--z-motion-easing-continuous` |

## Figma

| Figma | React |
| --- | --- |
| Spinner / Default | `<Spinner />` |
| Spinner / Small | `<Spinner size="sm" />` |

## Notes

- **SSR:** Safe. Animation is CSS-only.
- **Portal:** No.
- **Form:** Not a form control. Use alongside controls with `aria-busy`.
- **Reduced motion:** With `prefers-reduced-motion: reduce`, rotation stops. The indicator becomes a static ring.

## Examples

```tsx
<Spinner />
<Spinner aria-label="Saving changes" />
```
