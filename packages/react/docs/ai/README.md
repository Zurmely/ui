# Agent component documentation

Machine-oriented guides for choosing, composing, and styling Z-UI React components. Each file matches a docs-site registry slug (`button.md`, `dialog.md`, …).

## How agents should use these files

1. Read `packages/react/docs/ai/{slug}.md` when you need to pick or wire a component.
2. Read the linked human doc for the full API, token matrix, keyboard table, and Figma mapping.
3. Follow `packages/react/docs/NAMING.md` for variants, tones, and `data-*` state attributes.
4. Dogfood `@z-ux/ui` and semantic CSS variables — never invent one-off controls or colors.

## Index

| Slug | Component | AI doc |
| --- | --- | --- |
| accessibility-controller | AccessibilityController | [accessibility-controller.md](./accessibility-controller.md) |
| accordion | Accordion | [accordion.md](./accordion.md) |
| alert | Alert | [alert.md](./alert.md) |
| avatar | Avatar | [avatar.md](./avatar.md) |
| badge | Badge | [badge.md](./badge.md) |
| breadcrumbs | Breadcrumbs | [breadcrumbs.md](./breadcrumbs.md) |
| button | Button | [button.md](./button.md) |
| calendar | Calendar | [calendar.md](./calendar.md) |
| card | Card | [card.md](./card.md) |
| carousel | Carousel | [carousel.md](./carousel.md) |
| checkbox | Checkbox | [checkbox.md](./checkbox.md) |
| code-block | CodeBlock | [code-block.md](./code-block.md) |
| dialog | Dialog | [dialog.md](./dialog.md) |
| drawer | Drawer | [drawer.md](./drawer.md) |
| field | Field | [field.md](./field.md) |
| file-input | FileInput | [file-input.md](./file-input.md) |
| filter | Filter | [filter.md](./filter.md) |
| floating-action-button | FloatingActionButton | [floating-action-button.md](./floating-action-button.md) |
| icon-button | IconButton | [icon-button.md](./icon-button.md) |
| indicator | Indicator | [indicator.md](./indicator.md) |
| link | Link | [link.md](./link.md) |
| list-item | ListItem | [list-item.md](./list-item.md) |
| megamenu | Megamenu | [megamenu.md](./megamenu.md) |
| menu | Menu | [menu.md](./menu.md) |
| navbar | Navbar | [navbar.md](./navbar.md) |
| otp-input | OTPInput | [otp-input.md](./otp-input.md) |
| pagination | Pagination | [pagination.md](./pagination.md) |
| popover | Popover | [popover.md](./popover.md) |
| progress | Progress | [progress.md](./progress.md) |
| radial-progress | RadialProgress | [radial-progress.md](./radial-progress.md) |
| radio-group | RadioGroup | [radio-group.md](./radio-group.md) |
| range-slider | RangeSlider | [range-slider.md](./range-slider.md) |
| rating | Rating | [rating.md](./rating.md) |
| select | Select | [select.md](./select.md) |
| separator | Separator | [separator.md](./separator.md) |
| skeleton | Skeleton | [skeleton.md](./skeleton.md) |
| spinner | Spinner | [spinner.md](./spinner.md) |
| stack | Stack | [stack.md](./stack.md) |
| status | Status | [status.md](./status.md) |
| steps | Steps | [steps.md](./steps.md) |
| switch | Switch | [switch.md](./switch.md) |
| table | Table | [table.md](./table.md) |
| tabs | Tabs | [tabs.md](./tabs.md) |
| text-field | TextField | [text-field.md](./text-field.md) |
| textarea | Textarea | [textarea.md](./textarea.md) |
| theme-controller | ThemeController | [theme-controller.md](./theme-controller.md) |
| timeline | Timeline | [timeline.md](./timeline.md) |
| toast | Toast | [toast.md](./toast.md) |
| toolbar | Toolbar | [toolbar.md](./toolbar.md) |
| tooltip | Tooltip | [tooltip.md](./tooltip.md) |
| validator | Validator | [validator.md](./validator.md) |

Author new AI docs from [TEMPLATE.md](./TEMPLATE.md). Keep slug filenames aligned with `apps/docs/src/components/*.docs.tsx`.
