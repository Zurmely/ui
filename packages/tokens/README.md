# @z-ux/tokens

Semantic CSS design tokens for Z-UI: color, spacing, radius, typography, motion, and elevation.

Versioning follows [lockstep SemVer](../../VERSIONING.md) with `@z-ux/ui`.

## Install

```bash
pnpm add @z-ux/tokens
```

## Usage

Import the token stylesheets your app needs:

```css
@import '@z-ux/tokens/colors.css';
@import '@z-ux/tokens/sizes.css';
@import '@z-ux/tokens/text.css';
@import '@z-ux/tokens/motion.css';
@import '@z-ux/tokens/elevation.css';
```

Set a theme on a root element:

```html
<div data-theme="light"><!-- or data-theme="dark" --></div>
```

## Exports

| Import path | Description |
| --- | --- |
| `@z-ux/tokens/colors.css` | Semantic color variables (light/dark) |
| `@z-ux/tokens/sizes.css` | Spacing, radius, and size scale |
| `@z-ux/tokens/text.css` | Typography roles and properties |
| `@z-ux/tokens/motion.css` | Duration and easing aliases |
| `@z-ux/tokens/elevation.css` | Fill-based depth roles (`elevation.ring` halo; raised/overlay/modal reserved at `none`) |

## License

MIT
