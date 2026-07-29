# Z-UI

Semantic color tokens and React component library.

## Packages

| Package | Description |
| --- | --- |
| [`@z-ui/tokens`](./packages/tokens) | Semantic CSS design tokens (`colors.css`, `sizes.css`, `text.css`, `motion.css`, `elevation.css`) |
| [`@z-ui/react`](./packages/react) | React 19 component library |
| [`@z-ui/docs`](./apps/docs) | Interactive documentation site with playgrounds and token reference |

## Quick start

```bash
pnpm install
pnpm build
pnpm test
pnpm dev
```

Open http://localhost:5173 for the documentation site: foundation token pages, per-component playgrounds with live prop controls, generated code snippets, and colocated component docs.

Legacy preview app: `pnpm dev:preview` (single-page showcase). Static color reference: [`colors.html`](./colors.html).

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import '@z-ui/tokens/elevation.css';
import '@z-ui/react/styles.css';
import { Button } from '@z-ui/react/button';

export function App() {
  return (
    <div data-theme="light">
      <Button variant="primary">Save</Button>
    </div>
  );
}
```

## Documentation

- [PRD](./PRD.md)
- [Color semantics](./COLOR-SEMANTICS.md)
- [Size semantics](./SIZES-SEMANTICS.md)
- [Text semantics](./TEXT-SEMANTICS.md)
- [Motion semantics](./MOTION-SEMANTICS.md)
- [Naming conventions](./packages/react/docs/NAMING.md)
- [Component docs](./packages/react/README.md)
