# Menu

## Overview

Menu shows a list of actions or choices in a dropdown anchored to a trigger.

Dropdown menu for actions.

## When to use

**Use when:**

- You give secondary actions for a control or a row.
- You select one option from a short list of commands.

**Do not use when:**

- You select a single value in a form field. Use `Select`.
- You navigate across pages. Use a nav list or `Link`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '@z-ux/ui/menu';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `open` | `boolean` | Controlled open state |
| `defaultOpen` | `boolean` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | Open state change handler |
| `selected` | `boolean` | On `MenuItem`; sets `data-selected` |
| `data-highlighted` | — | Radix hover/focus highlight |
| `sideOffset` | `number` | Default `4` — matches `--z-spacing-offset-overlay` |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `MenuTrigger` | Yes | Opens the menu |
| `MenuContent` | Yes | Dropdown panel |
| `MenuItem` | Yes | Action or option |
| `MenuSeparator` | No | Visual divider |

## Accessibility

The trigger must have visible text or an `aria-label`. Each `MenuItem` should have visible text that describes the action.

## Keyboard

| Key | Action |
| --- | --- |
| `Enter` / `Space` / `ArrowDown` | Open menu from trigger |
| `Arrow` keys | Move between items |
| `Enter` / `Space` | Activate item |
| `Escape` | Close menu |
| Typeahead | Jump to matching item |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Panel surface | `--z-color-background-surface` (raised fill; no drop shadow) |
| Item hover | `--z-color-background-subtle` |
| Item selected | `--z-color-background-selected` |
| Disabled label | `--z-color-text-disabled` |
| Separator | `--z-color-border-subtle` |
| Focus ring | `--z-color-focus-ring` |
| Trigger/item padding | `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x` |
| Panel padding | `--z-spacing-inset-box-tight` |
| Separator margin | `--z-spacing-inset-box-tight` |
| Control typography | `--z-text-control-*` |
| Overlay offset | `--z-spacing-offset-overlay` (default `sideOffset={4}`) |
| Content enter/exit | `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit` |

## Figma

| Figma | React |
| --- | --- |
| Menu / Trigger | `<MenuTrigger>` |
| Menu / Panel | `<MenuContent>` |
| Menu / Item | `<MenuItem>` |
| Menu / Divider | `<MenuSeparator>` |

## Notes

- **SSR:** Menu is safe for SSR. Portal content renders on the client when open.
- **Portal:** Yes — content renders in a portal.
- **Reduced motion:** Menu turns off content animations when `prefers-reduced-motion: reduce` is active.
- **Form:** Menu items are actions, not form fields.

## Examples

```tsx
<Menu>
  <MenuTrigger>Options</MenuTrigger>
  <MenuContent>
    <MenuItem selected>Edit</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem>Delete</MenuItem>
  </MenuContent>
</Menu>
```
