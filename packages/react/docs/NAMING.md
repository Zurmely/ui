# Z-UI Naming Conventions

This document defines the shared public vocabulary for React components, CSS hooks, and documentation.

## Component and export names

- React components and public exports use **PascalCase** (`Button`, `DialogContent`).
- Props use **camelCase** (`isLoading`, `defaultOpen`).
- Compound components use the parent name as prefix (`Dialog`, `DialogTrigger`, `DialogContent`).
- File names match the primary export (`Button.tsx`, `button.css`).

## Sizes

Where a component supports sizing:

| Value | Meaning |
| --- | --- |
| `sm` | Compact |
| `md` | Default |
| `lg` | Large |

Use the `size` prop. Reflect size in `data-size` on the root element.

## Action variants

For interactive action components (`Button`, `IconButton`):

| Value | Meaning |
| --- | --- |
| `primary` | Solid neutral emphasis fill (default) |
| `secondary` | Surface/outline treatment |
| `ghost` | Transparent/subtle hover |
| `danger` | Destructive solid or outline treatment |

Use the `variant` prop. Reflect variant in `data-variant`.

## Tones

For status-aware display components (`Badge`, `Alert`):

| Value | Meaning |
| --- | --- |
| `neutral` | Quiet subtle-gray treatment |
| `primary` | Solid neutral emphasis (`background-primary`, `text-on-primary`) |
| `success` | Positive completion |
| `warning` | Caution |
| `danger` | Error/destructive |
| `info` | Guidance |

Use the `tone` prop. Reflect tone in `data-tone`.

## Canonical states

| State | CSS / attributes |
| --- | --- |
| `default` | Resting enabled (no attribute) |
| `hover` | `:hover` pseudo-class |
| `active` | `:active` pseudo-class |
| `focus` | `:focus-visible` + focus ring tokens |
| `disabled` | `disabled` / `aria-disabled` + `data-disabled` |
| `selected` | `aria-selected` / `data-selected` |
| `invalid` | `aria-invalid` + `data-invalid` |
| `loading` | `aria-busy` + `data-loading` |
| `skeleton` | Placeholder via `.z-skeleton` (`Skeleton`); decorative `aria-hidden` or labeled `role="status"` |

State priority (when multiple apply):

```text
disabled > loading > active > hover > selected > default
```

Focus ring stacks with hover/selected when enabled.

### Disabled state on all hosts

Every component that supports a disabled state **must** reflect it with all applicable attributes:

- Native `<button>` / form controls: set the `disabled` attribute **and** `data-disabled="true"`.
- Non-button hosts (`<a>`, custom elements, `asChild` slots): set `aria-disabled="true"`, `data-disabled="true"`, `tabIndex={-1}`, remove `href` when the host is a link, and suppress `onClick` / keyboard activation.

`asChild` is not an exception. When `disabled` or `isLoading` is true, the slotted child must receive the same behavioral suppression as `Link` (see `packages/react/src/components/link/Link.tsx`). CSS disabled styles target `[data-disabled='true']` in addition to `:disabled`; both must be set so visual and interaction state stay aligned.

Loading (`isLoading`) follows the disabled interaction model and additionally sets `aria-busy` and `data-loading`.

## Slots and composition

Common slot prop names:

| Slot | Purpose |
| --- | --- |
| `icon` | Leading or trailing icon |
| `leading` | Start region in row/toolbar layouts |
| `trailing` | End region in row/toolbar layouts |
| `control` | Single trailing control in settings rows |
| `description` | Supporting text |
| `action` | Secondary action in alerts/dialogs |
| `label` | Visible label content |
| `children` | Primary content |

Prefer composition over boolean icon props when multiple slots are needed.

## Curated compositions

Curated composition components (`ListItem`, `Toolbar`) assemble existing primitives into opinionated layouts.

Rules:

- `ListItem` accepts any `ReactNode` in `leading`, `trailing`, and `control` slots.
- `Toolbar` documents an allowed set of Z-UI components per slot.
- TypeScript `SlotOf<typeof Component>` unions document intent in IntelliSense for `Toolbar` only.
- Runtime enforcement uses a dev-only `console.warn` when a `Toolbar` slot receives a disallowed element (checked via `displayName`).
- Use `ListItemIcon` for consumer SVG icons in leading/trailing slots.

Ask before adding a new curated composition or expanding the `Toolbar` slot allowlist.

## CSS class prefix

All component classes use the `z-` prefix:

- Block: `.z-button`
- Element: `.z-button__icon`
- Modifier via data attributes: `[data-variant="primary"]`, `[data-size="md"]`

## Document-root accessibility flags

Set on `document.documentElement` (or omit to follow the OS). See [ACCESSIBILITY-SEMANTICS.md](../../../ACCESSIBILITY-SEMANTICS.md).

| Attribute | Values | Purpose |
| --- | --- | --- |
| `data-contrast` | `standard`, `high` | Stronger borders and text separation |
| `data-motion` | `full`, `reduced` | Zero interaction/enter/exit motion durations |
| `data-transparency` | `full`, `reduced` | Opaque overlay scrims |
| `data-link-underline` | `auto`, `always` | Force link underline via `--z-text-link-decoration` |

Use `applyAccessibilityPreferences` or `<AccessibilityController />` from `@z-ux/ui/accessibility`.

## Token usage

Components consume **semantic** CSS variables only:

```css
color: var(--z-color-text-primary);
background-color: var(--z-color-background-primary);
font-size: var(--z-text-control-size);
font-weight: var(--z-text-control-weight);
```

Do not reference primitive scales (`--purple-500`, `--neutral-950`, `--z-font-size-3`, `--z-space-1`) in component CSS.

### Text vs color text tokens

- `--z-text-*` — typography (font family, size, weight, line-height)
- `--z-color-text-*` — foreground color for text

Import `@z-ux/tokens/text.css` alongside `colors.css`, `sizes.css`, `motion.css`, and `elevation.css`. Apply semantic text roles (`text.control`, `text.label`, `text.caption`, `text.body`, `text.title`, `text.h1`–`text.h6`, `text.display`) via `--z-text-{role}-{property}` variables.

### Motion tokens

Import `@z-ux/tokens/motion.css` alongside the other token stylesheets. Apply semantic motion aliases (`motion.duration.interaction`, `motion.easing.interaction`, `motion.duration.layout`, `motion.duration.enter`, `motion.easing.enter`, `motion.duration.exit`, `motion.easing.exit`, `motion.duration.continuous`, `motion.easing.continuous`) via `--z-motion-{property}-{purpose}` variables.

Do not reference primitive motion scales (`--z-duration-150`, `--z-easing-standard`, `--z-easing-decelerate`) in component CSS.

### Elevation tokens

Import `@z-ux/tokens/elevation.css` alongside the other token stylesheets. Use `elevation.ring` via `--z-elevation-ring` for outline halos (for example timeline markers). The page is `background.canvas`; don't put text in a surface or a surface inside a surface. Lighter `background.surface` is only for floating UI—see **Gabriel's rule** in `ELEVATION-SEMANTICS.md`.

Do not use literal `box-shadow` values for depth in component CSS. `elevation.ring` and shared focus-ring styles are the approved `box-shadow` exceptions; see `ELEVATION-SEMANTICS.md`.

## Controlled / uncontrolled pairs

| Concern | Controlled | Uncontrolled |
| --- | --- | --- |
| Value | `value` + `onChange` | `defaultValue` |
| Open state | `open` + `onOpenChange` | `defaultOpen` |
| Checked | `checked` + `onCheckedChange` | `defaultChecked` |

## Ref targets

Document the ref target per component (usually the primary DOM node).

## Figma parity

Use the same component name, variant names, size names, state names, and slot names in Figma unless a platform constraint requires a documented exception.
