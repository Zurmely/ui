# RadialProgress

## Overview

RadialProgress shows task completion in a compact circular indicator.

Circular progress indicator.

## When to use

**Use when:**

- The layout has little space. A circular gauge fits it.
- You show completion inline near an avatar, a button, or a card.

**Do not use when:**

- A full-width linear bar is clearer. Use `Progress`.
- You need activity without measurable progress. Use `Spinner`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/motion.css';
import { RadialProgress } from '@z-ux/ui/radial-progress';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `value` | `number` | — |
| `max` | `number` | `100` |
| `indeterminate` | `boolean` | `false` |
| `size` | `sm`, `md`, `lg` | `md` |
| `aria-label` | `string` | `'Progress'` |

### Data attributes

- `data-size`, `data-indeterminate`

## Accessibility

Set an `aria-label` when visible text does not label the indicator.

## Keyboard

RadialProgress is presentational. It is not focusable.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Track stroke | `--z-color-background-muted` |
| Indicator stroke | `--z-color-background-primary` |
| Indeterminate motion | `--z-motion-duration-continuous`, `--z-motion-easing-continuous` |
| Determinate motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Radial Progress / Determinate | `<RadialProgress value={n} />` |
| Radial Progress / Indeterminate | `<RadialProgress indeterminate />` |

## Notes

- **SSR:** Safe.
- **Portal:** No.
- **Reduced motion:** Indeterminate spin collapses to a static ring.

## Examples

```tsx
<RadialProgress value={72} size="lg" aria-label="Profile completion" />
<RadialProgress indeterminate aria-label="Syncing" />
```
