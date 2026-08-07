# MAKE-CHARTS-PUBLIC

Instructions for a future agent: restore `@z-ux/charts` to the monorepo, docs, and publish line.

Charts were **parked** because the UI felt off the design system (cheap defaults, fragile tooltips, weak token adoption). The package and docs files may still exist on disk under gitignore. Do not publish until the quality bar below is met.

## Current park state (what to reverse)

| Area | Parked as |
| --- | --- |
| `.gitignore` | Ignores `packages/charts/` and chart docs files (see block below) |
| `pnpm-workspace.yaml` | Excludes charts with `!packages/charts` |
| Root `package.json` → `publish:packages` | Publishes only `@z-ux/tokens` and `@z-ux/ui` |
| `apps/docs/package.json` | No `@z-ux/charts` dependency |
| Docs routes / nav / home | No Charts section or `/charts` routes |
| `MarkdownContent.tsx` | No glob for `packages/charts/**/*.md` |
| `check-docs.mjs` / `sync-component-docs.mjs` | Skip `@z-ux/charts` registry entries |

Chart **tokens** and `CHART-SEMANTICS.md` stayed in the design system on purpose. Keep them.

### `.gitignore` block to remove

```gitignore
# Charts package + docs — parked until design-system quality is ready
packages/charts/
apps/docs/src/components/charts-registry.ts
apps/docs/src/components/chart-sample-data.ts
apps/docs/src/components/*-chart.docs.tsx
apps/docs/src/components/sparkline.docs.tsx
apps/docs/src/pages/ChartPage.tsx
apps/docs/src/pages/ChartsGalleryPage.tsx
apps/docs/scripts/bootstrap-chart-docs.mjs
```

## Prerequisites (quality bar)

Before un-parking, charts must feel like Z-UI, not a visx demo:

1. **Tokens only** — series, grid, axis, tooltip, legend, spacing, radius, motion from semantic CSS (`--z-color-chart-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, `--z-motion-*`, `--z-elevation-*`). No hardcoded hex/px/easings when a token exists. Follow `z-ui-token-sources` and `CHART-SEMANTICS.md`.
2. **Dogfood `@z-ux/ui`** where chrome fits (Spinner, Tooltip patterns, etc.). Prefer library primitives over one-off markup (`z-ui-dogfood`).
3. **Responsive sizing** — `ParentSize` / `ChartFrame` must not grow sideways in flex/centered previews (`min-width: 0`, constrained measure layer, chart roots `width: 100%`).
4. **Tooltips** — follow the cursor (`position: fixed` + portal + `clientX`/`clientY`). Full-plot hover (or equivalent) so tips do not drop between points. `pointer-events: none` on the tip.
5. **Legend** — real gap tokens between swatch and label (`--z-spacing-gap-inline`, not invented `--z-spacing-inline-*` names).
6. **Docs** — gallery + per-chart pages match other component docs (playground, examples, STE markdown, AI docs).
7. **Tests** — `pnpm --filter @z-ux/charts test` and color audit pass.
8. **Ask the user** before first npm publish and before joining lockstep versioning.

## Restore steps

Work in order. Keep commits conventional (`feat(charts): …`).

### 1. Confirm local sources

```bash
test -d packages/charts && test -f packages/charts/package.json
test -f apps/docs/src/components/charts-registry.ts
```

If missing, recover from git history before the park commit, e.g.:

```bash
git log --oneline -- packages/charts | head
git checkout <pre-park-sha> -- packages/charts apps/docs/src/components/*chart* apps/docs/src/components/sparkline.docs.tsx apps/docs/src/components/charts-registry.ts apps/docs/src/components/chart-sample-data.ts apps/docs/src/pages/ChartPage.tsx apps/docs/src/pages/ChartsGalleryPage.tsx apps/docs/scripts/bootstrap-chart-docs.mjs
```

### 2. Un-ignore and re-include in the workspace

1. Delete the charts block from `.gitignore` (section above).
2. In `pnpm-workspace.yaml`, remove the `!packages/charts` line so it is only:

   ```yaml
   packages:
     - "packages/*"
     - "apps/*"
   ```

3. Run `pnpm install`.

### 3. Wire docs dependency

In `apps/docs/package.json` dependencies, add:

```json
"@z-ux/charts": "workspace:*"
```

Run `pnpm install` again.

### 4. Restore docs app surface

Mirror how Components work:

1. **`apps/docs/src/layout/sections.ts`** — add `'charts'` to `DocsSection` and `SECTIONS` (path `/charts`). Detect `/charts` in `getActiveSection`.
2. **`apps/docs/src/routes.tsx`** — routes for `/charts` (gallery) and `/charts/:slug` (`ChartPage`). Optional redirect `/components/charts` → `/charts`.
3. **`apps/docs/src/layout/DocsNav.tsx`** — Charts sidebar from `CHART_NAV` / `CHARTS_GALLERY_PATH` in `charts-registry.ts`.
4. **`apps/docs/src/layout/DocsLayout.tsx`** — TOC grid for `/charts/` pages if component pages use it.
5. **`apps/docs/src/pages/HomePage.tsx`** — Charts hub card + “What you will find” bullet (use `chartDocs.length`).
6. **`apps/docs/src/pages/ComponentPage.tsx`** — if a slug is a chart, redirect to `/charts/:slug` via `chartBySlug`.
7. **`apps/docs/src/markdown/MarkdownContent.tsx`** — add eager glob for `packages/charts/src/components/*/*.md` next to the react glob.
8. Keep chart docs **out of** `componentRegistry` (they live in `charts-registry.ts` only), unless product wants them listed twice.

Ensure these files are tracked (not ignored):

- `apps/docs/src/components/charts-registry.ts`
- `apps/docs/src/components/chart-sample-data.ts`
- `apps/docs/src/components/*-chart.docs.tsx`
- `apps/docs/src/components/sparkline.docs.tsx`
- `apps/docs/src/pages/ChartPage.tsx`
- `apps/docs/src/pages/ChartsGalleryPage.tsx`

### 5. Restore docs scripts

In `apps/docs/scripts/check-docs.mjs` and `sync-component-docs.mjs`, stop skipping `@z-ux/charts` entries. Re-enable charts AI doc count checks in sync (charts AI under `packages/charts/docs/ai/`).

### 6. Publish line + versioning

1. Root `package.json` `publish:packages` — append charts after ui:

   ```text
   … && pnpm --filter @z-ux/charts publish --access public --no-git-checks
   ```

2. Update `VERSIONING.md` publish status for `@z-ux/charts` from “In development” to **Published** / lockstep.
3. Update `scripts/bump-publishable-versions.mjs` if charts must bump with tokens/ui (today it only lists tokens + react — extend when joining lockstep).
4. Update `.cursor/rules/z-ux-versioning.mdc` if it still says charts “joins when published”.
5. Confirm `packages/charts/package.json` name, exports, `private: false`, and peer deps on `@z-ux/ui` / tokens.

**Do not publish** until the user explicitly asks and the quality bar passes.

### 7. Verify

```bash
pnpm install
pnpm --filter @z-ux/charts build
pnpm --filter @z-ux/charts test
pnpm --filter @z-ux/charts typecheck
pnpm --filter @z-ui/docs typecheck
pnpm --filter @z-ui/docs docs:check
pnpm --filter @z-ui/docs dev   # smoke /charts and a few chart pages
```

### 8. Clean up

- Delete this file (`MAKE-CHARTS-PUBLIC.md`) once charts are public, or rewrite it as a short “charts release checklist” under `packages/charts/`.
- Prefer one focused PR: restore wiring + quality fixes, not a drive-by refactor.

## Useful paths

| Path | Role |
| --- | --- |
| `packages/charts/` | Package source |
| `CHART-SEMANTICS.md` | Chart color/structure token contract |
| `apps/docs/src/components/charts-registry.ts` | Docs registry + nav |
| `apps/docs/src/pages/ChartPage.tsx` | Per-chart docs page |
| `apps/docs/src/pages/ChartsGalleryPage.tsx` | Gallery |
| `packages/charts/src/primitives/ChartFrame.tsx` | Responsive frame |
| `packages/charts/src/primitives/ChartTooltip.tsx` | Fixed/portal tooltip |
| `packages/charts/src/primitives/chart.css` | Shared chart CSS |

## Anti-goals

- Do not re-introduce invalid tokens like `--z-spacing-inline-tight` (use `--z-spacing-gap-inline` / `--z-spacing-gap-inline-tight`).
- Do not ship with 16px-wide hover strips or SVG-local absolute tooltips.
- Do not edit `packages/*/dist/**` by hand.
- Do not bump only `@z-ux/charts` once it is on the lockstep publish line.
