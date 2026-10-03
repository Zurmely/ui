# Z-UI Size Semantics

**Status:** Draft  
**Audience:** Designers and developers  
**Related:** [PRD.md](./PRD.md), [`sizes.css`](./sizes.css)

This document defines how **size semantics** work in Z-UI: purpose-based spacing and radius tokens that stay stable across themes, map cleanly between Figma and code, and keep layout rhythm and corner treatment consistent across components.

---

## 1. Why size semantics exist

Primitive sizes answer: *"How big is step 2?"* or *"What is radius 1?"*  
Semantic sizes answer: *"How much space should sit between form label and input?"* or *"What corner radius should a dialog use?"*

| Layer | Answers | Example | Who uses it |
| --- | --- | --- | --- |
| **Primitive** | Raw scale values | `space.1`, `radius.2` | Theme authors only |
| **Semantic** | UI purpose | `spacing.inset.container`, `radius.control` | Designers & developers (default) |
| **Component** | One-off needs | `spacing.select.item.padding-start` | Component authors when semantics are not enough |

**Rules:**

1. Components **must** consume semantic or component size tokens — never raw primitives in component styles.
2. Spacing values **must** follow the 8px grid; `space.0-5` (4px) is the only allowed half-step for dense inline UI.
3. The same semantic names are used in Figma variables and CSS custom properties unless a documented platform exception is required.
4. Size tokens are **theme-independent** — they do not vary between light and dark modes.

---

## 2. Spacing grid

### 2.1 Base unit

- **Base unit:** 8px = `0.5rem` at a 16px root font size.
- **Half-step:** 4px = `0.25rem` — use only for tight inline rhythm (tooltip padding, badge sm, menu viewport inset).
- **Authoring unit:** `rem` for zoom and reflow compatibility.

### 2.2 Spacing primitive scale

| Token path | CSS variable | Value | px |
| --- | --- | --- | --- |
| `space.0` | `--z-space-0` | `0` | 0 |
| `space.0-5` | `--z-space-0-5` | `0.25rem` | 4 |
| `space.1` | `--z-space-1` | `0.5rem` | 8 |
| `space.2` | `--z-space-2` | `1rem` | 16 |
| `space.3` | `--z-space-3` | `1.5rem` | 24 |
| `space.4` | `--z-space-4` | `2rem` | 32 |
| `space.5` | `--z-space-5` | `2.5rem` | 40 |
| `space.6` | `--z-space-6` | `3rem` | 48 |
| `space.8` | `--z-space-8` | `4rem` | 64 |
| `space.10` | `--z-space-10` | `5rem` | 80 |
| `space.12` | `--z-space-12` | `6rem` | 96 |
| `space.16` | `--z-space-16` | `8rem` | 128 |

---

## 3. Radius scale

### 3.1 Radius primitive scale

| Token path | CSS variable | Value | px |
| --- | --- | --- | --- |
| `radius.0` | `--z-radius-0` | `0` | 0 |
| `radius.1` | `--z-radius-1` | `0.25rem` | 4 |
| `radius.2` | `--z-radius-2` | `0.375rem` | 6 |
| `radius.3` | `--z-radius-3` | `0.5rem` | 8 |
| `radius.full` | `--z-radius-full` | `9999px` | pill |

`radius.circle` (`50%`) is semantic-only — percentage rounding depends on the element's box.

---

## 4. Naming conventions

### 4.1 Spacing token path

```text
spacing.{category}.{purpose}[.{variant}]
```

| Segment | Purpose | Examples |
| --- | --- | --- |
| `spacing` | Namespace for spacing semantics | — |
| `category` | What the space does | `inset`, `gap`, `stack`, `offset` |
| `purpose` | Why this space exists | `container`, `component`, `control`, `form` |
| `variant` | Density or axis (when needed) | `compact`, `comfortable`, `x`, `y` |

### 4.2 Radius token path

```text
radius.{purpose}[.{variant}]
```

| Segment | Purpose | Examples |
| --- | --- | --- |
| `radius` | Namespace for corner-radius semantics | — |
| `purpose` | What is being rounded | `control`, `surface`, `container`, `pill`, `circle` |
| `variant` | Density (when needed) | `compact` |

### 4.3 CSS custom properties

Dot paths become kebab-case CSS variables under a stable prefix:

| Semantic token | CSS custom property |
| --- | --- |
| `spacing.inset.box.tight` | `--z-spacing-inset-box-tight` |
| `spacing.inset.box.compact` | `--z-spacing-inset-box-compact` |
| `spacing.inset.box` | `--z-spacing-inset-box` |
| `spacing.inset.box.comfortable` | `--z-spacing-inset-box-comfortable` |
| `spacing.inset.container` | `--z-spacing-inset-container` |
| `spacing.gap.component` | `--z-spacing-gap-component` |
| `spacing.stack.form` | `--z-spacing-stack-form` |
| `spacing.offset.overlay` | `--z-spacing-offset-overlay` |
| `radius.control` | `--z-radius-control` |
| `radius.control.compact` | `--z-radius-control-compact` |
| `radius.surface` | `--z-radius-surface` |
| `radius.container` | `--z-radius-container` |
| `radius.pill` | `--z-radius-pill` |
| `radius.circle` | `--z-radius-circle` |

Primitives use `--z-space-*` / `--z-radius-*`; spacing semantics use `--z-spacing-*`; radius semantics reuse the `--z-radius-*` prefix with purpose names.

### 4.4 Figma variables

- Collections: **Spacing / Semantic** and **Radius / Semantic** (primitives in **Spacing / Primitive** and **Radius / Primitive**)
- Modes: theme-agnostic (sizes do not vary by light/dark)
- Names: match the semantic path (`spacing/inset/container`, `radius/control` — pick one delimiter scheme and keep it in the parity manifest)
- Variables alias **primitive** variables; components bind only to **semantic** variables

---

## 5. Spacing semantic categories

### 5.1 `inset` — padding inside a boundary

**Selection rule:** Use `spacing.inset.control.*` for text controls where the label runs horizontally (buttons, inputs, menu items). Use `spacing.inset.box.*` for anything that reads as a box (list items, cards, alerts, toolbars). Full-bleed bars (navbar) may stay asymmetric with `inset.box.compact` / `inset.box.comfortable` on block / inline axes.

| Token | Use when… |
| --- | --- |
| `spacing.inset.control.compact-y` / `.compact-x` | Dense controls (tooltip, compact triggers) |
| `spacing.inset.control.y` / `.x` | Standard text fields, buttons, menu items |
| `spacing.inset.control.comfortable-y` / `.comfortable-x` | Large controls and generous tap targets |
| `spacing.inset.box.tight` | 4px symmetric box padding (menu viewport, tab list, theme controller) |
| `spacing.inset.box.compact` | 8px symmetric box padding (dense list items, toolbars) |
| `spacing.inset.box` | 16px symmetric box padding (list items, cards, alerts, popovers) |
| `spacing.inset.box.comfortable` | 24px symmetric box padding (dialogs, drawers, spacious list items) |
| `spacing.inset.compact` | Alias of `spacing.inset.box.tight` |
| `spacing.inset.panel` | Alias of `spacing.inset.box` |
| `spacing.inset.container` | Alias of `spacing.inset.box.comfortable` |
| `spacing.inset.tooltip.y` / `.x` | Tooltip content padding |

### 5.2 `gap` — space between siblings in a flex/grid layout

| Token | Use when… |
| --- | --- |
| `spacing.gap.inline-tight` | Icon+label in dense lists, tab triggers |
| `spacing.gap.inline` | Related inline elements (select value + icon) |
| `spacing.gap.component` | Sections inside a component (dialog title + body) |
| `spacing.gap.section` | Space between component groups on a page |
| `spacing.gap.page-section` | Major page regions |

### 5.3 `stack` — vertical rhythm (margin or stack gap)

| Token | Use when… |
| --- | --- |
| `spacing.stack.form` | Label, description, and error in a field (`space.1` / 8px) |
| `spacing.stack.control` | Radio/checkbox item lists |
| `spacing.stack.component` | Content below a tab list |
| `spacing.stack.section` | Between sections in a form or settings page |
| `spacing.stack.page-section` | Between major page blocks |

### 5.4 `offset` — separation from an anchor (overlays)

| Token | Use when… |
| --- | --- |
| `spacing.offset.overlay` | Floating overlay distance from trigger (menu, popover, tooltip). Default Radix `sideOffset` is `4` to match this token. |

---

## 6. Radius semantic categories

**Nested radius rule:** When a child sits within one 4px step of the container edge, the container radius should equal the child radius plus the container padding (`outer = inner + padding`). Example: 4px padding + 4px child radius → 8px container radius (`radius.container`), not 6px (`radius.surface`). Containers padded 8px or more are visually detached from their children and choose radius by role.

| Token | CSS variable | Use when… |
| --- | --- | --- |
| `radius.control.compact` | `--z-radius-control-compact` | Dense controls and list items (checkbox, menu item, tab trigger, tooltip, dialog close) |
| `radius.control` | `--z-radius-control` | Standard text fields, textareas, select triggers |
| `radius.surface` | `--z-radius-surface` | Detached floating panels (alert, toast, popover, toolbar) |
| `radius.container` | `--z-radius-container` | Large containers and tight-nested panels (dialog, drawer, menu content, tabs list, card, table) |
| `radius.pill` | `--z-radius-pill` | Fully rounded tracks (switch) |
| `radius.circle` | `--z-radius-circle` | Circular elements (radio, spinner, switch thumb) |

---

## 7. Layout examples

```text
Page
├── [spacing.gap.page-section]
├── Section
│   ├── [spacing.gap.section]
│   ├── Field (stack: spacing.stack.form between label/input/error)
│   └── Button row (gap: spacing.gap.inline)
└── Dialog (inset: spacing.inset.container, gap: spacing.gap.component, radius: radius.container)
```

### 7.1 Recipes

These CSS snippets match the layout recipes in the docs app (`/foundations/sizes`).

**Form field stack** — `spacing.stack.form` between label, input, and helper:

```css
.field {
  display: flex;
  flex-direction: column;
  gap: var(--z-spacing-stack-form);
}
```

**Control density** — `spacing.inset.control.*` for horizontal text controls:

```css
.button--compact {
  padding: var(--z-spacing-inset-control-compact-y) var(--z-spacing-inset-control-compact-x);
}

.button--default {
  padding: var(--z-spacing-inset-control-y) var(--z-spacing-inset-control-x);
}

.button--comfortable {
  padding: var(--z-spacing-inset-control-comfortable-y)
    var(--z-spacing-inset-control-comfortable-x);
}
```

**Nested radius** — outer `radius.container`, inner `radius.control`:

```css
.dialog {
  padding: var(--z-spacing-inset-box);
  border-radius: var(--z-radius-container);
}

.dialog__close {
  border-radius: var(--z-radius-control);
}
```

**Overlay offset** — `spacing.offset.overlay` for floating content distance from trigger:

```css
.popover__content {
  margin-top: var(--z-spacing-offset-overlay);
}
```

---

## 8. What is NOT covered by size tokens yet

Do **not** use spacing or radius tokens for:

| Concern | Belongs to |
| --- | --- |
| Control width/height, icon box size | Sizing tokens (future) |
| `border-width`, `outline-width` | Border / focus-ring tokens |
| `inset: 0`, `top: 50%`, `translate()` | Positioning |
| Switch thumb `translateX` | Mechanical layout |
| `margin: -1px` (visually hidden) | Accessibility clipping pattern |
| `padding: 0` / `margin: 0` | UA resets |

---

## 9. Component token escape hatch

Use component tokens only when shared semantics cannot express the layout:

```text
spacing.inset.control.y          ← prefer
spacing.select.item.padding-start ← only for indicator reservation
```

Current component-scoped tokens:

| Token | CSS variable | Purpose |
| --- | --- | --- |
| `spacing.select.item.indicator-inset` | `--z-spacing-select-item-indicator-inset` | Absolute left position of the check indicator |
| `spacing.select.item.padding-start` | `--z-spacing-select-item-padding-start` | Left padding reserving indicator + icon width |

---

## 10. Consumption

### 10.1 Install

```bash
pnpm add @z-ux/tokens
```

### 10.2 Import

```tsx
import '@z-ux/tokens/sizes.css';
import '@z-ux/ui/styles.css';
```

Size tokens are **opt-in at the app layer** — React component CSS references semantic variables; the consuming app must import `sizes.css` (alongside `colors.css`).

### 10.3 Override at root

```css
:root {
  --z-spacing-inset-container: var(--z-space-4); /* denser dialogs app-wide */
  --z-radius-control: var(--z-radius-1); /* sharper inputs app-wide */
}
```

---

## 11. Accessibility

- Spacing supports touch targets and readable grouping but does **not** replace visible labels, focus rings, or disabled states.
- Prefer `spacing.inset.control` and comfortable sizes so interactive targets meet documented minimum sizes (44×44px where applicable).
- Do not reduce `spacing.stack.form` below the half-step without checking legibility for error/helper text.
- Radius does not affect accessibility by itself; keep focus rings visible on rounded controls.
- Focus ring width: `--z-focus-ring-width` (default `2px`, `3px` under high contrast) — see [ACCESSIBILITY-SEMANTICS.md](./ACCESSIBILITY-SEMANTICS.md).

---

## 12. Migration notes

Legacy hard-coded spacing values were normalized to the grid:

| Legacy | px | Migrated to |
| --- | --- | --- |
| `0.375rem` | 6 | `space.0-5` (4px) or `space.1` (8px) |
| `0.75rem` | 12 | `space.2` (16px) |
| `1.75rem` (select item start) | 28 | `space.3` (24px) via component token |

Legacy hard-coded radii:

| Legacy | Migrated to |
| --- | --- |
| `0.25rem` | `radius.control.compact` |
| `0.375rem` | `radius.control` or `radius.surface` |
| `0.5rem` | `radius.container` |
| `9999px` | `radius.pill` |
| `50%` | `radius.circle` |

`spacing.css` / `SPACING-SEMANTICS.md` were renamed to `sizes.css` / `SIZES-SEMANTICS.md`. Import `@z-ux/tokens/sizes.css` instead of `@z-ux/tokens/spacing.css`.

---

## 13. Open items

- Confirm Figma delimiter (`/` vs `.`) at schema freeze.
- Add sizing tokens (`size.control.md`, etc.) in a follow-up foundations pass.
- Add spacing audit coverage for `row-gap` / `column-gap` if components adopt them.
