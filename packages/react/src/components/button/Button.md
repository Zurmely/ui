# Button

## Overview

Button starts actions and form submissions.

Use it for primary, secondary, ghost, and destructive actions in forms, dialogs, and toolbars.

## When to use

**Use when:**

- You submit a form or start a primary or secondary action.
- You need native `<button>` semantics.

**Do not use when:**

- You navigate to another page. Use `Link` instead.
- You show an icon-only action without an accessible name. Use `IconButton` with `aria-label`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { Button } from '@z-ux/ui/button';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `primary`, `secondary`, `ghost`, `danger` | `primary` |
| `size` | `sm`, `md`, `lg` | `md` |
| `isLoading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `icon` | `ReactNode` | — |
| `type` | native button type | `button` |
| `asChild` | `boolean` | `false` |

### Data attributes

- `data-variant`, `data-size`, `data-loading`, `data-disabled`

When `disabled` or `isLoading` is true, the root sets `data-disabled="true"`. With `asChild`, the slotted host also receives `aria-disabled`, `tabIndex={-1}`, no `href`, and suppressed click activation (same contract as `Link`).

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` | Yes (unless icon-only with `aria-label`) | Button label |
| `icon` | No | Leading icon |

## Accessibility

Set visible text in `children`, or give an explicit `aria-label` when the button has no visible label.

## Keyboard

| Key | Action |
| --- | --- |
| `Enter` / `Space` | Activates the button |
| `Tab` | Moves focus to/from the button |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Primary fill | `--z-color-background-primary`, `.hover`, `.active`, `.disabled`, `--z-color-border-primary` |
| Secondary surface | `--z-color-background-surface`, `--z-color-border-subtle`, `--z-color-border-default` |
| Ghost hover | `--z-color-background-subtle` |
| Danger fill | `--z-color-background-danger`, `.hover`, `.active`, `.disabled`, `--z-color-border-danger` |
| Primary label | `--z-color-text-on-primary` |
| Danger label | `--z-color-text-on-solid` |
| Disabled label | `--z-color-text-disabled` |
| Focus ring | `--z-color-focus-ring` |
| Control padding | `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x` |
| Size `sm` / `lg` | `--z-spacing-inset-control-compact-*`, `--z-spacing-inset-control-comfortable-*` |
| Icon gap | `--z-spacing-gap-inline`, `--z-spacing-gap-inline-tight` |
| Corner radius | `--z-radius-control` |
| Control typography | `--z-text-control-font-family`, `--z-text-control-size`, `--z-text-control-weight`, `--z-text-control-line-height` |
| Hover/pressed motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Button / Primary | `<Button variant="primary">` |
| Button / Secondary | `<Button variant="secondary">` |
| Button / Ghost | `<Button variant="ghost">` |
| Button / Danger | `<Button variant="danger">` |

## Notes

- **SSR:** SSR is safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Renders native `<button>`. Default `type` is `"button"`. Respects `type="submit"` and `disabled`.
- **asChild + isLoading:** When `asChild` is true, `isLoading` disables the slotted host and does not render a spinner.

## Examples

```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary" isLoading>Loading</Button>
<Button variant="danger" disabled>Delete</Button>
```
