# Progress

## Overview

Progress shows how much of a task is complete with a horizontal bar.

## When to use

**Use when:**

- You know or estimate the percentage of an upload, a download, or a multi-step task.
- Users need to see how much of a task remains.

**Do not use when:**

- You do not know the duration and you can not measure it. Use `Spinner`.
- You need only a circular gauge. Use `RadialProgress`.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/motion.css';
import { Progress } from '@z-ui/react/progress';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `value` | `number` | — |
| `max` | `number` | `100` |
| `indeterminate` | `boolean` | `false` |
| `aria-label` | `string` | `'Progress'` |

### Data attributes

- `data-indeterminate` on root, track, and indicator when indeterminate

## Accessibility

Set an `aria-label` when visible text does not label the progress bar.

## Keyboard

Progress is presentational. It is not focusable.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Track | `--z-color-background-muted`, `--z-radius-pill`, `--z-radius-control` (height) |
| Indicator | `--z-color-background-primary` |
| Indeterminate motion | `--z-motion-duration-continuous`, `--z-motion-easing-continuous` |
| Determinate motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Progress / Determinate | `<Progress value={n} />` |
| Progress / Indeterminate | `<Progress indeterminate />` |

## Notes

- **SSR:** Safe.
- **Portal:** No.
- **Reduced motion:** Indeterminate animation collapses to a static fill.

## Examples

```tsx
<Progress value={45} aria-label="Uploading files" />
<Progress indeterminate aria-label="Processing" />
```
