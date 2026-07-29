# Steps

## Overview

Steps shows progress through a multi-step flow. Steps marks each step as current, completed, or upcoming.

## When to use

**Use when:**

- You have a wizard or a checkout flow with ordered stages.
- Users need to see completed steps and remaining steps.

**Do not use when:**

- Steps are not sequential.
- Progress is better as a percentage bar.

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens
```

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import { Step, StepDescription, StepIndicator, Steps, StepTitle } from '@z-ui/react';
```

## API

| Prop | Component | Values | Default |
| --- | --- | --- | --- |
| `currentStep` | `Steps` | `number` | `1` |
| `label` | `Steps` | `string` | `"Progress"` |
| `step` | `Step`, `StepIndicator` | `number` | `1` |

### Data attributes

- `data-state="upcoming" | "current" | "completed"` on `Step` and `StepIndicator`
- `aria-current="step"` on the current `Step`

## Accessibility

Set `label` when `"Progress"` is not clear enough. Pair each step with a `StepTitle`.

## Keyboard

Steps is presentational. Pair Steps with focusable controls in the active step panel.

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Indicator current | `--z-color-background-primary`, `--z-color-text-on-solid` |
| Indicator completed | `--z-color-background-success-subtle`, `--z-color-text-success` |
| Title/description | `--z-text-label-*`, `--z-text-caption-*` |

## Figma

| Figma | React |
| --- | --- |
| Steps / Default | `<Steps>` |
| Step / Current | `<Step step={n}>` with matching `currentStep` |
| Step / Indicator | `<StepIndicator step={n}>` |

## Notes

- **SSR:** Safe. The import does not use browser globals.
- **Portal:** No.
- **Form:** Not a form control.

## Examples

```tsx
<Steps currentStep={2}>
  <Step step={1}>
    <StepIndicator step={1} />
    <StepTitle>Account</StepTitle>
    <StepDescription>Create your account</StepDescription>
  </Step>
  <Step step={2}>
    <StepIndicator step={2} />
    <StepTitle>Profile</StepTitle>
    <StepDescription>Add profile details</StepDescription>
  </Step>
</Steps>
```
