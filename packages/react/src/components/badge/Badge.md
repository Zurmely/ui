# Badge

## Overview

Badge shows a short status label or a count.

Most tones use a subtle fill and matching status text, in the light theme and in the dark theme. Status tones do not use a colored border. The fill and the text carry the meaning. `tone="primary"` uses the solid primary fill and `--z-color-text-on-primary`.

## When to use

**Use when:**

- You show a status, a category, or a count next to other text.
- A short label needs the emphasis of a tone, but not the emphasis of `Alert`.

**Do not use when:**

- You show a critical system message. Use `Alert`.
- The content is interactive. Use `Button` or `Link`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Badge } from '@z-ux/ui/badge';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `tone` | `neutral`, `primary`, `success`, `warning`, `danger`, `info` | `neutral` |
| `size` | `sm`, `md`, `lg` | `md` |

### Data attributes

- `data-tone`, `data-size`

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` | Yes | Badge label |

## Accessibility

Set visible text in `children`. A badge is often decorative when it sits next to descriptive text. Make sure the surrounding text shows the meaning.

## Keyboard

Not focusable by default. No keyboard interactions.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Neutral | `--z-color-background-subtle`, `--z-color-text-secondary` |
| Primary | `--z-color-background-primary`, `--z-color-text-on-primary`, `--z-color-border-primary` |
| Success | `--z-color-background-success-subtle`, `--z-color-text-success` |
| Warning | `--z-color-background-warning-subtle`, `--z-color-text-warning` |
| Danger | `--z-color-background-danger-subtle`, `--z-color-text-danger` |
| Info | `--z-color-background-info-subtle`, `--z-color-text-info` |
| Corner radius | `--z-radius-pill` |
| `size="sm"` padding | `--z-spacing-inset-box-tight`, `--z-spacing-inset-control-compact-x` |
| `size="md"` padding | `--z-spacing-inset-control-compact-y`, `--z-spacing-inset-control-x` |
| `size="lg"` padding | `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x` |
| `size="sm"` typography | `--z-text-badge-*` |
| `size="md"` typography | `--z-text-label-*` |
| `size="lg"` typography | `--z-text-control-*` |

## Figma

| Figma | React |
| --- | --- |
| Badge / Neutral | `<Badge tone="neutral">` |
| Badge / Primary | `<Badge tone="primary">` |
| Badge / Success | `<Badge tone="success">` |
| Badge / Warning | `<Badge tone="warning">` |
| Badge / Danger | `<Badge tone="danger">` |
| Badge / Info | `<Badge tone="info">` |

## Notes

- **SSR:** SSR is safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Badge tone="success">Active</Badge>
<Badge tone="warning" size="sm">Pending</Badge>
```
