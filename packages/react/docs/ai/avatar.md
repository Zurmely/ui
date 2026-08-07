# Avatar

## Purpose

Avatar shows an image for a user or an entity.

If `src` has no value or the image does not load, Avatar shows a muted fallback.

## Select when

- You show a person, a team, or an entity with an image.
- You show a profile image with an initials fallback.

## Prefer instead

| Situation | Use |
| --- | --- |
| Task needs a different pattern | See Related components |

## Import

```tsx
import { Avatar } from '@z-ux/ui/avatar';
```

## Compose

- **fallback** (Optional): Initials shown when `src` has no value or fails to load.

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `src` | for string. |
| `alt` | for string; default is ''. |
| `fallback` | for string. |
| `size` | for sm, md, lg; default is md. |

## Style with tokens

- **Background:** `--z-color-background-muted`
- **Border:** `--z-color-border-subtle`
- **Fallback text color:** `--z-color-text-secondary`
- **Fallback typography (sm):** `--z-text-label-*`
- **Corner radius:** `--z-radius-circle`
- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- You show an arbitrary decorative image. Use a standard `<img>`.
- The image needs interactive behavior. Wrap it with a button or a link.
- Do not recreate `Avatar` with raw HTML and one-off CSS when this component fits the task.

## Related

- `Badge` — Compact label for status, count, or category
- `CodeBlock` — Inline or multi-line code surface for token names and samples
- `Indicator` — Notification badge overlay on a trigger element
- `Progress` — Linear progress indicator

## Human doc

[Avatar.md](../../src/components/avatar/Avatar.md)
