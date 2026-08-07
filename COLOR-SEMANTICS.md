# Z-UI Color Semantics

**Status:** Draft  
**Audience:** Designers and developers  
**Related:** [PRD.md](./PRD.md), [`colors.css`](./colors.css), [`colors.html`](./colors.html), [CHART-SEMANTICS.md](./CHART-SEMANTICS.md)

This document defines how **color semantics** work in Z-UI: purpose-based color tokens that stay stable across light and dark themes, map cleanly between Figma and code, and remain usable under interaction states (hover, focus, disabled, and more).

---

## 1. Why color semantics exist

Primitive colors answer: *“What is green-600?”*  
Semantic colors answer: *“What color should primary text use?”* or *“What background should a danger button show on hover?”*

| Layer | Answers | Example | Who uses it |
| --- | --- | --- | --- |
| **Primitive** | Raw scale values | `green.600`, `neutral.100` | Theme authors only |
| **Semantic** | UI purpose | `color.text.primary`, `color.background.danger.hover` | Designers & developers (default) |
| **Component** | One-off needs | `button.solid.primary.bg` | Component authors when semantics are not enough |

**Rules (from the product model):**

1. Components **must** consume semantic or component tokens — never raw primitives in component styles.
2. Default semantic foreground/background pairs **must** meet WCAG 2.2 Level AA contrast.
3. Contrast **must** be validated for interaction and meaning states: hover, active, disabled, selected, focus, and destructive.
4. Color **must not** be the only way to convey state or meaning (use labels, icons, structure, disabled attributes, focus rings, etc.).
5. The same semantic names are used in Figma variables and CSS custom properties unless a documented platform exception is required.

Semantics let teams retheme the neutral emphasis role once and keep every component consistent without restyling each control by hand.

---

## 2. Mental model (keep it simple)

Think of every painted surface as a **role**, not a hex value:

```text
What is this for?     →  background | text | icon | border | focus | overlay
What is its meaning?  →  neutral | primary | danger | success | warning | info | inverse
What is its state?    →  default | hover | active | focus | disabled | selected | …
```

You almost always pick tokens in this order:

1. **Role** (text vs background vs border)
2. **Meaning** (primary content vs primary action vs danger)
3. **State** (only when the control can change)

```text
Good:  color.background.primary.hover
Bad:   green-600 on hover “because it looked right”
```

---

## 3. Naming conventions

### 3.1 Token path (design language)

```text
color.{role}.{meaning}[.{state}]
```

| Segment | Purpose | Examples |
| --- | --- | --- |
| `color` | Namespace for all color semantics | — |
| `role` | How the color is applied | `background`, `text`, `icon`, `border`, `focus`, `overlay` |
| `meaning` | Why this color exists | `canvas`, `primary`, `danger`, `subtle` |
| `state` | Interaction or availability (when needed) | `hover`, `active`, `disabled`, `selected` |

**Examples from product direction:**

- `color.background.canvas`
- `color.text.primary`
- `color.border.focus`

### 3.2 CSS custom properties

Dot paths become kebab-case CSS variables under a stable prefix:

| Semantic token | CSS custom property |
| --- | --- |
| `color.background.canvas` | `--z-color-background-canvas` |
| `color.text.primary` | `--z-color-text-primary` |
| `color.background.primary.hover` | `--z-color-background-primary-hover` |
| `color.border.focus` | `--z-color-border-focus` |

### 3.3 Figma variables

- Collection: **Color / Semantic** (or equivalent published collection)
- Modes: **Light**, **Dark**
- Names: match the semantic path (`color/background/canvas` or `color.background.canvas` — pick one scheme and keep it in the parity manifest)
- Variables alias **primitive** variables; components bind only to **semantic** variables

---

## 4. Roles

### 4.1 `background`

Fills for pages, surfaces, controls, and status containers.

| Token | Use when… |
| --- | --- |
| `color.background.canvas` | App/page base behind content |
| `color.background.surface` | Cards, panels, elevated sections on canvas |
| `color.background.subtle` | Quiet secondary regions, table headers, sidebars |
| `color.background.muted` | Disabled-looking fills, skeleton placeholders (not for critical actions) |
| `color.background.inverse` | High-contrast inverted blocks (e.g. dark bar in light theme) |
| `color.background.primary` | Primary actions and neutral emphasis fills (default = neutral **950** in light) |
| `color.background.danger` | Destructive filled controls (default = danger **500**) |
| `color.background.success` | Positive filled feedback (default = success **500**) |
| `color.background.warning` | Caution filled feedback (default = warning **500**) |
| `color.background.info` | Informational filled feedback (default = info **500**) |
| `color.background.selected` | Chosen item in tabs, menus, or list rows |
| `color.background.primary-subtle` | Quiet primary emphasis without a solid fill |
| `color.background.danger-subtle` | Error or destructive context without a solid fill |
| `color.background.success-subtle` | Positive feedback without a solid fill |
| `color.background.warning-subtle` | Caution feedback without a solid fill |
| `color.background.info-subtle` | Informational feedback without a solid fill |

State suffixes apply to interactive fills (see [§6](#6-states)):  
`color.background.primary.hover`, `color.background.primary.active`, `color.background.primary.disabled`, etc.

### 4.2 `text`

Content and labels. Prefer text tokens over hard-coding opacity on raw colors.

| Token | Use when… |
| --- | --- |
| `color.text.primary` | Default body and titles |
| `color.text.secondary` | Supporting copy, metadata |
| `color.text.tertiary` | Hints, placeholders (ensure contrast still passes where required) |
| `color.text.disabled` | Disabled control labels |
| `color.text.inverse` | Text on `background.inverse` only |
| `color.text.on-solid` | Text on solid danger/success/warning/info fills (theme-paired ink) |
| `color.text.on-primary` | Text on `background.primary` fills (end-of-ramp neutral) |
| `color.text.danger` | Errors, destructive labels |
| `color.text.success` | Success messages |
| `color.text.warning` | Warning messages |
| `color.text.info` | Informational messages |
| `color.text.link` | Default link color (aliases `text.primary`; underline carries affordance) |
| `color.text.link-hover` | Link hover (if not covered by a shared interactive pattern) |

### 4.3 `icon`

Icons follow **text** meanings so icon + label stay paired.

| Token | Pairs with |
| --- | --- |
| `color.icon.primary` | `color.text.primary` |
| `color.icon.secondary` | `color.text.secondary` |
| `color.icon.disabled` | `color.text.disabled` |
| `color.icon.inverse` | `color.text.inverse` |
| `color.icon.on-solid` | `color.text.on-solid` |
| `color.icon.on-primary` | `color.text.on-primary` |
| `color.icon.danger` / `success` / `warning` / `info` | Matching status text |

Default rule: **same meaning for icon and adjacent text.**

### 4.4 `border`

Dividers, control outlines, and emphasis edges.

| Token | Use when… |
| --- | --- |
| `color.border.default` | Interactive control hover/focus step-up; meets ≥3:1 UI component floor on `background.surface` |
| `color.border.subtle` | Resting card/chrome edges, dividers, separators (decorative; may be below 3:1) |
| `color.border.strong` | High-emphasis outlines, selected rows, active pagination |
| `color.border.disabled` | Disabled control borders |
| `color.border.primary` | Primary emphasis borders on solid fills |
| `color.border.danger` | Invalid fields, destructive emphasis |
| `color.border.success` | Success emphasis borders |
| `color.border.warning` | Warning emphasis borders |
| `color.border.info` | Informational emphasis borders |
| `color.border.focus` | Focus outline color (often used with focus-ring foundations) |

### 4.5 `focus`

Focus is a first-class accessible affordance, not a decorative accent.

| Token | Use when… |
| --- | --- |
| `color.focus.ring` | Outer focus ring (`:focus-visible`) |
| `color.border.focus` | Focus border when the pattern uses border rather than ring |

Focus indication **must** remain visible; never rely on hover-only color shifts for keyboard users.

### 4.6 `overlay`

Scrims and temporary layers.

| Token | Use when… |
| --- | --- |
| `color.overlay.scrim` | Dialog/modal backdrop |
| `color.overlay.tooltip` | Optional solid tooltip fill if not using surface tokens |

---

## 5. Meaning groups

| Meaning | Intent | Typical primitives (illustrative) |
| --- | --- | --- |
| **Neutral / canvas / surface** | Structure and reading | `neutral.*` |
| **Primary emphasis** | Main CTAs and neutral emphasis fills | `neutral.*` end-of-ramp (950 default in light) |
| **Danger** | Destructive or error | `red.*` |
| **Success** | Positive completion | `green.*` |
| **Warning** | Caution, not yet error | Default: `yellow.*` |
| **Info** | Neutral guidance | Default: `blue.*` |
| **Inverse** | Flipped contrast block | High-contrast neutrals |

Meanings describe **intent**, not a fixed hue. Theme customization remaps primitives; semantic names stay the same.

### 5.1 Background step rule (defaults)

**Primary** emphasis uses the neutral scale’s **end-of-ramp** step (950 in light, 950 in dark — highlight-adjacent on the reversed dark ramp). **Status** meanings (danger, success, warning, info) use step **500** in light and step **400** in dark (deeper fills so light `on-solid` ink meets AA).

| Background kind | Default step / source | Examples |
| --- | --- | --- |
| **Structure** | Neutrals (not end-of-ramp) | `canvas`, `surface`, `subtle`, `muted`, `inverse` |
| **Solid primary** | `neutral-950` (+ hover 900, active 800) | `background.primary` |
| **Solid status (light)** | `{meaning}-500` | `background.danger`, `background.success`, … |
| **Solid status (dark)** | `{meaning}-400` | `background.danger`, `background.success`, … |
| **Status subtle** | `{meaning}-50` / `-100` (tints) | `background.danger-subtle`, … |
| **Primary subtle** | `neutral-200` | `background.primary-subtle` |
| **Selected** | `neutral-200` | `background.selected` |

Interaction steps for status fills:

| Theme | default | hover | active | disabled |
| --- | --- | --- | --- | --- |
| Light | `500` | `600` | `700` | neutral muted |
| Dark | `400` | `300` | `200` | neutral muted |

Primary interaction steps (950 default in light):

| Theme | default | hover | active | disabled |
| --- | --- | --- | --- | --- |
| Light | `950` | `900` | `800` | `300` |
| Dark | `950` | `900` | `800` | `300` |

`text.on-primary` / `icon.on-primary` pair with `background.primary`.  
`text.on-solid` / `icon.on-solid` pair with solid status fills: dark ink in light (mid-luminance 500), light ink in dark (deeper 400).

---

## 6. States

States describe **interaction and availability**. They are part of the semantic contract so Figma variants and CSS `:hover` / `[disabled]` use the same vocabulary.

### 6.1 Canonical state set

| State | When it applies | Color semantics expectation |
| --- | --- | --- |
| **default** | Resting, enabled | Base semantic (often no suffix) |
| **hover** | Pointer over an enabled interactive control | Distinct from default; still AA with its foreground |
| **active** (pressed) | Pointer down / activation | Usually a step darker/stronger than hover |
| **focus** | Keyboard (or programmatic) focus with `:focus-visible` | Use focus ring/border tokens; may combine with hover |
| **disabled** | Control cannot be activated | Reduced emphasis; still identifiable as UI chrome |
| **selected** | Chosen item in a set (tabs, menus, list rows) | Clear selected vs unselected without relying on color alone |
| **invalid** | Failed validation | Danger border/text; message text required |
| **loading** | Busy (optional visual) | Prefer spinner/progress; avoid only dimming color |

PRD-aligned validation set: **hover, active, disabled, selected, focus, destructive**.

### 6.2 How state appears in token names

**A. Resting tokens omit `default`:**

- `color.background.primary` → resting primary fill  
- Not `color.background.primary.default` (unless tooling requires an explicit default)

**B. Interactive meanings get explicit state tokens:**

```text
color.background.primary
color.background.primary.hover
color.background.primary.active
color.background.primary.disabled

color.text.on-solid         → label on solid accent fills (enabled)
color.text.disabled         → text when control is disabled
```

**C. Non-interactive surfaces usually have no hover series:**

- `color.background.canvas` — no `.hover`
- Page canvas does not “hover”; interactive children do

**D. Focus is usually additive, not a full recolor:**

Prefer:

- keep background at default or hover  
- draw `color.focus.ring` (and optional `color.border.focus`)

Avoid inventing a unique fill for every “focused + hovered + selected” combination unless a component truly needs it (then use a **component token**).

### 6.3 State × role matrix (quick reference)

| Role | default | hover | active | focus | disabled | selected |
| --- | --- | --- | --- | --- | --- | --- |
| Background (interactive) | ✓ | ✓ | ✓ | ring, not always fill | ✓ | ✓ when selectable |
| Text | ✓ | link/action only | rare | — | ✓ | optional emphasis |
| Icon | same as text | same as text | rare | — | ✓ | optional |
| Border | ✓ | optional | optional | `border.focus` | ✓ | strong |
| Focus ring | — | — | — | ✓ | hidden when disabled | can coexist |

### 6.4 Disabled: special rules

Disabled is easy to get wrong. Follow these constraints:

1. Use **`color.text.disabled`**, **`color.icon.disabled`**, **`color.background.*.disabled`**, **`color.border.disabled`** — do not only lower opacity on a muted disabled fill if that breaks contrast or looks “clickable.”
2. Disabled controls **must** expose disabled semantics in the platform (`disabled`, `aria-disabled` as documented per component).
3. Disabled **must not** show hover/active color changes.
4. Disabled **must not** show a focus ring as if the control were operable (unless the pattern intentionally focuses a disabled field for explanation — rare; document if used).
5. Disabled color alone is not enough: non-pointer users need the disabled state in the accessibility tree.

### 6.5 Destructive / danger states

Destructive actions use the **danger** meaning across roles:

| Need | Token |
| --- | --- |
| Filled danger button | `color.background.danger` + `.hover` / `.active` / `.disabled` |
| Label on filled danger | `color.text.on-solid` |
| Ghost/outline danger | `color.text.danger`, `color.border.danger`, transparent/subtle background |
| Error on a field | `color.border.danger` + `color.text.danger` on message |

Destructive must remain distinguishable in light and dark themes and still pass contrast in every enabled state.

### 6.6 Combining states (priority)

When multiple states could apply, resolve in this order unless a component specifies otherwise:

```text
disabled  >  loading (non-interactive)  >  active  >  hover  >  selected  >  default
focus ring stacks with hover/selected when the control is focused and enabled
```

Examples:

- Disabled + hover → **disabled** colors only  
- Selected + hover → selected background with optional hover emphasis token if defined  
- Focus + hover → hover fill **plus** focus ring  

---

## 7. Pairing rules (foreground on background)

Semantics are validated as **pairs**, not isolated swatches.

### 7.1 Required pairs (defaults)

| Background | Allowed foregrounds |
| --- | --- |
| `canvas` / `surface` / `subtle` | `text.primary`, `text.secondary`, `text.primary`, status texts as documented |
| `primary` (solid, enabled) | `text.on-primary`, `icon.on-primary` |
| `danger` / `success` / `warning` / `info` (solid, enabled) | `text.on-solid`, `icon.on-solid` |
| `*.disabled` (solid) | `text.disabled`, `icon.disabled` |
| `inverse` | `text.inverse`, `icon.inverse` only |

### 7.2 Contrast requirements

- Default themes: **WCAG 2.2 AA** for normal and large text as applicable.
- Validate each **documented** pair in **light and dark**.
- Solid status **default** fills with `text.on-solid` / `icon.on-solid` must meet **4.5:1**.
- Solid status **hover/active** fills with the same ink must meet at least **3:1** (bold control labels); prefer 4.5:1 when the ramp allows.
- Validate other interactive states (selected, etc.) with the same foreground they ship with.
- Disabled pairs should remain legible as “disabled UI”; they may use the reduced-contrast patterns allowed for inactive UI, but must not become invisible.

### 7.3 Never do this

- Place `text.primary` on `background.primary` without checking the pair.
- Invent a one-off gray in a component to “fix” contrast.
- Use only red text for errors with no message structure or icon.

---

## 8. Interactive patterns (recipes)

These recipes show how designers and developers apply the same semantics.

### 8.1 Solid primary button

| Part | Default | Hover | Active | Disabled | Focus |
| --- | --- | --- | --- | --- | --- |
| Background | `background.primary` | `background.primary.hover` | `background.primary.active` | `background.primary.disabled` | + `focus.ring` |
| Label / icon | `text.on-primary` / `icon.on-primary` | same | same | `text.disabled` / `icon.disabled` | same + ring |

```css
.button--primary {
  background-color: var(--z-color-background-primary);
  color: var(--z-color-text-on-primary);
}

.button--primary:hover:not(:disabled) {
  background-color: var(--z-color-background-primary-hover);
}

.button--primary:focus-visible {
  outline: 2px solid var(--z-color-focus-ring);
  outline-offset: 2px;
}
```

### 8.2 Secondary / outline button

| Part | Tokens |
| --- | --- |
| Background | `background.surface` or transparent subtle |
| Border | `border.subtle` → `border.default` on hover |
| Label | `text.primary` |
| Disabled | `text.disabled`, `border.disabled`, muted background |
| Focus | `focus.ring` |

### 8.3 Ghost / subtle button

| Part | Tokens |
| --- | --- |
| Background default | transparent or none |
| Background hover | `background.subtle` (or `background.muted`) |
| Label | `text.primary` or `text.primary` |
| Disabled | `text.disabled` |

```css
.status--danger-subtle {
  color: var(--z-color-text-danger);
  background-color: var(--z-color-background-danger-subtle);
}
```

### 8.4 Text field

| Part | Default | Hover | Focus | Invalid | Disabled |
| --- | --- | --- | --- | --- | --- |
| Background | `background.surface` | optional subtle | surface | surface | `background.muted` |
| Border | `border.subtle` | `border.default` | `border.focus` | `border.danger` | `border.disabled` |
| Value text | `text.primary` | — | — | `text.primary` | `text.disabled` |
| Placeholder | `text.tertiary` | — | — | — | `text.disabled` |
| Message | — | — | — | `text.danger` | — |

```css
.field__input {
  color: var(--z-color-text-primary);
  background-color: var(--z-color-background-surface);
  border: 1px solid var(--z-color-border-default);
}

.field__input::placeholder {
  color: var(--z-color-text-tertiary);
}

.field__input:focus-visible {
  border-color: var(--z-color-border-focus);
}

.field__input[aria-invalid='true'] {
  border-color: var(--z-color-border-danger);
}

.field__error {
  color: var(--z-color-text-danger);
}
```

### 8.5 Selected list row / tab

| Part | Unselected | Selected |
| --- | --- | --- |
| Background | canvas/surface | `background.selected` **or** `background.subtle` + `border.strong` |
| Text | `text.primary` | `text.primary` |
| Indicator | none | bar/check using `border.strong` (not color alone) |

Prefer a **selected indicator** (underline, check, `aria-selected`) in addition to color.

```css
.list-row--selected {
  color: var(--z-color-text-primary);
  background-color: var(--z-color-background-selected);
}

.list-row__indicator {
  background-color: var(--z-color-border-strong);
}
```

### 8.6 Link

| State | Token |
| --- | --- |
| Default | `text.link` |
| Hover | `text.link-hover` |
| Disabled | `text.disabled` |
| Focus | focus ring around link box |

```css
.link {
  color: var(--z-color-text-link);
}

.link:hover {
  color: var(--z-color-text-link-hover);
}

.link:focus-visible {
  outline: 2px solid var(--z-color-focus-ring);
  outline-offset: 2px;
}
```

---

## 9. For designers (Figma)

### 9.1 What you bind

- Paint styles / fills / strokes / text → **semantic variables only**
- Primitives live in a separate collection for theme authors; avoid applying `green/600` directly to components

### 9.2 Component sets and states

Mirror React state names in the parity manifest:

| Figma property (example) | Semantic usage |
| --- | --- |
| State = Default | resting tokens |
| State = Hover | `*.hover` tokens |
| State = Active | `*.active` tokens |
| State = Focus | resting or hover + focus ring styles |
| State = Disabled | `*.disabled` tokens |
| State = Selected | selected tokens + non-color indicator |

Do not publish recommended variants that are known low-contrast combinations.

### 9.3 Light and dark

- One set of semantic names; two modes resolve different primitives.
- Check critical pairs in **both** modes before handoff.
- Brand modes are not used; light and dark share the same semantic names.

### 9.4 Handoff checklist

- [ ] Uses semantic variables (not detached hex)
- [ ] States named consistently with code
- [ ] Focus visible in keyboard-focused variant
- [ ] Disabled not relying on color alone
- [ ] Danger/error includes text or icon + color
- [ ] Light and dark both reviewed

---

## 10. For developers (React / CSS)

### 10.1 Consume CSS variables

```css
.button--primary {
  background-color: var(--z-color-background-primary);
  color: var(--z-color-text-on-primary);
}

.button--primary:hover:not(:disabled) {
  background-color: var(--z-color-background-primary-hover);
}

.button--primary:active:not(:disabled) {
  background-color: var(--z-color-background-primary-active);
}

.button--primary:disabled {
  background-color: var(--z-color-background-primary-disabled);
  color: var(--z-color-text-disabled);
}

.button--primary:focus-visible {
  outline: 2px solid var(--z-color-focus-ring);
  outline-offset: 2px;
}
```

### 10.2 Theme application

Themes apply through a stable root selector (PRD):

```html
<html data-theme="light">
<!-- or -->
<html data-theme="dark">
```

Semantic variables redefine per theme; component CSS should not branch on light/dark by hard-coded colors.

### 10.3 Theme customization

Teams override **semantic** (or carefully chosen primitive) CSS variables at the app root or a scoped subtree:

```css
[data-theme="light"] {
  --z-color-background-primary: var(--neutral-900);
  --z-color-background-primary-hover: var(--neutral-800);
  --z-color-background-primary-active: var(--neutral-700);
  /* …keep paired hover/active/disabled/focus and on-primary coherent */
}
```

After overrides, **re-check contrast**. Arbitrary overrides can invalidate WCAG guarantees; defaults are what Z-UI certifies.

### 10.4 Component tokens (escape hatch)

Use component tokens only when a control cannot be expressed with shared semantics:

```text
color.background.primary          ← prefer
button.solid.primary.bg         ← only if button needs a unique mapping
```

Component tokens still alias semantics or primitives in the token source — they are not a back door for random hex values in multiple files.

### 10.5 Forced colors / high contrast

Where practical, ensure critical UI still works in Windows forced-colors mode (borders and system colors). Do not assume semantic primary fills alone communicate state there.

---

## 11. Decision guide

```text
Are you styling a component for product UI?
  └─ Yes → use a semantic token
        Need a one-off the shared set cannot express?
          └─ Yes → propose a component token (or extend semantics)
          └─ No  → pick role → meaning → state

Are you authoring the theme scales themselves?
  └─ Yes → edit primitives (OKLCH), then map semantics

Are you unsure which meaning?
  └─ Reading content on the page → text.primary / secondary
  └─ Main call to action → primary
  └─ Delete / irreversible → danger
  └─ System message → success | warning | info
  └─ Structure only → canvas / surface / border.default
```

---

## 12. Full starter catalog (v1 target)

This catalog is the intended public semantic surface. Exact primitive mappings ship with the token package and theme builder.

### Background

- `color.background.canvas`
- `color.background.surface`
- `color.background.subtle`
- `color.background.muted`
- `color.background.inverse`
- `color.background.selected`
- `color.background.primary-subtle` · `danger-subtle` · `success-subtle` · `warning-subtle` · `info-subtle`
- `color.background.primary` · `.hover` · `.active` · `.disabled`
- `color.background.danger` · `.hover` · `.active` · `.disabled`
- `color.background.success` · `.hover` · `.active` · `.disabled`
- `color.background.warning` · `.hover` · `.active` · `.disabled`
- `color.background.info` · `.hover` · `.active` · `.disabled`

### Text

- `color.text.primary`
- `color.text.secondary`
- `color.text.tertiary`
- `color.text.disabled`
- `color.text.inverse`
- `color.text.on-solid`
- `color.text.on-primary`
- `color.text.danger`
- `color.text.success`
- `color.text.warning`
- `color.text.info`
- `color.text.link` · `.hover`

### Icon

- `color.icon.primary`
- `color.icon.secondary`
- `color.icon.disabled`
- `color.icon.inverse`
- `color.icon.on-solid`
- `color.icon.on-primary`
- `color.icon.danger`
- `color.icon.success`
- `color.icon.warning`
- `color.icon.info`

### Border

- `color.border.default`
- `color.border.subtle`
- `color.border.strong`
- `color.border.disabled`
- `color.border.primary`
- `color.border.danger`
- `color.border.focus`

### Focus & overlay

- `color.focus.ring`
- `color.overlay.scrim`

---

## 13. Accessibility summary

| Requirement | How semantics help |
| --- | --- |
| WCAG 2.2 AA | Documented pairs tested in light/dark and key states |
| Visible focus | `color.focus.ring` / `color.border.focus` + `:focus-visible` |
| Disabled clarity | Dedicated disabled tokens + native disabled semantics |
| Meaning not by color alone | Status and selected patterns include text/icon/structure |
| Theming safety | Override semantics carefully; re-validate contrast |
| Parity | Same names in Figma and code reduce accidental wrong pairs |
| High contrast | `data-contrast="high"` raises border and text separation — see [ACCESSIBILITY-SEMANTICS.md](./ACCESSIBILITY-SEMANTICS.md) |
| Reduced transparency | `data-transparency="reduced"` makes `--z-color-overlay-scrim` fully opaque |

---

## 14. Do and don’t

### Do

- Use semantic tokens for all component color.
- Name states the same in Figma, CSS, and docs (`hover`, `active`, `disabled`, `selected`, `focus`).
- Pair foreground and background from the documented matrix.
- Keep focus visible on keyboard interaction.
- Customize emphasis by remapping primary-related semantics (and their hover/active/disabled set together).

### Don’t

- Hard-code primitive scales in components.
- Create ad-hoc hover colors outside the semantic set.
- Rely on opacity alone for disabled primary buttons without a defined disabled pair.
- Hide focus outlines without an approved replacement that still meets accessibility requirements.
- Ship light-only semantics; dark mode must resolve the same names.

---

## 15. Relationship to primitives and tooling

1. **Author** primitives in OKLCH (`colors.css` / theme builder).  
2. **Map** primitives → semantic tokens per theme mode (light/dark).  
3. **Generate** CSS custom properties and Figma variable manifests from one source.  
4. **Validate** contrast for pairs and states in CI.  
5. **Consume** only semantics (and rare component tokens) in React and Figma components.

Canonical format should follow W3C Design Tokens Community Group structure where practical. Generated CSS and Figma files are build artifacts, not parallel hand-edited sources of truth.

---

## 16. Open items (track with token schema freeze)

These align with PRD open decisions and should be closed before v1 freeze:

1. Final prefix (`--z-color-*` vs alternatives) and Figma naming delimiter (`/` vs `.`).
2. Selected backgrounds use dedicated `background.selected` (`neutral-200`) plus non-color indicators.
3. Exact disabled contrast policy (minimum ratios for inactive UI).
4. Component-token naming template when semantics are insufficient.

**Resolved:** solid accent labels use `text.on-solid` / `icon.on-solid` (dark ink on light mid-luminance 500 fills; light ink on dark deeper 400 fills); `text.inverse` pairs only with `background.inverse`. Solid meaning backgrounds default to step **500** (light) / **400** (dark).

---

## 17. Quick copy-paste reference

| Need | Token |
| --- | --- |
| Page background | `color.background.canvas` |
| Card background | `color.background.surface` |
| Body text | `color.text.primary` |
| Muted meta text | `color.text.secondary` |
| Primary button fill (default = 500) | `color.background.primary` |
| Primary button hover | `color.background.primary.hover` |
| Primary button label | `color.text.on-primary` |
| Inverse chrome label | `color.text.inverse` |
| Disabled label | `color.text.disabled` |
| Input border (resting) | `color.border.subtle` |
| Input border (hover) | `color.border.default` |
| Focus ring | `color.focus.ring` |
| Error text | `color.text.danger` |
| Error border | `color.border.danger` |
| Modal scrim | `color.overlay.scrim` |

---

*This specification implements the token architecture and color requirements in the Z-UI PRD: three-layer tokens, semantic consumption, light/dark themes, state-aware contrast, and design/code parity.*
