# CodeBlock

## Overview

CodeBlock shows short code text or a longer code sample.

Use the single variant for token names and other short identifiers.

## When to use

**Use when:**

- You show a token name, a CSS variable, or a short command.
- You show a multi-line code sample with syntax highlighting.

**Do not use when:**

- The content is a status label. Use `Badge`.
- The content is an interactive control. Use `Button` or `Link`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { CodeBlock } from '@z-ux/ui/code-block';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `single`, `multi` | `single` |
| `language` | string | `tsx` for multi highlighting when omitted |
| `code` | string | — |

### Data attributes

- `data-variant`

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` | No | Code text when `code` is not set. Non-string, non-number children resolve to an empty string. |

## Accessibility

`variant="single"` renders `<code>` inside a `<span>`. `variant="multi"` renders `<pre>`.
The copy control is an `IconButton` with an accessible name (`Copy code` / `Copied`).
Set clear surrounding context so the meaning of the code is clear.

## Keyboard

The copy control is focusable. Activate it with `Enter` or `Space`.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Type size / weight / line height | `--z-text-caption-*` |
| Font family | `--z-font-family-mono` |
| Text | `--z-color-text-primary` |
| Single fill | `--z-color-background-muted`, `--z-color-background-subtle` (hover/focus-within) |
| Multi fill | `--z-color-background-subtle`, `--z-color-background-muted` (header) |
| Border | `--z-color-border-subtle`, `--z-color-border-default` (single hover) |
| Radius | `--z-radius-control-compact` (single), `--z-radius-surface` (multi) |
| Spacing | `--z-spacing-inset-box-tight`, `--z-spacing-inset-control-compact-*`, `--z-spacing-inset-container`, `--z-spacing-gap-inline-tight` |
| Motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |
| Language label | `--z-text-badge-*`, `--z-color-text-tertiary` |
| Highlight (comments) | `--z-color-text-tertiary` |
| Highlight (strings) | `--z-color-text-success` |
| Highlight (keywords / functions) | `--z-color-text-info` |
| Highlight (numbers / variables) | `--z-color-text-warning` |
| Highlight (punctuation) | `--z-color-text-secondary` |

## Figma

| Figma | React |
| --- | --- |
| CodeBlock / Single | `<CodeBlock variant="single">` |
| CodeBlock / Multi | `<CodeBlock variant="multi">` |

## Notes

- **SSR:** Safe at import. Clipboard write runs only on user click.
- **Portal:** No.
- **Form:** Not a form control.
- **Font family:** Uses `--z-font-family-mono` because there is no `text.code` semantic role yet.
- **Highlighting:** Multi uses `prism-react-renderer` with semantic color variables.

## Examples

```tsx
<CodeBlock variant="single">--z-color-text-primary</CodeBlock>

<CodeBlock
  variant="multi"
  language="tsx"
  code={`import { Button } from '@z-ux/ui';`}
/>
```
