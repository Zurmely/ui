# Breadcrumbs

## Overview

Breadcrumbs show the current page location in a site hierarchy. Breadcrumbs let you go to ancestor pages with one click.

## When to use

**Use when:**

- Users need context about where they are in a multi-level structure.
- Users must reach ancestor pages with one click.

**Do not use when:**

- The hierarchy is flat or only one level deep.
- A sidebar or tabs work better for navigation.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumbs,
  BreadcrumbSeparator,
} from '@z-ui/react';
```

## API

| Prop | Component | Values | Default |
| --- | --- | --- | --- |
| `label` | `Breadcrumbs` | `string` | `"Breadcrumb"` |
| `current` | `BreadcrumbLink` | `boolean` | `false` |

### Data attributes

- `aria-current="page"` on the current breadcrumb link

### Slots

| Slot | Required | Notes |
| --- | --- | --- |
| `children` | Yes | `BreadcrumbItem` and `BreadcrumbSeparator` children |

## Accessibility

Set `label` on `Breadcrumbs` when the default `"Breadcrumb"` label is not descriptive enough.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Moves focus between breadcrumb links |
| `Enter` | Activates the focused link |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Link | `--z-color-text-secondary`, `--z-color-text-link-hover` |
| Current page | `--z-color-text-primary` |
| Separator | `--z-color-text-tertiary` |
| Caption typography | `--z-text-caption-*` |

## Figma

| Figma | React |
| --- | --- |
| Breadcrumbs / Default | `<Breadcrumbs>` |
| Breadcrumb / Current | `<BreadcrumbLink current>` |

## Notes

- **SSR:** SSR is safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Breadcrumbs>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink current>Settings</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumbs>
```
