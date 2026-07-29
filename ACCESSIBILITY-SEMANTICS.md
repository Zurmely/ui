# Z-UI Accessibility Semantics

**Status:** Draft  
**Audience:** Designers and developers  
**Related:** [COLOR-SEMANTICS.md](./COLOR-SEMANTICS.md), [MOTION-SEMANTICS.md](./MOTION-SEMANTICS.md), [TEXT-SEMANTICS.md](./TEXT-SEMANTICS.md), [SIZES-SEMANTICS.md](./SIZES-SEMANTICS.md)

This document defines **accessibility flags** — cross-cutting preferences that adjust semantic tokens and component behavior without changing component APIs.

---

## 1. Why accessibility flags exist

Theme (`data-theme`) answers: *“Light or dark?”*  
Accessibility flags answer: *“Does this user need stronger contrast, less motion, opaque overlays, or always-underlined links?”*

Components consume semantic tokens. Flags override those tokens at the document root so every component benefits without per-component changes.

---

## 2. Flag table

| Attribute | Values | OS default | Token file |
| --- | --- | --- | --- |
| `data-contrast` | `high`, `standard` | `@media (prefers-contrast: more)` | `colors.css`, `sizes.css` |
| `data-motion` | `reduced`, `full` | `@media (prefers-reduced-motion: reduce)` | `motion.css` |
| `data-transparency` | `reduced`, `full` | `@media (prefers-reduced-transparency: reduce)` | `colors.css` |
| `data-link-underline` | `always`, `auto` | None (`auto` is default) | `text.css` |

**Absence of an attribute means “follow the OS.”** An explicit value always wins over the media query.

---

## 3. Activation pattern

Each flag uses the same CSS pattern: an OS media-query block and a matching attribute block declare identical properties.

```css
@media (prefers-contrast: more) {
  :root:not([data-contrast='standard']) {
    /* overrides */
  }
}

:root[data-contrast='high'] {
  /* same overrides */
}
```

React helpers (`applyAccessibilityPreferences`) set attributes on `document.documentElement`. When a preference is `system`, the attribute is removed so CSS falls back to the media query.

---

## 4. Per-flag overrides

### 4.1 High contrast (`data-contrast="high"`)

Raises border and text separation in both light and dark themes:

- Border subtle, default, and strong step toward darker primitives
- Text secondary and tertiary collapse toward text primary
- Text disabled and border disabled step up for legibility
- Focus ring width increases (`--z-focus-ring-width`: 2px → 3px)

Validated against WCAG AAA contrast floors via `packages/tokens/scripts/contrast.mjs`.

### 4.2 Reduced motion (`data-motion="reduced"`)

Zeros interaction, layout, enter, and exit motion durations:

- `--z-motion-duration-interaction`
- `--z-motion-duration-layout`
- `--z-motion-duration-enter`
- `--z-motion-duration-exit`

`--z-motion-duration-continuous` stays non-zero. Components with `@keyframes` or looping animation still require a component-level `animation: none` fallback (see MOTION-SEMANTICS.md).

JS-driven motion must call `prefersReducedMotion()`, which reads `data-motion` before falling back to the media query.

### 4.3 Reduced transparency (`data-transparency="reduced"`)

Replaces semi-transparent scrims with fully opaque values:

- `--z-color-overlay-scrim` → opaque neutral (no alpha)

Dialog and Drawer scrims consume this token; no component CSS changes are required.

### 4.4 Always underline links (`data-link-underline="always"`)

Sets `--z-text-link-decoration: underline`. Link, Breadcrumb, and Navbar link styles consume this token so non-underlined variants become underlined.

---

## 5. Scoping limitation (v1)

Flags apply at the **document root only** (`document.documentElement`).

`data-theme` may be set on any ancestor subtree. A scoped `data-theme` subtree under a high-contrast root is **unsupported** in v1 — the subtree would re-declare base theme colors and override high-contrast tokens.

---

## 6. React API

| Export | Purpose |
| --- | --- |
| `AccessibilityController` | UI for toggling all four flags |
| `applyAccessibilityPreferences` | Apply preferences to `document.documentElement` |
| `resolveAccessibilityPreferences` | Resolve `system` preferences from OS media queries |
| `prefersReducedMotion` | SSR-safe motion check (attribute + media query) |

Import from `@z-ui/react` or `@z-ui/react/accessibility`.

---

## 7. Do and don't

| Do | Don't |
| --- | --- |
| Consume semantic tokens in components | Hardcode contrast, motion, or transparency values |
| Use `applyAccessibilityPreferences` at app startup | Set primitive CSS variables in component styles |
| Honor `prefersReducedMotion()` in JS-driven motion | Animate focus rings or outlines |
| Run `pnpm --filter @z-ui/tokens contrast` after color changes | Edit `packages/tokens/dist/**` directly |
