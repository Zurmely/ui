# AccessibilityController

## Overview

AccessibilityController lets the user override contrast, motion, transparency, and link underline preferences.

It sets `data-*` attributes on the document root.

## When to use

**Use when:**

- The app exposes in-product accessibility settings.
- Preferences must follow the OS when set to system.

**Do not use when:**

- Product policy fixes accessibility with no user override.
- A settings page can call `applyAccessibilityPreferences` directly.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { AccessibilityController } from '@z-ux/ui/accessibility';
```

## API

| Prop | Type | Default |
| --- | --- | --- |
| `value` | `AccessibilityPreferences` | — |
| `defaultValue` | `AccessibilityPreferences` | Partial objects merge with `{ contrast/motion/transparency: 'system', linkUnderline: 'auto' }` |
| `onChange` | `(preferences) => void` | — |

### Preference keys

| Key | Values | OS signal |
| --- | --- | --- |
| `contrast` | `system`, `standard`, `high` | `prefers-contrast: more` |
| `motion` | `system`, `full`, `reduced` | `prefers-reduced-motion: reduce` |
| `transparency` | `system`, `full`, `reduced` | `prefers-reduced-transparency: reduce` |
| `linkUnderline` | `auto`, `always` | none |

### Data attributes

- `data-contrast`, `data-motion`, `data-transparency`, `data-link-underline` on `document.documentElement`
- `data-value` and `data-selected` on each option button

## Accessibility

Each flag group is a radiogroup with a visible label. Option buttons have visible text labels.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Moves focus between options |
| `Space` / `Enter` | Selects focused option |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Group label | `--z-text-label-*`, `--z-color-text-secondary` |
| Container | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-radius-container` |
| Option | `--z-text-control-*`, `--z-color-text-secondary` |
| Selected | `--z-color-background-primary-subtle`, `--z-color-border-strong` |

## Figma

| Accessibility settings | `AccessibilityController` |

## Notes

- **SSR:** Resolves `system` to standard/full when `window` is unavailable.
- **Persistence:** Does not write to storage. Persist `onChange` in app state or `localStorage` if needed.
- **Scope:** Flags apply at the document root only. See [ACCESSIBILITY-SEMANTICS.md](../../../../ACCESSIBILITY-SEMANTICS.md).

## Examples

```tsx
<AccessibilityController defaultValue={{ contrast: 'system', motion: 'system' }} />
<AccessibilityController value={prefs} onChange={setPrefs} />
```
