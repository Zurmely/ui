# Status

## Overview

Status shows a tone-colored dot with an optional label.

Use Status for live or operational state, such as online, degraded, or error.

## When to use

**Use when:**

- You show service, connection, or process state next to other content.
- A dot and a short label are clearer than a full badge.

**Do not use when:**

- You need long-form messaging. Use `Alert`.
- You need only a text label without state color. Use `Badge`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Status } from '@z-ux/ui/status';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `tone` | `neutral`, `primary`, `success`, `warning`, `danger`, `info` | `neutral` |
| `size` | `sm`, `md`, `lg` | `md` |
| `label` | `ReactNode` | — |

### Data attributes

- `data-tone`, `data-size`

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` / `label` | No | Visible status label |

## Accessibility

Set visible text through `children` or `label`. Do not show state by color alone.

## Keyboard

Not focusable by default. No keyboard interactions.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Neutral | `--z-color-text-secondary` |
| Primary | `--z-color-text-primary` |
| Success | `--z-color-text-success` |
| Warning | `--z-color-text-warning` |
| Danger | `--z-color-text-danger` |
| Info | `--z-color-text-info` |
| `size="sm"` typography | `--z-text-badge-*` |
| `size="md"` typography | `--z-text-label-*` |
| `size="lg"` typography | `--z-text-control-*` |
| Indicator shape | `--z-radius-circle` |

## Figma

| Figma | React |
| --- | --- |
| Status / Success | `<Status tone="success">` |
| Status / Warning | `<Status tone="warning">` |
| Status / Danger | `<Status tone="danger">` |

## Notes

- **SSR:** Safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Status tone="success">Online</Status>
<Status tone="warning" size="sm" label="Degraded" />
```
