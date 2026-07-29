# @z-ui/react

Z-UI React component library. Components consume semantic design tokens from `@z-ui/tokens` and follow the naming conventions in [docs/NAMING.md](./docs/NAMING.md).

## Install

```bash
pnpm add @z-ui/react @z-ui/tokens react react-dom
```

## Setup

Import the token stylesheet and set a theme on a root element:

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/react/styles.css';

// In your app root:
<div data-theme="light">{/* or data-theme="dark" */}</div>
```

## Usage

Import components from the package root or per-component entry points:

```tsx
import { Button, TextField, Field, FieldLabel } from '@z-ui/react';
// or
import { Button } from '@z-ui/react/button';
```

## Components

| Component | Import path | Documentation |
| --- | --- | --- |
| Accordion | `@z-ui/react/accordion` | [Accordion.md](./src/components/accordion/Accordion.md) |
| Alert | `@z-ui/react/alert` | [Alert.md](./src/components/alert/Alert.md) |
| Avatar | `@z-ui/react/avatar` | [Avatar.md](./src/components/avatar/Avatar.md) |
| Badge | `@z-ui/react/badge` | [Badge.md](./src/components/badge/Badge.md) |
| Breadcrumbs | `@z-ui/react` | [Breadcrumbs.md](./src/components/breadcrumbs/Breadcrumbs.md) |
| Button | `@z-ui/react/button` | [Button.md](./src/components/button/Button.md) |
| Calendar | `@z-ui/react/calendar` | [Calendar.md](./src/components/calendar/Calendar.md) |
| Card | `@z-ui/react/card` | [Card.md](./src/components/card/Card.md) |
| Carousel | `@z-ui/react/carousel` | [Carousel.md](./src/components/carousel/Carousel.md) |
| Checkbox | `@z-ui/react/checkbox` | [Checkbox.md](./src/components/checkbox/Checkbox.md) |
| Dialog | `@z-ui/react/dialog` | [Dialog.md](./src/components/dialog/Dialog.md) |
| Drawer | `@z-ui/react/drawer` | [Drawer.md](./src/components/drawer/Drawer.md) |
| Field | `@z-ui/react/field` | [Field.md](./src/components/field/Field.md) |
| File Input | `@z-ui/react/file-input` | [FileInput.md](./src/components/file-input/FileInput.md) |
| Filter | `@z-ui/react/filter` | [Filter.md](./src/components/filter/Filter.md) |
| Floating Action Button | `@z-ui/react/floating-action-button` | [FloatingActionButton.md](./src/components/floating-action-button/FloatingActionButton.md) |
| Icon Button | `@z-ui/react/icon-button` | [IconButton.md](./src/components/icon-button/IconButton.md) |
| Indicator | `@z-ui/react/indicator` | [Indicator.md](./src/components/indicator/Indicator.md) |
| Link | `@z-ui/react/link` | [Link.md](./src/components/link/Link.md) |
| List Item | `@z-ui/react/list-item` | [ListItem.md](./src/components/list-item/ListItem.md) |
| Megamenu | `@z-ui/react` | [Megamenu.md](./src/components/megamenu/Megamenu.md) |
| Menu | `@z-ui/react/menu` | [Menu.md](./src/components/menu/Menu.md) |
| Navbar | `@z-ui/react` | [Navbar.md](./src/components/navbar/Navbar.md) |
| OTP Input | `@z-ui/react/otp-input` | [OTPInput.md](./src/components/otp-input/OTPInput.md) |
| Pagination | `@z-ui/react` | [Pagination.md](./src/components/pagination/Pagination.md) |
| Popover | `@z-ui/react/popover` | [Popover.md](./src/components/popover/Popover.md) |
| Progress | `@z-ui/react/progress` | [Progress.md](./src/components/progress/Progress.md) |
| Radial Progress | `@z-ui/react/radial-progress` | [RadialProgress.md](./src/components/radial-progress/RadialProgress.md) |
| Radio Group | `@z-ui/react/radio-group` | [RadioGroup.md](./src/components/radio-group/RadioGroup.md) |
| Range Slider | `@z-ui/react/range-slider` | [RangeSlider.md](./src/components/range-slider/RangeSlider.md) |
| Rating | `@z-ui/react/rating` | [Rating.md](./src/components/rating/Rating.md) |
| Select | `@z-ui/react/select` | [Select.md](./src/components/select/Select.md) |
| Separator | `@z-ui/react/separator` | [Separator.md](./src/components/separator/Separator.md) |
| Skeleton | `@z-ui/react/skeleton` | [Skeleton.md](./src/components/skeleton/Skeleton.md) |
| Spinner | `@z-ui/react/spinner` | [Spinner.md](./src/components/spinner/Spinner.md) |
| Stack | `@z-ui/react/stack` | [Stack.md](./src/components/stack/Stack.md) |
| Status | `@z-ui/react/status` | [Status.md](./src/components/status/Status.md) |
| Steps | `@z-ui/react` | [Steps.md](./src/components/steps/Steps.md) |
| Switch | `@z-ui/react/switch` | [Switch.md](./src/components/switch/Switch.md) |
| Table | `@z-ui/react/table` | [Table.md](./src/components/table/Table.md) |
| Tabs | `@z-ui/react/tabs` | [Tabs.md](./src/components/tabs/Tabs.md) |
| Text Field | `@z-ui/react/text-field` | [TextField.md](./src/components/text-field/TextField.md) |
| Textarea | `@z-ui/react/textarea` | [Textarea.md](./src/components/textarea/Textarea.md) |
| Timeline | `@z-ui/react/timeline` | [Timeline.md](./src/components/timeline/Timeline.md) |
| Toast | `@z-ui/react/toast` | [Toast.md](./src/components/toast/Toast.md) |
| Toolbar | `@z-ui/react/toolbar` | [Toolbar.md](./src/components/toolbar/Toolbar.md) |
| Tooltip | `@z-ui/react/tooltip` | [Tooltip.md](./src/components/tooltip/Tooltip.md) |
| Theme Controller | `@z-ui/react/theme-controller` | [ThemeController.md](./src/components/theme-controller/ThemeController.md) |
| Validator | `@z-ui/react/validator` | [Validator.md](./src/components/validator/Validator.md) |

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
