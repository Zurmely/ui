# Steps

## Purpose

Steps shows progress through a multi-step flow.

Steps marks each step as current, completed, or upcoming.

## Select when

- You have a wizard or a checkout flow with ordered stages.
- Users need to see completed steps and remaining steps.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Step, StepDescription, StepIndicator, Steps, StepTitle } from '@z-ux/ui';
```

## Compose

Use `Steps` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `currentStep` | for number; default is 1. |
| `label` | for string; default is "Progress". |
| `step` | for number; default is 1. |

## Style with tokens

- **Indicator current:** `--z-color-background-primary`, `--z-color-text-on-solid`
- **Indicator completed:** `--z-color-background-success-subtle`, `--z-color-text-success`
- **Title/description:** `--z-text-label-*`, `--z-text-caption-*`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- Steps are not sequential.
- Progress is better as a percentage bar.
- Do not recreate `Steps` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Breadcrumbs` — Shows the current page location within a hierarchy
- `Megamenu` — Large dropdown navigation panel
- `Navbar` — Top navigation bar with logo and links
- `Pagination` — Navigate between pages of content

## Human doc

[Steps.md](../../src/components/steps/Steps.md)
