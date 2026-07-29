# Alert

## Overview

Alert shows an important status message. Alert uses a subtle background for each tone. Alert has optional `title`, `description`, and `action` slots.

## When to use

**Use when:**

- You show success, warning, error, or informational feedback.
- A persistent inline message needs the emphasis of a tone.

**Do not use when:**

- A transient toast is enough. Use a toast pattern.
- A short inline label is enough. Use `Badge`.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import { Alert } from '@z-ui/react/alert';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `tone` | `neutral`, `primary`, `success`, `warning`, `danger`, `info` | `neutral` |

### Data attributes

- `data-tone`

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `title` | No | Alert heading |
| `description` | No | Supporting text. Falls back to `children` |
| `action` | No | Secondary action, such as an undo link |
| `children` | No | Acts as description when you omit `description` |

## Accessibility

Set `title` or `description`, or `children`, with meaningful text. The root has `role="alert"`. Screen readers announce the alert at once.

## Keyboard

Focus behavior depends on the content in the `action` slot. The alert container is not focusable.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Neutral | `--z-color-background-subtle`, `--z-color-text-primary`, `--z-color-border-subtle` |
| Primary | `--z-color-background-primary-subtle`, `--z-color-text-primary`, `--z-color-border-primary` |
| Success | `--z-color-background-success-subtle`, `--z-color-text-success`, `--z-color-border-success` |
| Warning | `--z-color-background-warning-subtle`, `--z-color-text-warning`, `--z-color-border-warning` |
| Danger | `--z-color-background-danger-subtle`, `--z-color-text-danger`, `--z-color-border-danger` |
| Info | `--z-color-background-info-subtle`, `--z-color-text-info`, `--z-color-border-info` |
| Container padding | `--z-spacing-inset-box` |
| Content gap | `--z-spacing-gap-inline` |
| Corner radius | `--z-radius-surface` |
| Title typography | `--z-text-title-*` |
| Description typography | `--z-text-body-*` |
| Description color | `--z-color-text-primary` (title keeps tone text for semantic emphasis) |

## Figma

| Figma | React |
| --- | --- |
| Alert / Neutral | `<Alert tone="neutral">` |
| Alert / Success | `<Alert tone="success">` |
| Alert / Warning | `<Alert tone="warning">` |
| Alert / Danger | `<Alert tone="danger">` |
| Alert / Info | `<Alert tone="info">` |

## Notes

- **SSR:** SSR is safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Not a form control. Content in the `action` slot can link or trigger buttons.

## Examples

```tsx
<Alert tone="success" title="Saved" description="Your changes were saved." />
<Alert tone="danger" title="Error" action={<Link href="/retry">Retry</Link>}>
  Something went wrong.
</Alert>
```
