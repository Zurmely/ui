# Avatar

## Overview

Avatar shows an image for a user or an entity. If `src` has no value or the image does not load, Avatar shows a muted fallback. Avatar works in the light theme and in the dark theme.

## When to use

**Use when:**

- You show a person, a team, or an entity with an image.
- You show a profile image with an initials fallback.

**Do not use when:**

- You show an arbitrary decorative image. Use a standard `<img>`.
- The image needs interactive behavior. Wrap it with a button or a link.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import { Avatar } from '@z-ui/react/avatar';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `src` | `string` | — |
| `alt` | `string` | `''` |
| `fallback` | `string` | — |
| `size` | `sm`, `md`, `lg` | `md` |

### Data attributes

- `data-size`

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `fallback` | No | Initials shown when `src` has no value or fails to load |

## Accessibility

Set `alt` text when you show an image. When the fallback shows, a non-empty `alt` becomes the accessible name through `role="img"` on the fallback. You can omit `alt` for a decorative avatar. The fallback is `aria-hidden`.

## Keyboard

Not focusable by default. No keyboard interactions.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Background | `--z-color-background-muted` |
| Border | `--z-color-border-subtle` |
| Fallback text color | `--z-color-text-secondary` |
| Fallback typography (`sm`) | `--z-text-label-*` |
| Corner radius | `--z-radius-circle` |

## Figma

| Figma | React |
| --- | --- |
| Avatar / Image | `<Avatar src="…" alt="…" />` |
| Avatar / Initials | `<Avatar fallback="AB" alt="Alice Brown" />` |

## Notes

- **SSR:** SSR is safe. Image error state is client-side only.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Avatar src="/alice.jpg" alt="Alice Brown" />
<Avatar fallback="AB" alt="Alice Brown" />
```
