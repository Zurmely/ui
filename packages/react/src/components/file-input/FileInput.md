# File Input

## Overview

FileInput shows a styled file upload control.

FileInput supports an optional drag-and-drop dropzone and `Field` integration.

## When to use

**Use when:**

- You collect one or more files in a form.
- A visible dropzone helps the user find the upload control.

**Do not use when:**

- You need camera capture or a specialized upload flow.

## Install

```tsx
import { FileInput } from '@z-ux/ui/file-input';
```

## API

| Prop | Values | Default |
| --- | --- | --- |
| `enableDragDrop` | `boolean` | `true` |
| `dropLabel` | `string` | `"Drag and drop files here, or"` |
| `browseLabel` | `string` | `"browse"` |
| `accept` | `string` | — |
| `multiple` | `boolean` | — |
| `name` | `string` | — |
| `onChange` | native change handler | — |
| `disabled` / `invalid` / `required` | `boolean` | from `Field` context |

## Accessibility

Use `FieldLabel` or `aria-label` on the hidden native input through field association.

## Keyboard

| Key | Action |
| --- | --- |
| `Tab` | Focuses browse/change buttons |
| `Enter` / `Space` | Activates focused button |

## Tokens

| Part | Semantic tokens |
| --- | --- |
| Dropzone padding | `--z-spacing-inset-box-comfortable` |
| Dropzone border | `--z-color-border-subtle`, `--z-color-border-default`, `--z-color-border-danger`, `--z-color-border-disabled` |
| Dropzone surface | `--z-color-background-surface`, `--z-color-background-muted` |
| Label text | `--z-color-text-secondary`, `--z-color-text-primary`, `--z-color-text-disabled` |
| Control typography | `--z-text-control-font-family`, `--z-text-control-size`, `--z-text-control-weight`, `--z-text-control-line-height` |
| Corner radius | `--z-radius-control` |
| Motion | `--z-motion-duration-interaction`, `--z-motion-easing-interaction` |

## Figma

| Figma | React |
| --- | --- |
| File upload / dropzone | `FileInput` |
| File upload / browse button | `FileInput` with `enableDragDrop` |

## Notes

- **SSR:** SSR is safe. File selection requires the client.
- **Portal:** No.
- **Form:** Uses a native file input. Inherits `disabled`, `invalid`, and `required` from `Field` context.

## Examples

```tsx
<Field id="resume">
  <FieldLabel>Resume</FieldLabel>
  <FileInput accept=".pdf" />
</Field>
```
