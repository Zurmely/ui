# Accordion

## Purpose

Accordion shows and hides sections of related content. By default, one section is open at a time. If you set `type="multiple"`, more than one section can be open. You can scan dense information with Accordion.

## Select when

- You group related content that does not all need to be visible at once.
- You show an FAQ, a settings panel, or a filter panel with expandable sections.

## Prefer instead

| Situation | Use |
| --- | --- |
| You navigate between views. Use | `Tabs` |

## Import

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@z-ui/react/accordion';
```

## Compose

Use `Accordion` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| — | See human doc API table for props. |

## Style with tokens

- **Item border:** `--z-color-border-subtle`
- **Trigger text:** `--z-color-text-primary`, `--z-text-control-*`
- **Trigger hover:** `--z-color-background-subtle`
- **Content text:** `--z-color-text-secondary`, `--z-text-body-*`
- **Content padding:** `--z-spacing-inset-control-x`, `--z-spacing-inset-box`
- **Motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- **Focus ring:** `--z-color-focus-ring`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- All content must stay visible. Use headings or tabs.
- You navigate between views. Use `Tabs`.
- Do not recreate `Accordion` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Dialog` — Modal overlay for focused tasks and confirmations
- `Drawer` — Slide-in panel for secondary content
- `Menu` — Dropdown menu for actions
- `Popover` — Floating content anchored to a trigger

## Human doc

[Accordion.md](../../src/components/accordion/Accordion.md)
