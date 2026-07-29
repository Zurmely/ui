# Spinner

## Overview

Spinner shows a loading or busy state.
It uses primary-colored motion and respects reduced-motion preferences.

## When to use

**Use when:**

- Content or an action runs.
- You need a small busy indicator. Use it inline or in buttons.

**Do not use when:**

- Progress is measurable. Use a progress bar.
- You can show loading by disabling the control alone. Pair with `aria-busy` on the parent.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import { Spinner } from '@z-ui/react/spinner';
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
