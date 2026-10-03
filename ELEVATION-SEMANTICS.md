# Z-UI Elevation Semantics

**Status:** Draft  
**Audience:** Designers and developers  
**Related:** [PRD.md](./PRD.md), [`elevation.css`](./elevation.css), [COLOR-SEMANTICS.md](./COLOR-SEMANTICS.md)

This document defines how **elevation semantics** work in Z-UI: purpose-based tokens for separating surfaces in space. **Depth is expressed with background structure fills** (`color.background.canvas`, `color.background.surface`, `color.background.subtle`), not drop shadows. Overlays use a lighter `surface` fill on the page; modals and drawers add a flat `overlay.scrim` behind the panel.

---

## Gabriel's rule

The page is the background. Don't put text in a surface, and don't put a surface inside a surface.

A lighter fill is only for something that actually floats, like a dialog, a menu, or a card that holds an action. If the parent is already raised, the child stays on that same fill. The first lift is that one lighter step, not a border and not a second level.

---

## 1. Why elevation semantics exist

Semantic elevation answers: *"How should this panel read against the page?"* or *"What halo separates this node from its background?"*

| Layer | Answers | Example | Who uses it |
| --- | --- | --- | --- |
| **Structure (color)** | Page vs raised vs sunk wells | `background.canvas`, `background.surface`, `background.subtle` | Designers & developers (default) |
| **Semantic** | Outline halos and reserved roles | `elevation.ring` | Designers & developers |

**Rules:**

1. **Do not** use drop shadows for depth in product UI. Floating UI separates from the page by **one lighter fill step** only (`background.surface` on `background.canvas`).
2. Use `background.surface` only for UI that actually floats (dialog, menu, popover, select menu, toast, calendar, drawer, and cards that hold an action). Do not wrap body copy or layout regions in `background.surface` on the page.
3. Do not nest `background.surface` inside `background.surface`. On a raised parent, children stay on that same fill. Sunk control wells use `background.subtle` (darker fill, not a second raised level; see `control-on-surface.css`).
4. Use `elevation.ring` for outline-style halos that separate a node from its background (timeline marker). It is not a drop shadow.
5. Focus rings use `color.focus.ring` / shared focus foundations (`elevation.ring` is not a substitute for `:focus-visible`).
6. `elevation.raised`, `elevation.overlay`, and `elevation.modal` resolve to **`none`** — kept for API stability; do not apply `box-shadow` for depth.

---

## 2. Structure ladder (fill-based depth)

Light and dark use the **same semantic names**; primitive steps differ so “lighter than page” and “darker than page” stay true in both themes.

| Role | Semantic token | Light (`neutral`) | Dark (`neutral`) |
| --- | --- | --- | --- |
| Page | `color.background.canvas` | `100` | `100` |
| Raised (cards, overlays) | `color.background.surface` | `50` (lighter than page) | `200` (lighter than page) |
| Sunk wells | `color.background.subtle` | `200` (darker than page) | `50` (darker than page) |
| Quiet disabled / skeleton | `color.background.muted` | `300` | `300` |

Modal and drawer panels use `background.surface` on top of `color.overlay.scrim` (flat dimmer, no glow).

---

## 3. Semantic elevation roles

| Token path | CSS variable | Value | Use |
| --- | --- | --- | --- |
| `elevation.raised` | `--z-elevation-raised` | `none` | Reserved; depth via `background.surface` on canvas |
| `elevation.overlay` | `--z-elevation-overlay` | `none` | Reserved; floating panels use `background.surface` |
| `elevation.modal` | `--z-elevation-modal` | `none` | Reserved; dialog/drawer panel + flat scrim |
| `elevation.ring` | `--z-elevation-ring` | `0 0 0 2px var(--z-color-background-surface)` | Timeline node halo |

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
| `purpose` | Why this token exists | `raised`, `overlay`, `modal`, `ring` |

### 4.2 CSS variable mapping

| Semantic path | CSS variable |
| --- | --- |
| `elevation.raised` | `--z-elevation-raised` |
| `elevation.overlay` | `--z-elevation-overlay` |
| `elevation.modal` | `--z-elevation-modal` |
| `elevation.ring` | `--z-elevation-ring` |

---

## 5. Authoring guidance

### 5.1 Raised and floating surfaces

Use structure background tokens only:

```css
.z-card {
  background-color: var(--z-color-background-surface);
}

.z-menu__content {
  background-color: var(--z-color-background-surface);
}
```

Do **not** add `box-shadow` for lift. Do **not** use elevation tokens for text shadows or inset shadows.

### 5.2 Depth stack recipe

```css
.page {
  background: var(--z-color-background-canvas);
}

.card {
  background: var(--z-color-background-surface);
}

.card .z-text-field {
  background: var(--z-color-background-subtle);
}

.dialog__scrim {
  background: var(--z-color-overlay-scrim);
}

.dialog__content {
  background: var(--z-color-background-surface);
}
```

---

## 6. Component adoption matrix

| Component | Depth mechanism | Tokens |
| --- | --- | --- |
| Card (action grouping on canvas) | Raised fill | `background.surface` |
| Select (content) | Raised fill | `background.surface` |
| Menu (content) | Raised fill | `background.surface` |
| Popover (content) | Raised fill | `background.surface` |
| Toast | Raised fill | `background.surface` |
| Calendar | Raised fill | `background.surface` |
| Dialog (content) | Raised fill + scrim | `background.surface`, `overlay.scrim` |
| Drawer (content) | Raised fill + scrim | `background.surface`, `overlay.scrim` |
| Floating action button | Surface / subtle fills | `background.*` per variant |
| Timeline (node) | Halo ring | `elevation.ring` |

Components without a listed role should not apply drop shadows.

---

## 7. Import and override

Import alongside other token stylesheets:

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import '@z-ux/tokens/elevation.css';
```

Override structure at the application root when theming; do not reintroduce shadow-based depth without a documented exception.

---

## 8. Figma parity

Use the same semantic names in Figma variables and CSS custom properties:

| Figma variable | CSS variable |
| --- | --- |
| `color/background/canvas` | `--z-color-background-canvas` |
| `color/background/surface` | `--z-color-background-surface` |
| `color/background/subtle` | `--z-color-background-subtle` |
| `elevation/ring` | `--z-elevation-ring` |

Figma should express depth with fill steps, not drop shadow effects.
