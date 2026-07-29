# AccessibilityController

## Purpose

AccessibilityController lets the user override contrast, motion, transparency, and link underline preferences. It sets `data-*` attributes on the document root.

## Select when

- The app exposes in-product accessibility settings.
- Preferences must follow the OS when set to system.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { AccessibilityController } from '@z-ui/react/accessibility';
```

## Compose

Use `AccessibilityController` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `value` | for AccessibilityPreferences. |
| `defaultValue` | for AccessibilityPreferences; default is all system / auto. |
| `onChange` | to change behavior. |

## Style with tokens

- **Group label:** `--z-text-label-*`, `--z-color-text-secondary`
- **Container:** `--z-color-background-surface`, `--z-color-border-subtle`, `--z-radius-container`
- **Option:** `--z-text-control-*`, `--z-color-text-secondary`
- **Selected:** `--z-color-background-primary-subtle`, `--z-color-border-strong`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Product policy fixes accessibility with no user override.
- A settings page can call `applyAccessibilityPreferences` directly.
- Does not write to storage. Persist `onChange` in app state or `localStorage` if needed.
- Flags apply at the document root only. See [ACCESSIBILITY-SEMANTICS.md](../../../../ACCESSIBILITY-SEMANTICS.md).
- Do not recreate `AccessibilityController` with raw HTML and one-off CSS when this component fits the task.

## Related

- `ThemeController` — Segmented control for switching light, dark, and system theme preferences

## Human doc

[AccessibilityController.md](../../src/components/accessibility/AccessibilityController.md)
