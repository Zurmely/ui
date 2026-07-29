# Z-UI Component State Matrix

Cross-component reference for canonical state attributes and styling hooks. See [`NAMING.md`](./NAMING.md) for the authoritative contract.

## State attributes

| State | DOM / ARIA | `data-*` | Notes |
| --- | --- | --- | --- |
| Default | — | — | Resting enabled |
| Hover | `:hover` | — | Pseudo-class only |
| Active | `:active` | — | Pseudo-class only |
| Focus | `:focus-visible` | — | Shared `.z-focus-ring` utility |
| Disabled | `disabled` or `aria-disabled` | `data-disabled="true"` | Required on all hosts, including `asChild` |
| Selected | `aria-selected` / `aria-checked` | `data-selected` | Radix may also expose `data-state` |
| Invalid | `aria-invalid` | `data-invalid="true"` | Form controls and Field-aware children |
| Loading | `aria-busy` | `data-loading="true"` | Button family only |

## State priority

```text
disabled > loading > active > hover > selected > default
```

## Component coverage

| Component family | `data-disabled` | `data-invalid` | `data-loading` | `data-selected` |
| --- | --- | --- | --- | --- |
| Button, IconButton, FAB | Yes | — | Yes | — |
| Link | Yes (`aria-disabled`) | — | — | — |
| TextField, Textarea | Yes | Yes | — | — |
| Checkbox, Switch, RadioGroup | Yes | Yes | — | Radix `data-state` |
| Select trigger | Yes | Yes | — | — |
| Calendar | Yes (root + nav) | Yes | — | Day cells |
| Rating | Yes | Yes | — | — |
| Field (wrapper) | Yes | Yes | — | — |
| ListItem | Yes | Yes | — | Yes (`selected`) |
| Filter | Yes | — | — | Yes |

## Theme verification checklist

For each Stable-tier component, verify in **light** and **dark**:

1. Default, hover, active, focus-visible contrast
2. Disabled and loading (where applicable) are non-interactive and meet contrast targets
3. Invalid state is visible without relying on color alone
4. Selected state is distinguishable from hover
5. Forced-colors / high-contrast mode preserves focus rings

## Reduced motion

- CSS interaction transitions use `--z-motion-duration-interaction` (zeroed globally under `prefers-reduced-motion: reduce` or `data-motion="reduced"`)
- Overlay enter and exit animations use `--z-motion-duration-enter` and `--z-motion-duration-exit` (zeroed globally under `prefers-reduced-motion: reduce` or `data-motion="reduced"`)
- Components with `@keyframes` or looping animation require a component-level `animation: none` fallback under `prefers-reduced-motion: reduce`
- JS-driven motion (Carousel scroll) must call `prefersReducedMotion()` and use instant behavior when true

## Accessibility flags

Document-root flags override semantic tokens for contrast, motion, transparency, and link underline. See [ACCESSIBILITY-SEMANTICS.md](../../../ACCESSIBILITY-SEMANTICS.md) and [NAMING.md](./NAMING.md).

| Flag | Attribute | Verify |
| --- | --- | --- |
| High contrast | `data-contrast="high"` | Borders and secondary text remain legible; focus ring width increases |
| Reduced motion | `data-motion="reduced"` | No enter/exit animation; Carousel uses instant scroll |
| Reduced transparency | `data-transparency="reduced"` | Dialog/Drawer scrim is fully opaque |
| Always underline links | `data-link-underline="always"` | Link, Breadcrumb, and Navbar links show underline |
