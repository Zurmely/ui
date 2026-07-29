# Megamenu

## Overview

Megamenu shows a large dropdown panel for navigation. Megamenu builds on the Popover pattern.

## When to use

**Use when:**

- A top-level nav item is the trigger. Megamenu opens many links or feature categories in groups.
- A simple `Menu` surface is too small for the content.

**Do not use when:**

- You need only a short list of actions. Use `Menu`.
- Navigation stays visible on the page. Use `Navbar` or a sidebar.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import { Megamenu, MegamenuContent, MegamenuItem, MegamenuTrigger } from '@z-ui/react';
```

## API

| Prop | Component | Values | Default |
| --- | --- | --- | --- |
| `selected` | `MegamenuItem` | `boolean` | `false` |
| `open` / `defaultOpen` | `Megamenu` | `boolean` | uncontrolled |

### Data attributes

- `data-selected` on `MegamenuItem`

## Accessibility

Set visible trigger text or an explicit `aria-label` on `MegamenuTrigger`.

## Keyboard

| Key | Action |
| --- | --- |
| `Enter` / `Space` | Opens or activates the trigger |
| `Escape` | Closes the megamenu |
| `Tab` | Moves focus within the open panel |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Trigger/content surface | `--z-color-background-surface`, `--z-color-border-subtle` |
| Item hover/selected | `--z-color-background-subtle`, `--z-color-background-selected` |
| Control typography | `--z-text-control-*` |
| Content enter/exit | `--z-motion-duration-enter`, `--z-motion-easing-enter`, `--z-motion-duration-exit`, `--z-motion-easing-exit` |

## Figma

| Figma | React |
| --- | --- |
| Megamenu / Trigger | `<MegamenuTrigger>` |
| Megamenu / Content | `<MegamenuContent>` |
| Megamenu / Item | `<MegamenuItem>` |

## Notes

- **SSR:** Megamenu is safe for SSR. Radix renders the portal on the client when you open the menu.
- **Portal:** Yes — Megamenu portals the content.
- **Reduced motion:** Megamenu turns off content animations when `prefers-reduced-motion: reduce` is active.
- **Form:** Megamenu is not a form control.

## Examples

```tsx
<Megamenu>
  <MegamenuTrigger>Products</MegamenuTrigger>
  <MegamenuContent>
    <MegamenuItem href="/analytics">Analytics</MegamenuItem>
    <MegamenuItem href="/billing">Billing</MegamenuItem>
  </MegamenuContent>
</Megamenu>
```
