# Z-UI

Semantic color tokens and React component library.

## Packages

| Package | Description |
| --- | --- |
| [`@z-ux/tokens`](./packages/tokens) | Semantic CSS design tokens (`colors.css`, `sizes.css`, `text.css`, `motion.css`, `elevation.css`) |
| [`@z-ux/ui`](./packages/react) | React 19 component library |
| [`@z-ux/charts`](./packages/charts) | Chart components (visx) — in development |
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
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import '@z-ux/tokens/elevation.css';
import '@z-ux/ui/styles.css';
import { Button } from '@z-ux/ui/button';

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
- [Versioning](./VERSIONING.md) — lockstep SemVer for `@z-ux/tokens`, `@z-ux/ui`, and `@z-ux/charts`
- [Color semantics](./COLOR-SEMANTICS.md)
- [Chart color semantics](./CHART-SEMANTICS.md)
- [Size semantics](./SIZES-SEMANTICS.md)
- [Text semantics](./TEXT-SEMANTICS.md)
- [Motion semantics](./MOTION-SEMANTICS.md)
- [Elevation semantics](./ELEVATION-SEMANTICS.md)
- [Naming conventions](./packages/react/docs/NAMING.md)
- [Component docs](./packages/react/README.md)
