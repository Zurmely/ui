# ThemeController

## Purpose

ThemeController lets the user switch between light, dark, and system color themes. ThemeController sets `data-theme` on the document root.

## Select when

- The app exposes an in-product theme preference control.
- Theme must follow the OS preference when set to system.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { ThemeController } from '@z-ui/react/theme-controller';
```

## Compose

Use `ThemeController` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `value` | for light, dark, system. |
| `defaultValue` | for light, dark, system; default is system. |
| `onChange` | to change behavior. |
| `storageKey` | for string \; default is false. |

## Style with tokens

- **Container:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-radius-container`
- **Option:** `--z-text-control-*`, `--z-color-text-secondary`, `.primary` on hover
- **Selected:** `--z-color-background-primary-subtle`, `--z-color-border-primary`, `--z-color-text-primary`
- **Spacing:** `--z-spacing-inset-box-tight`, `--z-spacing-inset-control-compact-*`, `--z-spacing-gap-inline-tight`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Product policy fixes the theme with no user override.
- A single binary toggle is enough. Use this control or a custom toggle. Connect the toggle to `applyTheme`.
- Uncontrolled ThemeController reads and writes `localStorage` under `storageKey` (default `z-ui-theme`). Pass `storageKey={false}` to disable. Controlled apps can still use `readStoredTheme` / `writeStoredTheme` with `onChange`.
- Do not recreate `ThemeController` with raw HTML and one-off CSS when this component fits the task.

## Related

- `AccessibilityController` — Controls for contrast, motion, transparency, and link underline accessibility...

## Human doc

[ThemeController.md](../../src/components/theme-controller/ThemeController.md)
