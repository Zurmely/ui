# Alert

## Purpose

Alert shows an important status message.

Alert uses a subtle background for each tone. Status tones do not use a colored border. The fill and the text carry the meaning.

## Select when

- You show success, warning, error, or informational feedback.
- A persistent inline message needs the emphasis of a tone.

## Prefer instead

| Situation | Use |
| --- | --- |
| A short inline label is enough. Use | `Badge` |

## Import

```tsx
import { Alert } from '@z-ux/ui/alert';
```

## Compose

- **title** (Optional): Alert heading.
- **description** (Optional): Supporting text. Falls back to `children`.
- **action** (Optional): Secondary action, such as an undo link.
- **children** (Optional): Acts as description when you omit `description`.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `tone` | for neutral, primary, success, warning, danger, info; default is neutral. |

## Style with tokens

- **Neutral:** `--z-color-background-subtle`, `--z-color-text-primary`
- **Primary:** `--z-color-background-primary-subtle`, `--z-color-text-primary`, `--z-color-border-primary`
- **Success:** `--z-color-background-success-subtle`, `--z-color-text-success`
- **Warning:** `--z-color-background-warning-subtle`, `--z-color-text-warning`
- **Danger:** `--z-color-background-danger-subtle`, `--z-color-text-danger`
- **Info:** `--z-color-background-info-subtle`, `--z-color-text-info`
- **Container padding:** `--z-spacing-inset-box`
- **Content gap:** `--z-spacing-gap-inline`
- **Corner radius:** `--z-radius-surface`
- **Title typography:** `--z-text-title-*`
- **Description typography:** `--z-text-body-*`
- **Description color:** `--z-color-text-primary` (title keeps tone text for semantic emphasis)
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- A transient toast is enough. Use a toast pattern.
- A short inline label is enough. Use `Badge`.
- Do not recreate `Alert` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Toast` — Brief notification message

## Human doc

[Alert.md](../../src/components/alert/Alert.md)
