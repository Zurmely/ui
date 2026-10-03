# Navbar

## Overview

Navbar shows a top application bar. The root is a `<header>` that wraps a `<nav>` with `aria-label`.

## When to use

**Use when:**

- Primary site navigation must stay visible at the top of the page.
- Branding and nav links belong in a shared header.

**Do not use when:**

- Navigation applies only to a subsection. Use `Breadcrumbs` or `Tabs`.
- Primary actions belong in a floating control. Use `FloatingActionButton`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Navbar, NavbarLogo, NavbarContent, NavbarItem, NavbarItemIcon } from '@z-ux/ui';
```

## API

| Prop | Component | Values | Default |
| --- | --- | --- | --- |
| `label` | `Navbar` | `string` | `"Main navigation"` |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `NavbarLogo` | No | Logo or product name |
| `NavbarContent` | No | List of `NavbarItem` children |
| `NavbarItemIcon` | No | Optional decorative icon inside a nav link or button |

## Accessibility

Set `label` when `"Main navigation"` is not descriptive enough. Mark the current page link with `aria-current="page"`.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Moves focus through navbar links and buttons |
| `Enter` | Activates the focused link or button |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Bar surface | `--z-color-background-surface`, `--z-color-border-subtle` |
| Primary | `--z-text-title-*`, `--z-color-text-primary` |
| Items | `--z-text-control-*`, `--z-color-background-subtle`, `--z-color-background-selected` |
| Nav padding | `--z-spacing-inset-box-compact`, `--z-spacing-inset-box-comfortable` |

## Figma

| Figma | React |
| --- | --- |
| Navbar / Default | `<Navbar>` |
| Navbar / Primary | `<NavbarLogo>` |
| Navbar / Item | `<NavbarItem>` |

## Notes

- **SSR:** Navbar is safe for SSR. Navbar has no browser globals at import.
- **Portal:** No.
- **Form:** Navbar is not a form control.

## Examples

```tsx
<Navbar>
  <NavbarLogo>Z-UI</NavbarLogo>
  <NavbarContent>
    <NavbarItem>
      <a href="/docs" aria-current="page">Docs</a>
    </NavbarItem>
  </NavbarContent>
</Navbar>
```
