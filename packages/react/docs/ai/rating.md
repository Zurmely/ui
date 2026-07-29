# Rating

## Purpose

Rating gives a star input to collect or show scores from 1 to `max`.

## Select when

- You collect product or content ratings.
- You show read-only scores.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Rating } from '@z-ui/react/rating';
```

## Compose

Use `Rating` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `max` | for number; default is 5. |
| `readOnly` | to toggle readOnly behavior. |
| `value / defaultValue` | for number; default is 0. |
| `disabled / invalid / required` | to toggle disabled / invalid / required behavior. |

## Style with tokens

- **Star gap:** `--z-spacing-gap-inline-tight`
- **Default star:** `--z-color-icon-secondary`
- **Active star:** `--z-color-icon-primary`
- **Invalid star:** `--z-color-icon-danger`
- **Disabled star:** `--z-color-icon-disabled`
- **Motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need granular decimal scores.
- Do not recreate `Rating` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control

## Human doc

[Rating.md](../../src/components/rating/Rating.md)
