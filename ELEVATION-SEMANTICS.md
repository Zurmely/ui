# Z-UI Elevation Semantics

**Status:** Draft  
**Audience:** Designers and developers  
**Related:** [PRD.md](./PRD.md), [`elevation.css`](./elevation.css)

This document defines how **elevation semantics** work in Z-UI: purpose-based shadow tokens that keep surface depth consistent across components, support light and dark themes, and map cleanly between Figma and code.

---

## 1. Why elevation semantics exist

Primitive shadow values answer: *"What is shadow step 2?"*  
Semantic elevation answers: *"How much lift should a dropdown have?"* or *"What depth does a modal need?"*

| Layer | Answers | Example | Who uses it |
| --- | --- | --- | --- |
| **Primitive** | Raw shadow values | `shadow.1`, `shadow.2` | Theme authors only |
| **Semantic** | UI purpose | `elevation.raised`, `elevation.overlay` | Designers & developers (default) |

**Rules:**

1. Components **must** consume semantic elevation tokens — never raw primitives in component styles.
2. Elevation tokens **must** define light and dark theme values.
3. Use `elevation.ring` for outline-style halos that separate a node from its background; use `elevation.raised` through `elevation.modal` for drop shadows.
4. Do not combine multiple elevation roles on one element unless documented (for example, `elevation.ring` on a timeline node that also sits on a raised surface).

---

## 2. Primitive shadow scale

| Token path | CSS variable | Light value | Dark value | Use |
| --- | --- | --- | --- | --- |
| `shadow.1` | `--shadow-1` | `0 1px 2px rgb(0 0 0 / 0.04)` | `0 1px 2px rgb(0 0 0 / 0.16)` | Subtle lift |
| `shadow.2` | `--shadow-2` | `0 2px 8px rgb(0 0 0 / 0.06)` | `0 2px 8px rgb(0 0 0 / 0.22)` | Raised surfaces |
| `shadow.3` | `--shadow-3` | `0 4px 12px rgb(0 0 0 / 0.08)` | `0 4px 12px rgb(0 0 0 / 0.28)` | Floating overlays |
| `shadow.4` | `--shadow-4` | `0 8px 24px rgb(0 0 0 / 0.12)` | `0 8px 24px rgb(0 0 0 / 0.34)` | Modal depth |

---

## 3. Semantic elevation roles

| Token path | CSS variable | Maps to | Use |
| --- | --- | --- | --- |
| `elevation.raised` | `--z-elevation-raised` | `shadow.2` | Cards, subtle lift above canvas |
| `elevation.overlay` | `--z-elevation-overlay` | `shadow.3` | Select content, Menu, Popover, Tooltip, Toast |
| `elevation.modal` | `--z-elevation-modal` | `shadow.4` | Dialog, Drawer |
| `elevation.ring` | `--z-elevation-ring` | `0 0 0 2px var(--z-color-background-surface)` | Timeline node halo, focus-adjacent rings |

`elevation.ring` is a color-aware outline shadow, not a drop shadow. It uses `--z-color-background-surface` so the halo separates from adjacent fills in both themes.

---

## 4. Naming conventions

### 4.1 Elevation token path

```text
elevation.{purpose}
```

| Segment | Purpose | Examples |
| --- | --- | --- |
| `elevation` | Namespace for elevation semantics | — |
| `purpose` | Why this depth exists | `raised`, `overlay`, `modal`, `ring` |

### 4.2 CSS variable mapping

| Semantic path | CSS variable |
| --- | --- |
| `elevation.raised` | `--z-elevation-raised` |
| `elevation.overlay` | `--z-elevation-overlay` |
| `elevation.modal` | `--z-elevation-modal` |
| `elevation.ring` | `--z-elevation-ring` |

---

## 5. Authoring guidance

### 5.1 Property selection

Apply elevation with `box-shadow` only:

```css
.z-card {
  box-shadow: var(--z-elevation-raised);
}

.z-select__content {
  box-shadow: var(--z-elevation-overlay);
}
```

Do **not** use elevation tokens for text shadows or inset shadows in v1.

### 5.2 Theme behavior

Elevation primitives resolve per theme in `elevation.css`. Components reference semantic aliases only; theme switching requires no component-level selectors.

### 5.3 Depth stack recipe

Layer surfaces from canvas through modal using one semantic role per element:

```css
.page {
  background: var(--z-color-background-canvas);
}

.card {
  box-shadow: var(--z-elevation-raised);
}

.menu__content {
  box-shadow: var(--z-elevation-overlay);
}

.dialog__content {
  box-shadow: var(--z-elevation-modal);
}
```

---

## 6. Component adoption matrix

| Component | Elevation role | CSS variable |
| --- | --- | --- |
| Card | `elevation.raised` | `--z-elevation-raised` |
| Select (content) | `elevation.overlay` | `--z-elevation-overlay` |
| Menu (content) | `elevation.overlay` | `--z-elevation-overlay` |
| Popover (content) | `elevation.overlay` | `--z-elevation-overlay` |
| Tooltip (content) | `elevation.overlay` | `--z-elevation-overlay` |
| Toast | `elevation.overlay` | `--z-elevation-overlay` |
| Dialog (content) | `elevation.modal` | `--z-elevation-modal` |
| Drawer (content) | `elevation.modal` | `--z-elevation-modal` |
| Timeline (node) | `elevation.ring` | `--z-elevation-ring` |

Components without a listed role should not apply drop shadows unless a new semantic role is approved.

---

## 7. Import and override

Import alongside other token stylesheets:

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import '@z-ui/tokens/elevation.css';
```

Override at the application root or a scoped subtree:

```css
[data-theme='compact'] {
  --z-elevation-overlay: 0 6px 16px rgb(0 0 0 / 0.14);
}
```

---

## 8. Figma parity

Use the same semantic names in Figma variables and CSS custom properties:

| Figma variable | CSS variable |
| --- | --- |
| `elevation/raised` | `--z-elevation-raised` |
| `elevation/overlay` | `--z-elevation-overlay` |
| `elevation/modal` | `--z-elevation-modal` |
| `elevation/ring` | `--z-elevation-ring` |

Figma effect styles should reference semantic elevation variables, not ad-hoc shadow values.
