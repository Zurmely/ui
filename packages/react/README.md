# @z-ux/ui

Z-UI React component library. Components consume semantic design tokens from `@z-ux/tokens` and follow the naming conventions in [docs/NAMING.md](./docs/NAMING.md).

`@z-ux/ui` and `@z-ux/tokens` use [lockstep SemVer](../../VERSIONING.md) — always install matching versions.

## Install

```bash
pnpm add @z-ux/ui @z-ux/tokens react react-dom
```

## Setup

Import the token stylesheet and set a theme on a root element:

```tsx
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/ui/styles.css';

// In your app root:
<div data-theme="light">{/* or data-theme="dark" */}</div>
```

## Usage

Import components from the package root or per-component entry points:

```tsx
import { Button, TextField, Field, FieldLabel } from '@z-ux/ui';
// or
import { Button } from '@z-ux/ui/button';
```

## Components

Human-readable API docs live next to each component. For agent-oriented selection and composition guides, see [docs/ai/README.md](./docs/ai/README.md).

| Component | Import path | Documentation |
| --- | --- | --- |
| Accordion | `@z-ux/ui/accordion` | [Accordion.md](./src/components/accordion/Accordion.md) |
| Alert | `@z-ux/ui/alert` | [Alert.md](./src/components/alert/Alert.md) |
| Avatar | `@z-ux/ui/avatar` | [Avatar.md](./src/components/avatar/Avatar.md) |
| Badge | `@z-ux/ui/badge` | [Badge.md](./src/components/badge/Badge.md) |
| Breadcrumbs | `@z-ux/ui` | [Breadcrumbs.md](./src/components/breadcrumbs/Breadcrumbs.md) |
| Button | `@z-ux/ui/button` | [Button.md](./src/components/button/Button.md) |
| Calendar | `@z-ux/ui/calendar` | [Calendar.md](./src/components/calendar/Calendar.md) |
| Card | `@z-ux/ui/card` | [Card.md](./src/components/card/Card.md) |
| Carousel | `@z-ux/ui/carousel` | [Carousel.md](./src/components/carousel/Carousel.md) |
| Checkbox | `@z-ux/ui/checkbox` | [Checkbox.md](./src/components/checkbox/Checkbox.md) |
| Dialog | `@z-ux/ui/dialog` | [Dialog.md](./src/components/dialog/Dialog.md) |
| Drawer | `@z-ux/ui/drawer` | [Drawer.md](./src/components/drawer/Drawer.md) |
| Field | `@z-ux/ui/field` | [Field.md](./src/components/field/Field.md) |
| File Input | `@z-ux/ui/file-input` | [FileInput.md](./src/components/file-input/FileInput.md) |
| Filter | `@z-ux/ui/filter` | [Filter.md](./src/components/filter/Filter.md) |
| Floating Action Button | `@z-ux/ui/floating-action-button` | [FloatingActionButton.md](./src/components/floating-action-button/FloatingActionButton.md) |
| Icon Button | `@z-ux/ui/icon-button` | [IconButton.md](./src/components/icon-button/IconButton.md) |
| Indicator | `@z-ux/ui/indicator` | [Indicator.md](./src/components/indicator/Indicator.md) |
| Link | `@z-ux/ui/link` | [Link.md](./src/components/link/Link.md) |
| List Item | `@z-ux/ui/list-item` | [ListItem.md](./src/components/list-item/ListItem.md) |
| Megamenu | `@z-ux/ui` | [Megamenu.md](./src/components/megamenu/Megamenu.md) |
| Menu | `@z-ux/ui/menu` | [Menu.md](./src/components/menu/Menu.md) |
| Navbar | `@z-ux/ui` | [Navbar.md](./src/components/navbar/Navbar.md) |
| OTP Input | `@z-ux/ui/otp-input` | [OTPInput.md](./src/components/otp-input/OTPInput.md) |
| Pagination | `@z-ux/ui` | [Pagination.md](./src/components/pagination/Pagination.md) |
| Popover | `@z-ux/ui/popover` | [Popover.md](./src/components/popover/Popover.md) |
| Progress | `@z-ux/ui/progress` | [Progress.md](./src/components/progress/Progress.md) |
| Radial Progress | `@z-ux/ui/radial-progress` | [RadialProgress.md](./src/components/radial-progress/RadialProgress.md) |
| Radio Group | `@z-ux/ui/radio-group` | [RadioGroup.md](./src/components/radio-group/RadioGroup.md) |
| Range Slider | `@z-ux/ui/range-slider` | [RangeSlider.md](./src/components/range-slider/RangeSlider.md) |
| Rating | `@z-ux/ui/rating` | [Rating.md](./src/components/rating/Rating.md) |
| Select | `@z-ux/ui/select` | [Select.md](./src/components/select/Select.md) |
| Separator | `@z-ux/ui/separator` | [Separator.md](./src/components/separator/Separator.md) |
| Skeleton | `@z-ux/ui/skeleton` | [Skeleton.md](./src/components/skeleton/Skeleton.md) |
| Spinner | `@z-ux/ui/spinner` | [Spinner.md](./src/components/spinner/Spinner.md) |
| Stack | `@z-ux/ui/stack` | [Stack.md](./src/components/stack/Stack.md) |
| Status | `@z-ux/ui/status` | [Status.md](./src/components/status/Status.md) |
| Steps | `@z-ux/ui` | [Steps.md](./src/components/steps/Steps.md) |
| Switch | `@z-ux/ui/switch` | [Switch.md](./src/components/switch/Switch.md) |
| Table | `@z-ux/ui/table` | [Table.md](./src/components/table/Table.md) |
| Tabs | `@z-ux/ui/tabs` | [Tabs.md](./src/components/tabs/Tabs.md) |
| Text Field | `@z-ux/ui/text-field` | [TextField.md](./src/components/text-field/TextField.md) |
| Textarea | `@z-ux/ui/textarea` | [Textarea.md](./src/components/textarea/Textarea.md) |
| Timeline | `@z-ux/ui/timeline` | [Timeline.md](./src/components/timeline/Timeline.md) |
| Toast | `@z-ux/ui/toast` | [Toast.md](./src/components/toast/Toast.md) |
| Toolbar | `@z-ux/ui/toolbar` | [Toolbar.md](./src/components/toolbar/Toolbar.md) |
| Tooltip | `@z-ux/ui/tooltip` | [Tooltip.md](./src/components/tooltip/Tooltip.md) |
| Theme Controller | `@z-ux/ui/theme-controller` | [ThemeController.md](./src/components/theme-controller/ThemeController.md) |
| Validator | `@z-ux/ui/validator` | [Validator.md](./src/components/validator/Validator.md) |

## Naming conventions

See [docs/NAMING.md](./docs/NAMING.md) for shared vocabulary: sizes, variants, tones, states, slots, and CSS hooks.

## Parity manifest

See [parity-manifest.json](./parity-manifest.json) for Figma/React naming alignment (Figma fields pending).

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm typecheck
pnpm lint
```
