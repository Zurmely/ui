# Card

## Overview

Card groups related content on a raised fill surface (`background.surface` on the page).

Card has optional header, body, and footer slots.

## When to use

**Use when:**

- You show a self-contained unit of information, such as a plan summary, a profile snippet, or a settings group.
- Content needs visual separation from the page background.

**Do not use when:**

- The surface is interactive navigation. Use links or list items.
- You need a full-page layout container. Use page layout primitives.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@z-ux/ui/card';
```

## API

Composable slots. No variant props on the root.

| Part | Required | Notes |
| --- | --- | --- |
| `Card` | Yes | Surface container |
| `CardHeader` | No | Title and description group |
| `CardTitle` | No | Renders `h3` |
| `CardDescription` | No | Supporting caption |
| `CardContent` | No | Primary body |
| `CardFooter` | No | Actions or metadata |

## Accessibility

Use `CardTitle` for the card heading. Make sure footer actions have accessible names.

## Keyboard

Not focusable by default. Each interactive child manages its own keyboard behavior.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Surface | `--z-color-background-surface`, `--z-radius-container` (raised fill; no drop shadow) |
| Title | `--z-color-text-primary`, `--z-text-title-*` |
| Description | `--z-color-text-tertiary`, `--z-text-caption-*` |
| Content | `--z-color-text-primary`, `--z-text-body-*` |
| Footer | `--z-color-text-secondary` |

## Figma

| Figma | React |
| --- | --- |
| Card | `<Card>` |
| Card / Header | `<CardHeader>` |
| Card / Title | `<CardTitle>` |
| Card / Description | `<CardDescription>` |
| Card / Content | `<CardContent>` |
| Card / Footer | `<CardFooter>` |

## Notes

- **SSR:** SSR is safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Not a form control. It can wrap form fields.

## Examples

```tsx
<Card>
  <CardHeader>
    <CardTitle>Pro plan</CardTitle>
    <CardDescription>Billed monthly</CardDescription>
  </CardHeader>
  <CardContent>$12 / month</CardContent>
  <CardFooter>Upgrade</CardFooter>
</Card>
```
