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

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import { {ComponentName} } from '@z-ui/react/{component-name}';
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
