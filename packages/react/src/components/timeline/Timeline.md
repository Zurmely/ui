# Timeline

## Overview

Timeline shows a sequence of events with markers, dates, titles, and descriptions. Timeline supports vertical and horizontal layouts.

## When to use

**Use when:**

- You show activity history, release notes, or process steps over time.
- Events have a clear chronological order.

**Do not use when:**

- You need non-sequential navigation. Use tabs or a stepper.
- Data is tabular. Use `Table`.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import { Timeline, TimelineItem } from '@z-ui/react/timeline';
```

## API

| Prop | Component | Values | Default |
| --- | --- | --- | --- |
| `orientation` | `Timeline` | `horizontal`, `vertical` | `vertical` |

### Data attributes

- `data-orientation` on `Timeline`

### TimelineItem slots

| Slot | Purpose |
| --- | --- |
| `date` | Timestamp or period label |
| `title` | Event heading |
| `description` | Supporting text (or use `children`) |
| `icon` | Custom marker content |
| `children` | Custom body (overrides `description`) |

## Accessibility

Set `aria-label` on `Timeline` when the list purpose is not clear from surrounding content. Markers are decorative (`aria-hidden`).

## Keyboard

List semantics apply. Horizontal timelines scroll horizontally on narrow viewports.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Connector line | `--z-color-border-subtle` |
| Marker dot | `--z-color-background-primary`, `--z-radius-circle` |
| Marker ring | `--z-elevation-ring` |
| Date | `--z-text-caption-*`, `--z-color-text-secondary` |
| Title | `--z-text-title-*`, `--z-color-text-primary` |
| Description | `--z-text-body-*`, `--z-color-text-secondary` |
| Spacing | `--z-spacing-stack-component`, `--z-spacing-gap-inline`, `--z-spacing-gap-section` |

## Figma

| Figma | React |
| --- | --- |
| Timeline / Vertical | `<Timeline orientation="vertical">` |
| Timeline / Horizontal | `<Timeline orientation="horizontal">` |

## Notes

- **SSR:** Safe.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Timeline aria-label="Project history">
  <TimelineItem title="Kickoff" date="Jan 5" description="Team aligned on scope." />
  <TimelineItem title="Launch" date="Apr 12" description="Released v1." />
</Timeline>
```
