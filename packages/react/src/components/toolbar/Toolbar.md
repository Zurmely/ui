# Toolbar

## Overview

Toolbar groups related actions and controls in a single keyboard-navigable region with leading, center.

trailing areas.

## When to use

**Use when:**

- You group document, table, or panel actions.
- You need keyboard navigation with a roving tab index across controls.

**Do not use when:**

- You need a single action button (`Button`).
- You need navigation links (`ListItem as="a"` or `Navbar`).

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import { Toolbar, Button, Separator } from '@z-ux/ui';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `label` | `string` | Required accessible name (`aria-label`) |
| `orientation` | `horizontal`, `vertical` | Arrow key direction mapping |
| `data-orientation` | `horizontal`, `vertical` | Reflected on root |

### Slots

| Slot | Allowed components | Notes |
| --- | --- | --- |
| `leading` | `Button`, `IconButton`, `Separator`, `Filter`, `TextField`, `Select`, `Badge` | Start region; single or array |
| `children` | same as leading | Center region |
| `trailing` | same as leading | End region |

Slot enforcement is a **dev-time `console.warn`**, not a TypeScript error.

## Accessibility

You need to set `label`. Toolbar applies it as `aria-label` on the `role="toolbar"` container.

## Keyboard

| Key | Action |
| --- | --- |
| `ArrowRight` / `ArrowDown` | Focus next control (horizontal / vertical) |
| `ArrowLeft` / `ArrowUp` | Focus previous control |
| `Home` | Focus first control |
| `End` | Focus last control |

Roving `tabIndex` keeps one control in the tab order at a time.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Surface | `--z-color-background-surface`, `--z-color-border-subtle` |
| Padding | `--z-spacing-inset-box-compact` |
| Gap | `--z-spacing-gap-component`, `--z-spacing-gap-inline` |
| Radius | `--z-radius-surface` |

## Figma

| Figma | React |
| --- | --- |
| Toolbar / action bar | `Toolbar` |
| Orientation | `orientation` |

## Notes

- **SSR:** Safe. Focus seeding runs in `useEffect`.
- **Portal:** Child components (for example `Select`) can portal independently.
- **Form:** Slotted inputs and buttons participate in forms through their own APIs.

## Examples

```tsx
<Toolbar
  label="Document actions"
  leading={<Button variant="ghost" size="sm">Back</Button>}
  trailing={<IconButton aria-label="More options">⋯</IconButton>}
>
  <Button>Save</Button>
  <Separator orientation="vertical" />
  <Button variant="secondary">Cancel</Button>
</Toolbar>
```
