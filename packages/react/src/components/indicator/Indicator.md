# Indicator

## Overview

Indicator puts a badge or dot on another element.

Indicator shows status, a count, or that the user must look at the element.

## When to use

**Use when:**

- You show an unread count on an icon or an avatar.
- You show new or active status with a dot.

**Do not use when:**

- You need a standalone label. Use `Badge`.
- You need a page-level alert. Use `Alert`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Avatar, Indicator, IndicatorItem } from '@z-ux/ui';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `variant` | `badge`, `dot` | Badge shows content; dot is a status marker |
| `placement` | `top-start`, `top-end`, `bottom-start`, `bottom-end` | Corner placement (default `top-end`) |
| `tone` | `neutral`, `primary`, `success`, `warning`, `danger`, `info` | Fill color (default `danger`) |
| `label` | `string` | Required accessible name for dot variant |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` (on `Indicator`) | Yes | The base element being annotated |
| `IndicatorItem` | Yes | The overlay badge or dot |

## Accessibility

- Badge variant: visible text gives the accessible name.
- Dot variant: give `label` for screen-reader users.

## Keyboard

Indicator is decorative. Keyboard interaction belongs to the wrapped element.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Badge typography | `--z-text-badge-*` |
| Badge padding | `--z-spacing-inset-compact` |
| Badge/dot fill | `--z-color-background-{tone}` |
| Badge text | `--z-color-text-on-solid`, `--z-color-text-on-warning`, `--z-color-text-on-info`, `--z-color-text-secondary` |
| Ring border | `--z-color-background-surface` |
| Shape | `--z-radius-pill` |

## Figma

| Figma | React |
| --- | --- |
| Indicator / Wrapper | `<Indicator>` |
| Indicator / Item | `<IndicatorItem>` |

## Notes

- **SSR:** Indicator is safe for SSR. Indicator uses inline layout only.
- **Portal:** No.
- **Form:** Not applicable.

## Examples

```tsx
<Indicator>
  <IndicatorItem>12</IndicatorItem>
  <Avatar fallback="AB" />
</Indicator>

<Indicator>
  <IndicatorItem variant="dot" tone="success" label="Online" />
  <Avatar fallback="AB" />
</Indicator>
```
