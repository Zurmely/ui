# Switch

## Overview

Switch turns a setting on or off with immediate effect.

Switch uses semantic tokens for track and thumb states in the light theme and in the dark theme.

## When to use

**Use when:**

- A change to a setting applies at once, such as notifications or dark mode.
- The choice is a clear on or off binary.

**Do not use when:**

- Users must confirm before they apply a change. Use `Checkbox` in a form.
- Users select one of several options. Use `RadioGroup` or `Select`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { Switch } from '@z-ux/ui/switch';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `checked` | `boolean` | — |
| `defaultChecked` | `boolean` | `false` |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `invalid` | `boolean` | `false` |
| `name` | `string` | — |
| `value` | `string` | — |

### Data attributes

- `data-state`: `checked` or `unchecked` (from Radix)
- `data-invalid`: `true` when validation fails

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| — | — | Pair with `Field` + `label` for visible labels |

## Accessibility

Set an accessible name with an associated `<label>`, `aria-label`, or `aria-labelledby`.

## Keyboard

| Key | Action |
| --- | --- |
| `Space` | Toggles on/off |
| `Tab` | Moves focus to/from the switch |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Off track | `--z-color-border-subtle`, `--z-color-background-surface` |
| On track | `--z-color-background-primary`, `--z-color-border-primary` |
| Thumb (on) | `--z-color-icon-on-solid` |
| Thumb (off) | `--z-color-icon-primary` |
| Focus | `--z-color-border-focus`, `--z-color-focus-ring` |
| Invalid | `--z-color-border-danger` |
| Disabled | `--z-color-border-disabled`, `--z-color-text-disabled`, `--z-color-background-muted` |
| Track/thumb motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Switch / Off | `<Switch />` |
| Switch / On | `<Switch defaultChecked />` |

## Notes

- **SSR:** Safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Supports `name`, `value`, and `required` for native form submission.
- **Reduced motion:** If `prefers-reduced-motion: reduce` is active, Switch removes motion on the track and on the thumb.

## Examples

```tsx
<Switch id="notifications" defaultChecked />
<label htmlFor="notifications">Email notifications</label>

<Switch checked={enabled} onCheckedChange={setEnabled} />
```
