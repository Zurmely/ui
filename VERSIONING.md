# Versioning

Z-UX publishes public packages under the `@z-ux` npm org:

| Package | Path | Role | Publish status |
| --- | --- | --- | --- |
| `@z-ux/tokens` | `packages/tokens` | Semantic CSS design tokens | Published |
| `@z-ux/ui` | `packages/react` | React component library | Published |
| `@z-ux/charts` | `packages/charts` | Chart components (visx) | In development — joins lockstep when build/exports ship |

Apps (`@z-ui/docs`, `@z-ui/preview`) stay private and are not versioned for npm.

## Mode: lockstep SemVer

**All publishable `@z-ux/*` packages always share the same version number.**

When tokens change, UI (and charts, once published) ship the same version. Consumers install matching pairs:

```bash
pnpm add @z-ux/ui@0.2.0 @z-ux/tokens@0.2.0
# when charts is published:
pnpm add @z-ux/charts@0.2.0 @z-ux/ui@0.2.0 @z-ux/tokens@0.2.0
```

### Why lockstep

- `@z-ux/ui` peer-depends on `@z-ux/tokens`.
- `@z-ux/charts` peer-depends on `@z-ux/ui` (and tokens via setup).
- Token, component, and chart contracts ship as one design system.
- The PRD requires synchronized package and documentation releases.
- Independent versions create mismatched pairs that are hard to support.

Do **not** version the packages independently.

## SemVer rules

Versions use `MAJOR.MINOR.PATCH` ([Semantic Versioning 2.0.0](https://semver.org/)).

### During `0.x` (pre-v1)

| Change | Bump | Examples |
| --- | --- | --- |
| Compatible bug fix | **patch** | Fix focus ring, correct contrast, typo in CSS |
| New compatible capability | **minor** | New component, new optional prop, new semantic token role |
| Breaking change | **minor** | Rename/remove token, rename prop, change default behavior, remove export |

In `0.x`, SemVer allows breaking changes in any `0.y` release. We still use **minor** (not patch) for breaks so adopters can pin `~0.y.x` if they need stability within a line.

### From `1.0.0` onward

| Change | Bump | Examples |
| --- | --- | --- |
| Compatible bug fix | **patch** | Same as above |
| Backward-compatible feature | **minor** | New component, additive prop, additive token |
| Breaking change | **major** | Rename/remove public API or token contract |

Treat public component props, exports, CSS class contracts that docs teach, and semantic token names as public API.

## What counts as breaking

Breaking includes (not exhaustive):

- Rename or remove a semantic token (`--z-color-*`, `--z-spacing-*`, and other documented roles).
- Rename or remove a public export, prop, or documented variant.
- Change default behavior in a way that alters rendered UI or a11y for existing callers.
- Raise the minimum React, Node, or peer dependency in a non-compatible way.
- Change published CSS so documented classnames or required setup steps stop working.

Non-breaking includes:

- Bug fixes that restore documented behavior.
- New optional props with safe defaults.
- New components or new token roles.
- Docs, tests, internal refactors with no public contract change.

## Deprecations

- Prefer deprecate → warn in docs → remove in a later breaking release.
- Keep deprecated APIs available for at least one minor release when practical (`0.x`) or one major cycle after `1.0`.
- Document the replacement path in the component Markdown and release notes.

## Conventional commits (required for auto-publish)

CI chooses the bump from commits since the previous version bump on `main`.

| Commit prefix | Bump |
| --- | --- |
| `fix:` | patch |
| `feat:` | minor |
| `feat!:`, `fix!:`, or any type with `BREAKING CHANGE:` in the body | minor in `0.x`, major from `1.0` |
| `docs:`, `test:`, `chore:`, `refactor:` (no public API change) | no publish by themselves; if mixed with package code, default **patch** only when `packages/tokens` or `packages/react` changed |

Examples:

```text
fix(button): restore focus ring on dark theme
feat(tokens): add elevation.ring role
feat(button)!: rename variant ghost to subtle

BREAKING CHANGE: Button variant "ghost" is removed. Use "subtle".
```

## Publish pipeline

1. Push to `main` that touches `packages/tokens/**` or `packages/react/**` (or run **Publish packages** manually).
2. CI runs `scripts/bump-publishable-versions.mjs` with the detected level.
3. Both package.json versions update to the same next version.
4. Packages build, typecheck, and publish to npm with provenance.
5. CI commits the version bump with `[skip ci]`.

Local dry-run:

```bash
node scripts/bump-publishable-versions.mjs --level=patch --dry-run
pnpm --filter @z-ux/tokens build
pnpm --filter @z-ux/ui build
```

Do not hand-edit versions in only one package. Always keep `@z-ux/tokens` and `@z-ux/ui` equal (and `@z-ux/charts` once it is on the publish line).

## Peer dependency policy

- `@z-ux/ui` declares `"@z-ux/tokens": "^X.Y.0"` for the current lockstep line.
- After each release, peer range must accept the published tokens version.
- In the monorepo, apps depend on `workspace:*`.

## Tags and channels

- Default npm tag: `latest`.
- Do not publish `alpha` / `next` tags unless the release notes say so.
- GitHub Releases are optional; npm is the source of truth for package versions.

## Agent and maintainer checklist

Before merging package changes:

1. Classify the change as patch, minor, or breaking.
2. Use the matching conventional commit prefix.
3. Update docs when public API or tokens change.
4. Never bump only one publishable package.
5. Never publish by editing `dist/**` by hand.
