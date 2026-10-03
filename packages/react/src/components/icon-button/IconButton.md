# IconButton

## Overview

IconButton triggers icon-only actions.

IconButton uses the same semantic color tokens in the light theme and in the dark theme.

## When to use

**Use when:**

- You trigger a compact action with an icon for close, edit, or delete.
- The layout has little space. Do not show a text label.

**Do not use when:**

- A visible text label is available. Use `Button` with an `icon` slot instead.
- You navigate to another page. Use `Link` instead.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { IconButton } from '@z-ux/ui/icon-button';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `primary`, `secondary`, `ghost`, `danger` | `primary` |
| `size` | `sm`, `md`, `lg` | `md` |
| `isLoading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `asChild` | `boolean` | `false` |
| `aria-label` | `string` | **Required** |

### Data attributes

- `data-variant`, `data-size`, `data-loading`, `data-disabled`

If `disabled` or `isLoading` is true, the `asChild` host is behaviorally disabled. The contract is the same as for `Button` and `Link`.

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` | Yes | Icon content (decorative; name comes from `aria-label`) |

## Accessibility

You need to give `aria-label` because the button has no visible text label. The icon in `children` has `aria-hidden`.

## Keyboard

| Key | Action |
| --- | --- |
| `Enter` / `Space` | Activates the button |
| `Tab` | Moves focus to/from the button |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Primary fill | `--z-color-background-primary`, `.hover`, `.active`, `.disabled`, `--z-color-border-primary` |
| Secondary surface | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-default` |
| Ghost hover | `--z-color-background-subtle` |
| Danger fill | `--z-color-background-danger`, `.hover`, `.active`, `.disabled`, `--z-color-border-danger` |
| Primary label | `--z-color-text-on-primary` |
| Danger label | `--z-color-text-on-solid` |
| Disabled label | `--z-color-text-disabled` |
| Focus ring | `--z-color-focus-ring` |
| Corner radius | `--z-radius-control` |
| Control typography | `--z-text-control-*` |
| Hover/pressed motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Icon Button / Primary | `<IconButton variant="primary" aria-label="…">` |
| Icon Button / Secondary | `<IconButton variant="secondary" aria-label="…">` |
| Icon Button / Ghost | `<IconButton variant="ghost" aria-label="…">` |
| Icon Button / Danger | `<IconButton variant="danger" aria-label="…">` |

## Notes

- **SSR:** IconButton is safe for SSR. It has no browser globals at import.
- **Portal:** No.
- **Form:** IconButton renders a native `<button>`. It respects `type="submit"` and `disabled`.
- **asChild + isLoading:** When `asChild` is true, `isLoading` disables the slotted host and does not render a spinner.

## Examples

```tsx
<IconButton aria-label="Close" variant="ghost">
  <CloseIcon />
</IconButton>
<IconButton aria-label="Delete" variant="danger" disabled>
  <TrashIcon />
</IconButton>
```
