# Z-UI Text Semantics

**Status:** Draft  
**Audience:** Designers and developers  
**Related:** [PRD.md](./PRD.md), [`text.css`](./text.css)

This document defines how **text semantics** work in Z-UI: purpose-based typography tokens that stay stable across themes, map cleanly between Figma and code, and keep type hierarchy consistent across components.

---

## 1. Why text semantics exist

Primitive text values answer: *"What is font size step 3?"* or *"What is semibold weight?"*  
Semantic text roles answer: *"What type should a form label use?"* or *"What size should a dialog title be?"*

| Layer | Answers | Example | Who uses it |
| --- | --- | --- | --- |
| **Primitive** | Raw scale values | `font.size.3`, `font.weight.semibold` | Theme authors only |
| **Semantic** | UI purpose | `text.control`, `text.h2` | Designers & developers (default) |
| **Component** | One-off needs | (none yet) | Component authors when semantics are not enough |

**Rules:**

1. Components **must** consume semantic text tokens — never raw primitives in component styles.
2. Font sizes **must** use `rem` for zoom and reflow compatibility.
3. **12px (`font.size.1` / `0.75rem`) is the minimum font size** in the design system. Do not add primitives, semantic roles, or component styles below this floor.
4. The same semantic names are used in Figma variables and CSS custom properties unless a documented platform exception is required.
5. Text tokens are **theme-independent** — they do not vary between light and dark modes.
6. `--z-text-*` tokens control **typography** (family, size, weight, line-height). `--z-color-text-*` tokens control **foreground color** only.

---

## 2. Font family

### 2.1 Manrope (UI sans)

Z-UI ships Manrope as the default UI font. [`text.css`](./text.css) loads it via Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
```

Apply `font-optical-sizing: auto` and `font-style: normal` when setting family from tokens in component CSS.

Consumers who self-host fonts can remove the `@import` and override `--z-font-family-sans`.

### 2.2 Family primitives

| Token path | CSS variable | Value |
| --- | --- | --- |
| `font.family.sans` | `--z-font-family-sans` | `"Manrope", sans-serif` |
| `font.family.mono` | `--z-font-family-mono` | System monospace stack |

---

## 3. Font size scale

**Minimum size:** `font.size.1` (`0.75rem` / 12px) is the smallest step. No token, override, or component style may go below it.

| Token path | CSS variable | Value | px @16 |
| --- | --- | --- | --- |
| `font.size.1` | `--z-font-size-1` | `0.75rem` | 12 |
| `font.size.2` | `--z-font-size-2` | `0.875rem` | 14 |
| `font.size.3` | `--z-font-size-3` | `1rem` | 16 |
| `font.size.4` | `--z-font-size-4` | `1.125rem` | 18 |
| `font.size.5` | `--z-font-size-5` | `1.25rem` | 20 |
| `font.size.6` | `--z-font-size-6` | `1.5rem` | 24 |
| `font.size.7` | `--z-font-size-7` | `1.875rem` | 30 |
| `font.size.8` | `--z-font-size-8` | `2.25rem` | 36 |
| `font.size.9` | `--z-font-size-9` | `3rem` | 48 |

---

## 4. Font weight scale

| Token path | CSS variable | Value |
| --- | --- | --- |
| `font.weight.regular` | `--z-font-weight-regular` | `400` |
| `font.weight.medium` | `--z-font-weight-medium` | `500` |
| `font.weight.semibold` | `--z-font-weight-semibold` | `600` |
| `font.weight.bold` | `--z-font-weight-bold` | `700` |

Manrope supports variable weights 200–800; the primitive scale starts with the four weights used by semantic roles.

---

## 5. Line height scale

| Token path | CSS variable | Value |
| --- | --- | --- |
| `font.line-height.tight` | `--z-font-line-height-tight` | `1` |
| `font.line-height.snug` | `--z-font-line-height-snug` | `1.25` |
| `font.line-height.normal` | `--z-font-line-height-normal` | `1.5` |
| `font.line-height.relaxed` | `--z-font-line-height-relaxed` | `1.625` |

All line heights are unitless ratios.

---

## 6. Naming conventions

### 6.1 Semantic token path

```text
text.{role}.{property}
```

| Segment | Purpose | Examples |
| --- | --- | --- |
| `text` | Namespace for typography semantics | — |
| `role` | What the text represents | `display`, `h1`–`h6`, `body`, `control`, `label`, `caption`, `title` |
| `property` | Typography axis | `font-family`, `size`, `weight`, `line-height` |

### 6.2 CSS custom properties

Dot paths become kebab-case CSS variables under a stable prefix:

| Semantic token | CSS custom property |
| --- | --- |
| `text.display.size` | `--z-text-display-size` |
| `text.h1.weight` | `--z-text-h1-weight` |
| `text.body.line-height` | `--z-text-body-line-height` |
| `text.control.font-family` | `--z-text-control-font-family` |
| `text.label.size` | `--z-text-label-size` |
| `text.caption.weight` | `--z-text-caption-weight` |
| `text.title.line-height` | `--z-text-title-line-height` |

Primitives use `--z-font-*`; semantics use `--z-text-*`.

### 6.3 Figma variables

- Collection: **Text / Semantic** (primitives in **Text / Primitive**)
- Modes: theme-agnostic (text does not vary by light/dark)
- Names: match the semantic path (`text/control/size` — pick one delimiter scheme and keep it in the parity manifest)
- Variables alias **primitive** variables; components bind only to **semantic** variables

---

## 7. Semantic roles

### 7.1 Display and headings

| Role | Size | Weight | Line height | Use when… |
| --- | --- | --- | --- | --- |
| `text.display` | 9 | bold | tight | Hero marketing headlines |
| `text.h1` | 8 | bold | tight | Page title |
| `text.h2` | 7 | semibold | snug | Section title |
| `text.h3` | 6 | semibold | snug | Subsection title |
| `text.h4` | 5 | semibold | snug | Card or panel title |
| `text.h5` | 4 | semibold | normal | Minor heading |
| `text.h6` | 3 | semibold | normal | Smallest heading |

### 7.2 UI roles

| Role | Size | Weight | Line height | Use when… |
| --- | --- | --- | --- | --- |
| `text.body` | 3 | regular | relaxed | Paragraph copy, dialog descriptions |
| `text.control` | 3 | medium | tight | Buttons, inputs, menu items, tabs, links |
| `text.label` | 2 | medium | snug | Form field labels |
| `text.caption` | 2 | regular | snug | Tooltips, helper text, error messages |
| `text.badge` | 1 | medium | tight | Compact status labels — smallest UI text role |
| `text.title` | 4 | semibold | snug | Dialog titles, alert titles |

---

## 8. Component mapping

| Component | Role |
| --- | --- |
| Button, IconButton, Link, Tabs, Menu, Select, TextField, Textarea | `text.control` |
| Badge (`size="sm"`) | `text.badge` |
| Badge (`size="md"`, default) | `text.label` |
| Badge (`size="lg"`) | `text.control` |
| Field label | `text.label` |
| Field description, Field error | `text.caption` |
| Tooltip content | `text.caption` |
| Dialog title, Alert title | `text.title` |
| Dialog description, Alert description | `text.body` |
| Skeleton (`text` prop) | Matches the chosen role’s size × line-height for placeholder line boxes |

---

## 9. Consumption

### 9.1 Install

```bash
pnpm add @z-ui/tokens
```

### 9.2 Import

```tsx
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/react/styles.css';
```

Text tokens are **opt-in at the app layer** — React component CSS references semantic variables; the consuming app must import `text.css` (alongside `colors.css` and `sizes.css`).

### 9.3 Apply in component CSS

```css
font-family: var(--z-text-control-font-family);
font-size: var(--z-text-control-size);
font-weight: var(--z-text-control-weight);
line-height: var(--z-text-control-line-height);
font-optical-sizing: auto;
font-style: normal;
```

### 9.4 App-level default

Set body copy from `text.body` at the app root so inherited text uses Manrope:

```css
body {
  font-family: var(--z-text-body-font-family);
  font-size: var(--z-text-body-size);
  font-weight: var(--z-text-body-weight);
  line-height: var(--z-text-body-line-height);
  font-optical-sizing: auto;
  font-style: normal;
}
```

### 9.5 Override at root

```css
:root {
  --z-text-body-size: var(--z-font-size-4); /* larger body copy app-wide */
  --z-font-family-sans: "Inter", sans-serif; /* swap UI font */
}
```

### 9.6 Composed examples

**Field stack** — `text.label`, `text.control`, and `text.caption` with `spacing.stack.form`:

```css
.field {
  display: flex;
  flex-direction: column;
  gap: var(--z-spacing-stack-form);
}

.field__label {
  font-family: var(--z-text-label-font-family);
  font-size: var(--z-text-label-size);
  font-weight: var(--z-text-label-weight);
  line-height: var(--z-text-label-line-height);
}

.field__input {
  font-family: var(--z-text-control-font-family);
  font-size: var(--z-text-control-size);
  font-weight: var(--z-text-control-weight);
  line-height: var(--z-text-control-line-height);
}

.field__hint {
  font-family: var(--z-text-caption-font-family);
  font-size: var(--z-text-caption-size);
  font-weight: var(--z-text-caption-weight);
  line-height: var(--z-text-caption-line-height);
}
```

**Dialog chrome** — `text.title` for the heading; `text.body` for the description:

```css
.dialog__title {
  font-family: var(--z-text-title-font-family);
  font-size: var(--z-text-title-size);
  font-weight: var(--z-text-title-weight);
  line-height: var(--z-text-title-line-height);
}

.dialog__description {
  font-family: var(--z-text-body-font-family);
  font-size: var(--z-text-body-size);
  font-weight: var(--z-text-body-weight);
  line-height: var(--z-text-body-line-height);
}
```

---

## 10. Accessibility

- Use `rem`-based sizes so user zoom and browser text resizing work correctly.
- **Never go below 12px (`font.size.1`).** `text.badge` is the smallest semantic role; use spacing or layout to differentiate denser treatments.
- Semantic roles provide hierarchy; pair with semantic HTML (`h1`–`h6`, `label`, `p`) where appropriate.
- Do not rely on size or weight alone to convey meaning — use labels, icons, and color semantics together.
- `text.caption` is for supplementary copy; keep critical instructions at `text.body` or larger.
- Link underline preference: `--z-text-link-decoration` flips to `underline` when `data-link-underline="always"` — see [ACCESSIBILITY-SEMANTICS.md](./ACCESSIBILITY-SEMANTICS.md).

---

## 11. Open items

- Confirm Figma delimiter (`/` vs `.`) at schema freeze.
- Add `letter-spacing` primitives and semantics if marketing/display roles need tracking.
- Add a `Text` / `Heading` React component in a follow-up pass.
