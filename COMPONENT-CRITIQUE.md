# Z-UI Component Critique

**Date:** 2026-07-25  
**Scope:** All 49 components under `packages/react/src/components/`  
**Contracts reviewed:** `PRD.md`, `packages/react/docs/NAMING.md`, `COLOR-SEMANTICS.md`, `SIZES-SEMANTICS.md`, `TEXT-SEMANTICS.md`, `MOTION-SEMANTICS.md`

## Verdict

Z-UI has a strong foundation: semantic tokens, a clear public vocabulary (`sm`/`md`/`lg`, action variants, tones, canonical states), Radix for complex interactions, package Markdown + tests for every component, and a thoughtful Field composition model. The main risk is **breadth outrunning completeness**. The PRD targets ~15–21 polished v1 components; the library already ships 53 modules, and quality is uneven outside the core set.

Principle 7 in the PRD (“prefer fewer complete components over many inconsistent ones”) is the right north star for the next phase of work.

---

## Inventory

| Family | Components |
| --- | --- |
| Actions | Button, IconButton, Link, FloatingActionButton |
| Navigation | Breadcrumbs, Navbar, Pagination, Steps, Megamenu, Toolbar |
| Forms | Field, TextField, Textarea, Checkbox, RadioGroup, Switch, Select, Calendar, FileInput, Filter, OTPInput, RangeSlider, Rating, Validator |
| Feedback | Alert, Toast, Spinner, Skeleton, Progress, RadialProgress, Status, Indicator |
| Display | Avatar, Badge, Card, Timeline, Separator |
| Overlays | Dialog, Drawer, Popover, Tooltip, Menu, Accordion, Tabs |
| Layout / data | Stack, Table, Carousel, ListItem |
| System | ThemeController |

**Artifact completeness:** every component folder includes TSX, CSS, a test file, and package Markdown.  
**Docs app:** all 49 components have `.docs.tsx` entries.

Shared vocabulary is centralized in `packages/react/src/shared/types.ts` (`Size`, `ActionVariant`, `Tone`, `ComponentState`) and documented in `NAMING.md`.

---

## Strengths

### 1. Semantic token discipline

Representative core controls (Button, TextField, Dialog, Checkbox, Badge, Field) consume semantic `--z-*` variables for color, spacing, radius, typography, and motion. Component CSS does not appear to reach for primitive scales (`--purple-*`, `--z-space-*`, `--z-font-size-*`, etc.), which matches the token policy.

The 12px floor is respected; Badge’s `text.badge` role is the smallest typography in use.

### 2. Form composition

`Field` centralizes IDs, labels, descriptions, errors, invalid/required/disabled propagation, and context for child controls. TextField, Textarea, Select, Calendar, Rating, and others integrate cleanly. Error messaging uses `role="alert"`. This is one of the library’s clearest design wins.

### 3. Radix where it matters

Dialog, Drawer, Select, Checkbox, Switch, RadioGroup, Accordion, Tabs, Menu, Popover, Tooltip, and Toast lean on Radix. That keeps focus management, keyboard patterns, and portal behavior mature for hard interactions.

### 4. Consistent packaging and vocabulary

PascalCase exports, `z-` BEM classes, `data-size` / `data-variant` / `data-tone` modifiers, ref forwarding on DOM components, and controlled/uncontrolled patterns are broadly followed. Curated compositions (`ListItem`, `Toolbar`) provide opinionated layouts — `ListItem` with open slots and `Toolbar` with typed slot allowlists and dev-time warnings.

### 5. Accessibility foundations

Shared `:focus-visible` treatment includes forced-colors support. Spinner, Progress, and RadialProgress expose useful ARIA. OTPInput implements arrow keys, Backspace movement, paste, and Field-aware invalid/disabled/required state. Representative tests include axe checks.

### 6. Link disabled behavior as a good reference

`Link` correctly removes `href`, sets `data-disabled` + `aria-disabled`, drops `tabIndex` to `-1`, and clears `onClick`. That is the pattern action components should match when rendering non-`<button>` hosts.

---

## Critical issues

### 1. Disabled / loading `asChild` actions are not actually disabled

**Affected:** Button, IconButton, FloatingActionButton

When `asChild` is true, these components set `aria-disabled` but:

- do not set `data-disabled` (CSS disabled styles target `:disabled` and `[data-disabled='true']`);
- do not prevent click / keyboard activation;
- do not strip `href` when the child is a link.

So a disabled or loading Button-as-link can still look enabled on hover and remain activatable. `Link` already solves this correctly; actions should converge on that model (or a shared helper).

### 2. Avatar fallback has no accessible name

When the image is missing or fails, `alt` is ignored and the fallback is a plain `<span>`. If consumers pass `alt` / name intent for the person or entity, that information disappears. Fallback should expose an accessible name (for example via `role="img"` + `aria-label`, or equivalent) when a name is provided.

### 3. Calendar grid lacks keyboard date navigation

Calendar renders `role="grid"` with ~42 independently tabbable day buttons. There is no roving tabindex or arrow-key movement between days. That fails the expected WAI-ARIA date-grid pattern and is especially costly given the PRD lists date/calendar systems as a v1 non-goal — shipping Calendar without the interaction model creates accessibility debt.

### 4. Button CSS / DOM attribute mismatch

Button CSS styles `[data-disabled='true']`, but Button never sets `data-disabled`. Native buttons rely on `:disabled` (fine). `asChild` + disabled relies only on `aria-disabled`, so disabled visuals and hover suppression do not apply. Naming contract says disabled should use `disabled` / `aria-disabled` **and** `data-disabled`.

---

## Consistency gaps

### State attributes drift

| Pattern | Where |
| --- | --- |
| `data-loading` + `aria-busy` | Button, IconButton, FAB |
| `data-state` (Radix) | Checkbox, Switch, Tabs, overlays |
| `data-disabled` / `data-invalid` | Field, Calendar, FileInput, Rating, rows |
| `aria-disabled` without `data-disabled` | Button/IconButton/FAB `asChild` |
| Mixed | Select reflects invalid well; disabled styling/attributes are less consistent |

Consumers and theme authors cannot rely on one attribute surface for “is this control disabled?” across the system.

### Overlay API asymmetry

Drawer ships `DrawerHeader` / `DrawerFooter` layout helpers. Dialog only exposes Content / Title / Description / Close. Teams composing modal footers will invent divergent layouts. Align Dialog with Drawer’s compound surface, or document Dialog as intentionally minimal.

### Select placeholder token misuse

`COLOR-SEMANTICS.md` maps placeholders to `color.text.tertiary`. Select styles `[data-placeholder]` with `--z-color-text-disabled`, which overstates “unavailable” and underuses the documented hint role.

### Elevation is undefined in tokens

PRD §9.4 requires elevation/shadow foundations. Select and Toast use the same literal:

```css
box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
```

Timeline uses a literal ring shadow. These should become semantic elevation tokens (or documented, approved exceptions).

### Motion coverage vs breadth

`MOTION-SEMANTICS.md` adopts motion for a small v1 matrix and intentionally excludes overlays. The library now includes Drawer, Carousel, Accordion, Skeleton, Spinner, FAB, and more with transitions/animations. Only ~9 of ~26 CSS files that use `transition`/`animation` also declare `prefers-reduced-motion` overrides.

Carousel always passes `behavior: 'smooth'` to `scrollTo`; CSS reduced-motion rules do not suppress programmatic smooth scrolling.

### Rating keyboard model

Rating uses `role="radiogroup"` with per-star `role="radio"` buttons. Arrow-key radio navigation (standard radiogroup pattern) is not clearly implemented; stars are likely individually tabbable. Worth aligning with RadioGroup behavior.

---

## Accessibility scorecard

| Area | Assessment |
| --- | --- |
| Semantic HTML + Radix patterns | Strong for core overlays and toggles |
| Focus rings / forced colors | Shared utility looks solid |
| Field labeling / errors | Strong |
| Disabled `asChild` activation | Fail |
| Avatar fallback naming | Fail when name is required |
| Calendar keyboard grid | Fail |
| Automated axe in unit tests | Present; not sufficient alone |
| Manual keyboard / SR matrix | PRD requires it; not evidenced as release gate |
| Checkbox / Switch labeling | Relies on external Field/label; easy to misuse without clear docs examples |

---

## Scope and product fit

| Signal | Observation |
| --- | --- |
| PRD v1 target | 15–21 essential components |
| Shipped | 53 modules |
| PRD non-goal | “date/calendar systems” |
| Shipped anyway | Calendar (incomplete a11y) |
| PRD principle | Prefer fewer complete components |

The library is past “foundation” and into “catalog.” That is fine if intentional, but it conflicts with the written v1 strategy. Either:

1. **Freeze breadth**, harden the PRD set + clearly marked experimental extras; or  
2. **Revise the PRD** to a larger scope and fund definition-of-done for every public component.

Right now the middle ground produces uneven trust: Button/Field feel production-ready; Calendar/asChild disabled do not.

### Suggested missing pieces (if expanding)

Prioritize only after hardening existing public APIs:

- Combobox / autocomplete
- DatePicker composition on top of a keyboard-complete Calendar
- NumberInput
- AvatarGroup
- Form-level error summary
- Richer Menu (checkbox items, submenus) if product needs demand it
- Data-table behaviors beyond presentational Table
- Text / Heading primitives deferred by typography docs

---

## Documentation

| Layer | Status |
| --- | --- |
| Per-component `Component.md` | Present for all 53 |
| Docs app `.docs.tsx` registry | 53 / 53 |
| Storybook / MDX | Not used |
| Semantics docs | Strong contracts for color, size, text, motion |
| Naming conventions | Clear and enforceable |
| Cross-component state matrix | Not published |
| Figma parity (PRD §13) | Required for “done”; not verified in this critique |

Package docs are a real strength. Gaps are discoverability of composition patterns, cross-cutting state/token matrices, and keeping the docs app in lockstep with every export.

---

## Recommendations (priority order)

1. **Fix disabled/loading `asChild`** on Button, IconButton, and FAB: set `data-disabled`, suppress activation, mirror Link’s href/tabIndex/`onClick` handling; add behavior tests.
2. **Define Avatar fallback accessible-name contract** and implement it.
3. **Either complete Calendar keyboard navigation** or mark Calendar experimental / remove from the stable public surface until it meets the grid pattern.
4. **Standardize root state attributes** (`data-disabled`, `data-invalid`, `data-loading`, `data-selected`) across native, custom, and Radix wrappers; update CSS selectors accordingly.
5. **Add semantic elevation tokens** (or document approved literals) and replace Select/Toast/Timeline shadows.
6. **Align Select placeholder** to `--z-color-text-tertiary`.
7. **Add Dialog Header/Footer** helpers to match Drawer, or document the intentional difference.
8. **Audit reduced-motion** for every animated component, including JS-driven smooth scroll in Carousel.
9. **Publish a state × theme matrix** (default, hover, active, focus, disabled, invalid, selected, loading × light/dark) as a release checklist for the PRD core set.
10. **Reconcile PRD scope with the shipped catalog** — freeze experimental components or expand the official v1 list with DoD ownership.

---

## Component-by-component notes (high signal)

| Component | Note |
| --- | --- |
| Button / IconButton / FAB | Strong tokens & variants; `asChild` disabled/loading broken; `data-disabled` never set |
| Link | Best-in-class disabled pattern for non-button hosts |
| Field + text inputs | Exemplary composition and a11y wiring |
| Select | Solid Radix base; wrong placeholder token; literal shadow |
| Dialog vs Drawer | Shared Radix root; Drawer has richer layout API |
| Avatar | Fallback a11y gap |
| Calendar | Visual grid only; keyboard incomplete; conflicts with PRD non-goal |
| Carousel | Smooth scroll ignores reduced-motion preference in JS |
| Rating | Radiogroup semantics; verify arrow-key parity with RadioGroup |
| Toast | Literal elevation; otherwise useful feedback primitive |
| ListItem / Toolbar | Strong composition system; ListItem has open slots, Toolbar keeps allowlists |
| ThemeController | Implemented and documented in docs registry |

---

## Resolution status (2026-07-25)

| Finding | Status |
| --- | --- |
| PRD scope vs 53 components | **Resolved** — tiered Stable (21) + Developing (32) catalog in `PRD.md` |
| Elevation tokens undefined | **Resolved** — `ELEVATION-SEMANTICS.md`, `elevation.css`, docs foundations page |
| Disabled `asChild` actions | **Resolved** — shared `getDisabledHostProps`; Button, IconButton, FAB |
| Avatar fallback a11y | **Resolved** — `role="img"` + `aria-label` when `alt` provided |
| Calendar keyboard grid | **Resolved** — roving tabindex + arrow/Home/End/PageUp/PageDown |
| Rating keyboard parity | **Resolved** — radiogroup arrow/Home/End navigation |
| Select placeholder token | **Resolved** — `--z-color-text-tertiary` |
| Literal shadows | **Resolved** — Select, Toast, Timeline, Dialog, Drawer use elevation tokens |
| Dialog/Drawer API asymmetry | **Resolved** — `DialogHeader`, `DialogFooter` added |
| Carousel reduced motion (JS) | **Resolved** — `prefersReducedMotion()` gates smooth scroll |
| State attribute drift | **Resolved** — `data-disabled` on action, form, and select controls; see `STATE-MATRIX.md` |
| ThemeController docs gap | **Resolved** — docs registry entry added |
| Motion matrix outdated | **Resolved** — `MOTION-SEMANTICS.md` §6 expanded |
| Cross-component state matrix | **Resolved** — `packages/react/docs/STATE-MATRIX.md` |

---

## Method

This critique is based on source review of contracts, representative component TSX/CSS/tests, cross-component greps for state attributes / motion / shadows / Radix usage, and comparison of the component tree against the docs registry and PRD scope. Remediation tracked in the resolution status table was completed 2026-07-25.
