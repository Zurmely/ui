# FileInput

## Purpose

FileInput shows a styled file upload control. FileInput supports an optional drag-and-drop dropzone and `Field` integration.

## Select when

- You collect one or more files in a form.
- A visible dropzone helps the user find the upload control.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { FileInput } from '@z-ui/react/file-input';
```

## Compose

Use `FileInput` as documented in the human API section. Add child controls or slots that match the task.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `enableDragDrop` | to toggle enableDragDrop behavior. |
| `accept` | for string. |
| `multiple` | to toggle multiple behavior. |
| `disabled / invalid / required` | to toggle disabled / invalid / required behavior. |

## Style with tokens

- **Dropzone padding:** `--z-spacing-inset-box-comfortable`
- **Dropzone border:** `--z-color-border-subtle`, `--z-color-border-default`, `--z-color-border-danger`, `--z-color-border-disabled`
- **Dropzone surface:** `--z-color-background-surface`, `--z-color-background-muted`
- **Label text:** `--z-color-text-secondary`, `--z-color-text-primary`, `--z-color-text-disabled`
- **Control typography:** `--z-text-control-font-family`, `--z-text-control-size`, `--z-text-control-weight`, `--z-text-control-line-height`
- **Corner radius:** `--z-radius-control`
- **Motion:** `--z-motion-duration-interaction`, `--z-motion-easing-interaction`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You need camera capture or a specialized upload flow.
- Do not recreate `FileInput` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Calendar` — Date picker grid for selecting a single date
- `Checkbox` — Binary selection control with invalid and disabled states
- `Field` — Groups label, control, description, and error for form inputs
- `Filter` — Toggle group for filtering content

## Human doc

[FileInput.md](../../src/components/file-input/FileInput.md)
