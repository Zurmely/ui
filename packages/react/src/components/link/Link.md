# Link

## Overview

Link shows styled navigation to another location.

Link uses semantic tokens for link text color in the light theme and in the dark theme.

## When to use

**Use when:**

- You navigate to another page, route, or external URL.
- You add inline text navigation within content.

**Do not use when:**

- You trigger an in-page action. Use `Button` or `IconButton`.
- The control must not navigate. Use a button instead.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import { Link } from '@z-ux/ui/link';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `disabled` | `boolean` | `false` |
| `href` | `string` | — |

### Data attributes

- `data-disabled`

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` | Yes | Link label text |

## Accessibility

Set visible text in `children` or an explicit `aria-label` when the link has no visible label.

## Keyboard

| Key | Action |
| --- | --- |
| `Enter` | Activates the link |
| `Tab` | Moves focus to/from the link |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Default | `--z-color-text-link` |
| Hover | `--z-color-text-link-hover` |
| Disabled | `--z-color-text-disabled` |
| Focus ring | `--z-color-focus-ring` |
| Control typography | `--z-text-control-*` |

## Figma

| Figma | React |
| --- | --- |
| Link / Default | `<Link href="…">` |
| Link / Disabled | `<Link href="…" disabled>` |

## Notes

- **SSR:** Link is safe for SSR. Link has no browser globals at import.
- **Portal:** No.
- **Form:** Link is not a form control. Use Link for navigation only.

## Examples

```tsx
<Link href="/settings">Settings</Link>
<Link href="/billing" disabled>Billing</Link>
```
