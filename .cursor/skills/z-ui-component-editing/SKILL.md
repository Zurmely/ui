---
name: z-ui-component-editing
description: Edits, creates, or reviews Z-UI React components using the project's semantic color, size, typography, and motion CSS variables. Use for any work under packages/react/src/components, including component TSX, CSS, tests, documentation, accessibility, states, variants, and token adoption.
---

# Z-UI Component Editing

Follow the project's design-system documentation as an authoritative contract. Ask before making an exception.

## Source of truth

Read only the documents relevant to the change, but always read `packages/react/docs/NAMING.md`.

- **Agent component guides:** `packages/react/docs/ai/` — read `{slug}.md` (index: [docs/ai/README.md](../../packages/react/docs/ai/README.md)) when choosing, composing, or styling a component
- Product and component requirements: `PRD.md`
- Public component vocabulary: `packages/react/docs/NAMING.md`
- Color roles and themes: `COLOR-SEMANTICS.md`
- Spacing and radius roles: `SIZES-SEMANTICS.md`
- Typography roles: `TEXT-SEMANTICS.md`
- Durations, easing, and reduced motion: `MOTION-SEMANTICS.md`
- Canonical token implementations: `colors.css`, `sizes.css`, `text.css`, `motion.css`

When documents conflict, use this precedence:

1. Domain semantics document for domain-specific behavior
2. `packages/react/docs/NAMING.md` for component API and naming
3. `PRD.md` for product-wide requirements
4. Existing component code as an example, not as authority

Report unresolved contradictions and ask before proceeding.

## Non-negotiable token policy

- Component CSS consumes semantic `--z-*` variables.
- Never use primitives such as `--purple-500`, `--neutral-950`, `--z-space-*`, `--z-font-size-*`, `--z-duration-*`, or `--z-easing-*`.
- **12px (`font.size.1` / `0.75rem`) is the minimum font size.** Do not add tokens or component styles below this floor; `text.badge` is the smallest semantic role.
- `--z-text-*` controls typography. `--z-color-text-*` controls text color.
- Use color tokens for color, spacing/radius tokens for layout, text tokens for typography, and motion tokens for transitions or animation.
- Do not replace an existing semantic token with a literal value.
- Hardcoded values are acceptable only where the documentation says that token category is not implemented. Preserve an existing documented exception; ask before introducing a new one.
- If no semantic token expresses the intended role, do not guess from a primitive or nearby semantic role. Explain the gap and ask whether to add a semantic or component-scoped token.
- Component-scoped tokens are an escape hatch and require explicit approval.
- Never edit `packages/tokens/dist/**` or any other `dist/**` output directly. Edit root token sources and rebuild.
- Theme-specific component selectors are a last resort. Components should inherit light/dark behavior through semantic color variables.

## Editing workflow

### 1. Establish the contract

1. Read the component TSX, CSS, test, Markdown documentation, and barrel export.
2. Read `packages/react/docs/NAMING.md` and the relevant domain semantics documents.
3. Confirm supported props, variants, sizes, tones, states, slots, ref target, accessibility behavior, and Figma naming.
4. Treat existing inconsistencies as investigation points, not conventions.

### 2. Map design intent to tokens

For each visual property:

1. Identify its semantic role.
2. Verify the exact variable in the canonical root token CSS.
3. Check every state: default, hover, active, focus-visible, selected, loading, disabled, and invalid as applicable.
4. Check both light and dark theme mappings for color changes.
5. Check reduced-motion behavior for transitions and animation.

Do not choose a token merely because its current value looks correct.

### 3. Implement the component

- Use semantic HTML and native behavior before adding ARIA.
- Preserve controlled/uncontrolled APIs and Radix behavior where applicable.
- Use PascalCase exports, camelCase props, `z-` prefixed BEM classes, and `data-*` modifiers.
- Reflect public size, variant, tone, and state props in the canonical data attributes.
- Follow state priority: disabled > loading > active > hover > selected > default.
- Use `:focus-visible`; preserve forced-colors support and the established shared focus treatment unless the documentation requires a change.
- Ensure disabled and loading behavior prevents unintended interaction.
- Keep token stylesheet imports at the consumer/app layer; component CSS should reference variables without bundling token files.
- Avoid unrelated refactors and do not normalize inconsistent patterns unless requested.

### 4. Keep the component set complete

Update all affected artifacts:

- `Component.tsx`
- `component.css`
- `Component.test.tsx`
- `Component.md`
- `index.ts` and package exports when the public API changes
- parity metadata when required by the repository workflow

Documentation should cover the problem, use cases, import, variants/states, accessible naming, keyboard behavior, token hooks, Figma parity, and SSR/portal/form concerns where relevant. Keep the human `Component.md` and agent `packages/react/docs/ai/{slug}.md` in sync (run `node apps/docs/scripts/sync-component-docs.mjs` after doc changes).

Tests should cover rendering, public attributes, behavior, disabled/loading/invalid states as applicable, ref behavior when supported, and `checkA11y`.

### 5. Verify

Default to the smallest check that covers the files you changed. Do **not** run the full package or monorepo suites after routine component edits.

For a single-component change, run only that component's test file:

```bash
pnpm --filter @z-ux/ui exec vitest run src/components/<name>/<Name>.test.tsx
```

Add further checks only when the change actually needs them:

- `typecheck` — TypeScript/API surface changed (props, exports, shared types)
- `lint` — you touched patterns the linter is likely to flag, or a prior edit introduced lint errors
- Full `pnpm --filter @z-ux/ui test` — shared utilities, cross-component behavior, or audit tests are in scope
- Repository-level `pnpm test` / `typecheck` / `lint` — cross-package or public API changes

When token sources change:

```bash
pnpm --filter @z-ux/tokens build
```

Confirm generated token output matches the root sources, but do not hand-edit it.

## Completion report

State:

- Component behavior changed
- Semantic tokens used or token gaps found
- Accessibility and theme considerations
- Documentation and tests updated
- Checks run and their results
- Any approved exception to the documentation
