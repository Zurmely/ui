# Rating

## Overview

Rating gives a star input to collect or show whole-number scores from 0 to `max`.

Stars fill in integer steps. A value of `4.5` displays as 4 filled stars.

## When to use

**Use when:**

- You collect product or content ratings.
- You show read-only scores.

**Do not use when:**

- You need granular decimal scores.

## Install

```tsx
import { Rating } from '@z-ux/ui/rating';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `max` | `number` | `5` |
| `readOnly` | `boolean` | `false` |
| `value` / `defaultValue` | `number` | `0` |
| `onValueChange` | `(value: number) => void` | — |
| `disabled` / `invalid` / `required` | `boolean` | from `Field` context |

## Accessibility

Set the group a `FieldLabel` or an `aria-label`.

## Keyboard

| Key | Action |
| --- | --- |
| `ArrowRight` / `ArrowUp` | Next star |
| `ArrowLeft` / `ArrowDown` | Previous star |
| `Home` / `End` | First or last star |
| `Tab` | Enter the group. Roving `tabIndex` moves between stars |
| `Enter` / `Space` | Select the focused star |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Star gap | `--z-spacing-gap-inline-tight` |
| Default star | `--z-color-icon-secondary` |
| Active star | `--z-color-icon-primary` |
| Invalid star | `--z-color-icon-danger` |
| Disabled star | `--z-color-icon-disabled` |
| Motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Star rating input | `Rating` |
| Read-only rating | `Rating readOnly` |

## Notes

- **SSR:** SSR is safe.
- **Portal:** No.
- **Form:** Compose inside `Field` for labels. Supports controlled `value` and `onValueChange`.

## Examples

```tsx
<Field id="rating">
  <FieldLabel>How was your experience?</FieldLabel>
  <Rating value={score} onValueChange={setScore} />
</Field>
```
