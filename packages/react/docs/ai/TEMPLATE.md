# {ComponentName}

## Purpose

{One line: the job this component performs in the UI.}

## Select when

- {Bullet an agent can match to a user request or task.}
- {Another selection signal.}

## Prefer instead

| Situation | Use |
| --- | --- |
| {Task or constraint} | `{OtherComponent}` |
| {Task or constraint} | `{OtherComponent}` |

## Import

```tsx
import { {ComponentName} } from '@z-ui/react/{import-path}';
```

## Compose

{Required and optional parts, nesting order, and slot names. Use a short list or fenced example.}

## Props that change behavior

| Prop | When to set |
| --- | --- |
| `{prop}` | {Decision rule — not a full API dump.} |

## Style with tokens

- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.
- Do not hardcode colors, rem sizes, or easings when a semantic token exists.
- Import token CSS at the app layer; do not bundle tokens inside component CSS.

## Do not

- {Common agent mistake, e.g. raw `<button>` when `Button` exists.}
- {Another mistake specific to this component.}

## Related

- `{RelatedComponent}` — {one-line relationship}
- `{RelatedComponent}` — {one-line relationship}

## Human doc

[{ComponentName}.md](../../src/components/{folder}/{ComponentName}.md)
