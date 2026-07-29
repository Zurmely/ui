# Select

## Overview

Select lets the user choose one value from a list in a compact, field-like control with an accessible dropdown menu.

## When to use

**Use when:**

- Users pick one option from more than ~7 choices.
- The layout has little space. Put options in a dropdown.

**Do not use when:**

- All options should remain visible. Use `RadioGroup`.
- Users must select many options. Use checkboxes or a multi-select pattern.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@z-ui/react/select';
```

## API

### Select (root)

| Prop | Values | Default |
| --- | --- | --- |
| `value` | `string` | — |
| `defaultValue` | `string` | — |
| `onValueChange` | `(value: string) => void` | — |
| `open` | `boolean` | — |
| `defaultOpen` | `boolean` | `false` |
| `onOpenChange` | `(open: boolean) => void` | — |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `name` | `string` | — |

### SelectTrigger

| Prop | Values | Default |
| --- | --- | --- |
| `invalid` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

### SelectValue

| Prop | Values | Default |
| --- | --- | --- |
| `placeholder` | `string` | — |

### Data attributes

- `data-state` on items: `checked` or `unchecked` (from Radix)
- `data-highlighted` on items during keyboard or pointer navigation
- `data-invalid` on trigger when validation fails

### Composition

```text
Select
├── SelectTrigger
│   ├── SelectValue
│   └── (chevron icon)
└── SelectContent
    └── SelectItem (one or more)
```

## Accessibility

Set `SelectTrigger` an `aria-label` or an `aria-labelledby`, or pair it with a visible `<label>` through `Field`.

## Keyboard

| Key | Action |
| --- | --- |
| `Space` / `Enter` / `ArrowDown` | Open the list when closed |
| `ArrowUp` / `ArrowDown` | Move the highlight |
| `Enter` / `Space` | Select the highlighted item |
| `Escape` | Close the list |
| `Tab` | Move focus away |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Trigger surface | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-text-primary` |
| Trigger hover | `--z-color-background-subtle` |
| Focus | `--z-color-border-focus`, `--z-color-focus-ring` |
| Invalid | `--z-color-border-danger` |
| Disabled | `--z-color-border-disabled`, `--z-color-text-disabled`, `--z-color-background-muted` |
| Placeholder | `--z-color-text-tertiary` |
| Menu surface | `--z-color-background-surface`, `--z-color-border-subtle` |
| Menu elevation | `--z-elevation-overlay` |
| Item hover | `--z-color-background-subtle` |
| Item highlighted/selected | `--z-color-background-selected` |
| Control typography | `--z-text-control-*` |
| Trigger padding | `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x` |
| Menu radius | `--z-radius-container` |
| Viewport padding | `--z-spacing-inset-box-tight` |
| Item padding | `--z-spacing-inset-control-compact-y`, `--z-spacing-inset-control-compact-x`, `--z-spacing-select-item-padding-start` |
| Trigger feedback motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |
| Content enter | `--z-motion-duration-enter`, `--z-motion-easing-enter` |

## Figma

| Figma | React |
| --- | --- |
| Select / Trigger | `<SelectTrigger><SelectValue /></SelectTrigger>` |
| Select / Menu | `<SelectContent>` |
| Select / Item | `<SelectItem value="…">` |

## Notes

- **SSR:** Safe. The component does not use browser globals at import.
- **Portal:** `SelectContent` renders in a portal for correct stacking.
- **Reduced motion:** Select turns off content enter animation when `prefers-reduced-motion: reduce` is active.
- **Form:** Supports `name` and `required` on the root for native form submission.

## Examples

```tsx
<Select defaultValue="apple">
  <SelectTrigger aria-label="Fruit">
    <SelectValue placeholder="Choose a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>
```
