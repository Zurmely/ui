# Tabs

## Overview

Tabs organize related content into switchable panels.

Users can move between views without leaving the page.

## When to use

**Use when:**

- You switch between closely related views in the same context.
- Each panel has distinct content. The content does not need to be visible at once.

**Do not use when:**

- You navigate to a different page. Use `Link` or routing instead.
- All content must stay visible. Use headings or accordions.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@z-ux/ui/tabs';
```

## API

| Prop / attribute | Values | Notes |
| --- | --- | --- |
| `defaultValue` | `string` | Uncontrolled initial tab |
| `value` | `string` | Controlled active tab |
| `onValueChange` | `(value: string) => void` | Controlled change handler |
| `orientation` | `horizontal`, `vertical` | Layout direction |
| `data-state` | `active`, `inactive` | On triggers |

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `TabsList` | Yes | Tab button group |
| `TabsTrigger` | Yes | One per tab; set `value` |
| `TabsContent` | Yes | Panel for each tab; set matching `value` |

## Accessibility

Each `TabsTrigger` must have visible text or an `aria-label`. Radix associates panels with triggers through matching `value` props.

## Keyboard

| Key | Action |
| --- | --- |
| `Arrow` keys | Move focus between triggers |
| `Home` / `End` | First / last trigger |
| `Enter` / `Space` | Activate focused trigger |
| `Tab` | Move focus into/out of tab panel |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Tab list | Transparent row; `--z-spacing-gap-inline` between triggers |
| Unselected trigger | `--z-color-text-secondary`, transparent bottom border |
| Selected trigger | `--z-color-text-primary`, `--z-color-border-primary` bottom border (2px) |
| Disabled trigger | `--z-color-text-disabled` |
| Panel offset | `--z-spacing-stack-section` above panel content |
| Focus ring | `--z-color-focus-ring` on panel focus-visible |
| Control typography | `--z-text-control-*` |
| Trigger padding | `--z-spacing-inset-control-y`, `--z-spacing-inset-control-x` |
| Active trigger motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| Tabs / List | `<TabsList>` |
| Tabs / Trigger | `<TabsTrigger value="…">` |
| Tabs / Panel | `<TabsContent value="…">` |

## Notes

- **SSR:** Safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Tabs do not submit values. Use hidden inputs when the form needs state.

## Examples

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="security">Security settings</TabsContent>
</Tabs>
```
