# ThemeController

## Overview

ThemeController lets the user switch between light, dark, and system color themes.

ThemeController sets `data-theme` on the document root.

## When to use

**Use when:**

- The app exposes an in-product theme preference control.
- Theme must follow the OS preference when set to system.

**Do not use when:**

- Product policy fixes the theme with no user override.
- A single binary toggle is enough. Use this control or a custom toggle. Connect the toggle to `applyTheme`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { ThemeController } from '@z-ux/ui/theme-controller';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `value` | `light`, `dark`, `system` | — |
| `defaultValue` | `light`, `dark`, `system` | `system` |
| `onChange` | `(theme) => void` | — |
| `storageKey` | `string` \| `false` | `z-ui-theme` |

### Data attributes

- `data-value` on each option
- `data-selected` on the active option

## Accessibility

The radiogroup uses the label `"Theme"`. Each option button has a visible text label.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Moves focus between options |
| `Space` / `Enter` | Selects focused option |
| Arrow keys | Not implemented; use Tab between three options |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Container | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-radius-container` |
| Option | `--z-text-control-*`, `--z-color-text-secondary`, `.primary` on hover |
| Selected | `--z-color-background-primary-subtle`, `--z-color-border-primary`, `--z-color-text-primary` |
| Spacing | `--z-spacing-inset-box-tight`, `--z-spacing-inset-control-compact-*`, `--z-spacing-gap-inline-tight` |

## Figma

| Figma | React |
| --- | --- |
| Theme Controller | `<ThemeController />` |

## Notes

- **SSR:** Defaults to `light` when resolving `system` without `window`. Stored preference is read only in the browser.
- **Portal:** No.
- **Persistence:** Uncontrolled ThemeController reads and writes `localStorage` under `storageKey` (default `z-ui-theme`). Pass `storageKey={false}` to disable. Controlled apps can still use `readStoredTheme` / `writeStoredTheme` with `onChange`.

## Examples

```tsx
<ThemeController defaultValue="system" onChange={(theme) => console.log(theme)} />
<ThemeController value={theme} onChange={setTheme} />
<ThemeController storageKey={false} />
```
