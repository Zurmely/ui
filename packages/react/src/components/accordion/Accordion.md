# Accordion

## Overview

Accordion shows and hides sections of related content.

`type="single"` allows at most one open section. No section is open until you set `defaultValue` or `value`.

## When to use

**Use when:**

- You group related content that does not all need to be visible at once.
- You show an FAQ, a settings panel, or a filter panel with expandable sections.

**Do not use when:**

- All content must stay visible. Use headings or tabs.
- You navigate between views. Use `Tabs`.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens
```

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@z-ux/ui/accordion';
```

## API

Accordion uses `@radix-ui/react-accordion`. Accordion supports the Radix `type`, `value`, `defaultValue`, `collapsible`, and `disabled` props on items.

| Part | Required | Notes |
| --- | --- | --- |
| `Accordion` | Yes | Root. Set `type="single"` or `type="multiple"` |
| `AccordionItem` | Yes | Each item needs a unique `value` |
| `AccordionTrigger` | Yes | The button toggles the section. A chevron shows the open state |
| `AccordionContent` | Yes | The panel shows when the item is open |

### Data attributes

- `data-state="open" | "closed"` on trigger and content (Radix)

## Accessibility

Put visible text in `AccordionTrigger`. The trigger of each item labels its panel.

## Keyboard

| Key | Action |
| --- | --- |
| `Enter` / `Space` | Toggle the focused section |
| `ArrowDown` / `ArrowUp` | Move focus between triggers |
| `Home` / `End` | Go to the first or last trigger |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Item border | `--z-color-border-subtle` |
| Trigger text | `--z-color-text-primary`, `--z-text-control-*` |
| Trigger hover | `--z-color-background-subtle` |
| Content text | `--z-color-text-secondary`, `--z-text-body-*` |
| Content padding | `--z-spacing-inset-control-x`, `--z-spacing-inset-box` |
| Motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |
| Focus ring | `--z-color-focus-ring` |

## Figma

| Figma | React |
| --- | --- |
| Accordion / Item | `<AccordionItem value="…">` |
| Accordion / Trigger | `<AccordionTrigger>` |
| Accordion / Content | `<AccordionContent>` |

## Notes

- **SSR:** SSR is safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Accordion type="single" collapsible defaultValue="billing">
  <AccordionItem value="billing">
    <AccordionTrigger>Billing</AccordionTrigger>
    <AccordionContent>Update payment method and invoices.</AccordionContent>
  </AccordionItem>
</Accordion>
```
