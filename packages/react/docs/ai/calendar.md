# Calendar

## Purpose

Calendar shows an accessible month grid for picking a single date. Day buttons accept keyboard focus. You can move between months.

## Select when

- You select a date in a form or a popover.
- You compose `Calendar` inside `Field` for validation state.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Calendar } from '@z-ui/react/calendar';
```

## Compose

Use `Calendar` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `selected / defaultSelected` | for Date. |
| `month / defaultMonth` | for Date; default is today. |
| `minDate / maxDate` | for Date. |
| `disabled` | when the control should not accept input. |
| `invalid` | when validation failed. |

## Style with tokens

- **Surface:** `--z-color-background-surface`, `--z-color-background-muted`
- **Border:** `--z-color-border-subtle`, `.default`, `.danger`, `.primary`
- **Selected day:** `--z-color-background-primary`, `--z-color-text-on-solid`
- **Typography:** `--z-text-label-*`, `--z-text-control-*`, `--z-text-caption-*`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- A native `input[type="date"]` is enough for the platform.
- Do not recreate `Calendar` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `FileInput` — Styled file upload control
- `Filter` — Toggle group for filtering content

## Human doc

[Calendar.md](../../src/components/calendar/Calendar.md)
