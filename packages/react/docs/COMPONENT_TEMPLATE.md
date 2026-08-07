# Component: {ComponentName}

## Overview

{One sentence: what the component does.}

{One sentence: who uses it and for what job.}

## When to use

**Use when:**

- {Concrete product scenario — name the user task.}
- {Another scenario where this component is the right choice.}

**Do not use when:**

- {Anti-pattern — name the better component, e.g. Use `Link` instead.}
- {Another case where a sibling component fits better.}

In `apps/docs/src/components/{component-name}.docs.tsx`, add `whenToUsePreviews` with live mini-previews for each column:

- `use` — correct usage vignette for this component in a realistic context.
- `doNotUse` — the better alternative named in the anti-pattern bullets (not a duplicate of the good demo).

Prose bullets stay in this markdown file; previews are defined only in the docs registry.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import { {ComponentName} } from '@z-ux/ui/{component-name}';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `variant` | {if applicable} | |
| `size` | `sm`, `md`, `lg` | |
| `tone` | {if applicable} | |
| `disabled` | `boolean` | |
| `data-state` | {if applicable} | |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` | {yes/no} | |
| `icon` | {yes/no} | |

## Accessibility

{State the required label, `aria-label`, or `aria-labelledby` rule in one or two short sentences.}

## Keyboard

| Key | Action |
| --- | --- |
| {Key} | {Action} |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| {Part} | `--z-color-{token}` |

## Figma

| Figma | React |
| --- | --- |
| {Figma component} | `{ComponentName}` |
| {Variant} | `variant="{value}"` |

## Notes

- **SSR:** {notes}
- **Portal:** {yes/no}
- **Form:** {name/value/required behavior}

## Examples

```tsx
<{ComponentName}>
  {example}
</{ComponentName}>
```
