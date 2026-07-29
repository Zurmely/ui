# Calendar

## Overview

Calendar shows an accessible month grid for picking a single date. Day buttons accept keyboard focus. You can move between months.

## When to use

**Use when:**

- You select a date in a form or a popover.
- You compose `Calendar` inside `Field` for validation state.

**Do not use when:**

- A native `input[type="date"]` is enough for the platform.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import { Calendar } from '@z-ui/react/calendar';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `selected` / `defaultSelected` | `Date` | — |
| `month` / `defaultMonth` | `Date` | today |
| `minDate` / `maxDate` | `Date` | — |
| `disabled` | `boolean` | from `Field` context |
| `invalid` | `boolean` | from `Field` context |

### Data attributes

- `data-disabled`, `data-invalid`, `data-selected`, `data-today`, `data-outside-month`

## Accessibility

Set `aria-label` on the root, or associate the calendar with `FieldLabel`.

## Keyboard

| Key | Action |
| --- | --- |
| `ArrowLeft` / `ArrowRight` | Previous / next day |
| `ArrowUp` / `ArrowDown` | Previous / next week |
| `Home` / `End` | First / last day of the focused week |
| `PageUp` / `PageDown` | Previous / next month |
| `Tab` | Enters the grid; roving `tabIndex` moves between days |
| `Enter` / `Space` | Selects focused day |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Surface | `--z-color-background-surface`, `--z-color-background-muted` |
| Border | `--z-color-border-subtle`, `.default`, `.danger`, `.primary` |
| Selected day | `--z-color-background-primary`, `--z-color-text-on-solid` |
| Typography | `--z-text-label-*`, `--z-text-control-*`, `--z-text-caption-*` |

## Figma

| Figma | React |
| --- | --- |
| Calendar / Default | `<Calendar>` |
| Calendar / Invalid | `<Calendar invalid>` or `<Field invalid>` |

## Notes

- **SSR:** SSR is safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Use `onSelect` to sync selected date with form state.

## Examples

```tsx
<Field id="birthday" invalid={!selected}>
  <FieldLabel>Birthday</FieldLabel>
  <Calendar selected={selected} onSelect={setSelected} />
</Field>
```
