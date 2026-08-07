# Z-UI Product Requirements Document

**Status:** Draft  
**Product:** Z-UI  
**Initial release target:** v1.0  
**Primary audience:** General React product teams  
**Platforms:** React component library and Figma library

## 1. Product summary

Z-UI is a free, open-source design system and UI library for teams building React products. It provides accessible, lightweight components and a shared token system that stays consistent between code and Figma.

Color is authored in OKLCH so palettes are perceptually predictable and easier to theme. The React implementation uses TypeScript, semantic HTML, CSS custom properties, and prebuilt CSS without requiring a styling framework or runtime CSS-in-JS library.

Z-UI should help a team move from design to production without rebuilding foundational components, accessibility behavior, or theme infrastructure.

## 2. Problem

Product teams regularly choose between:

- accessible but visually restrictive component libraries;
- customizable libraries with high runtime or styling overhead;
- headless primitives that require substantial design and integration work;
- design libraries and code libraries that drift apart; and
- color systems based on RGB or HSL scales with uneven perceived contrast.

Z-UI will provide a coherent alternative: production-ready defaults, deliberate accessibility, predictable theming, and matching Figma assets in a small, framework-independent package.

## 3. Vision

Make accessible interface foundations available to any React team, with design and code speaking the same token and component language.

## 4. Goals

### 4.1 Product goals

1. Provide a tiered component catalog: a **Stable** core of 21 semver-guaranteed components plus a **Developing** set of 36 additional public components that cover common product patterns while their definition of done is completed.
2. Meet WCAG 2.2 Level AA requirements for Z-UI defaults and documented usage.
3. Keep Figma components, React components, and design tokens measurably aligned.
4. Make light mode, dark mode, and theme customization first-class capabilities.
5. Keep installation, adoption, and migration straightforward for a TypeScript React team.
6. Maintain a small runtime and CSS footprint with tree-shakeable packages and no CSS-in-JS runtime.
7. Establish an open-source project that is easy to understand, contribute to, and maintain.

### 4.2 User outcomes

A developer should be able to install Z-UI, import its base theme, render a component, and understand how to customize it in under 10 minutes.

A designer should be able to enable the Figma library, apply the same semantic variables used in code, and assemble supported patterns without detaching components.

A product team should be able to change its foundation tokens and selected foundation tokens without forking component source.

## 5. Non-goals for v1

- Supporting frameworks other than React.
- Providing a utility CSS framework or requiring Tailwind CSS.
- Offering a fully unstyled/headless component package.
- Shipping application templates, page builders, data grids, or rich-text editors.
- Supporting React Native or native mobile platforms.
- Guaranteeing WCAG conformance for applications that override tokens or misuse component APIs.
- Supporting Internet Explorer, legacy React versions, or non-ESM build systems.
- Providing every visual style or product pattern in the initial release.

## 6. Target users

### Primary: React product developer

Needs reliable components that are fast to install, typed, composable, accessible by default, and easy to theme without learning a proprietary styling system.

### Secondary: Product designer

Needs Figma components and variables that match production behavior, variants, naming, and visual output.

### Secondary: Design-system maintainer

Needs stable primitives, explicit tokens, documented contribution rules, release discipline, and tools to customize Z-UI without creating an unmaintainable fork.

## 7. Product principles

1. **Accessible by construction.** Use native semantics first and implement WAI-ARIA patterns only when native HTML is insufficient. Visible labels and semantic relationships are preferred over adding `aria-label` indiscriminately.
2. **One source of truth.** Tokens and component specifications must be generated from or checked against shared source data.
3. **Good defaults, clear escape hatches.** Common usage should require little configuration; customization must not depend on source forks.
4. **Lightweight is measurable.** Bundle cost, dependency count, render behavior, and CSS size are release criteria.
5. **Design and code are peers.** A component is incomplete until its React API, Figma model, behavior, accessibility, and documentation agree.
6. **Composable, not clever.** APIs should resemble the platform, avoid hidden global behavior, and work with standard React patterns.
7. **Stable foundations before breadth.** Z-UI should prefer fewer complete components over many inconsistent ones.

## 8. Product surfaces

### 8.1 React library

The React package provides typed components, component styles, theme styles, and documented APIs.

Proposed public packages:

- `@z-ux/ui`: React components and component styles.
- `@z-ux/tokens`: platform-neutral token data plus CSS custom properties.

An icon package may be evaluated after v1 and is not required for the initial release.

### 8.2 Figma library

The Figma library provides:

- published light and dark variable modes;
- primitive and semantic variables;
- component sets matching supported React variants and states;
- Auto Layout, component properties, and nested instances;
- accessible usage notes where Figma cannot model runtime behavior; and
- version and change notes linked to code releases.

### 8.3 Documentation

The documentation site provides:

- installation and quick start;
- live component examples;
- API and prop reference;
- accessibility behavior and keyboard interaction;
- theming and theme customization;
- design token reference;
- Figma setup and designer/developer handoff;
- server-rendering guidance;
- migration notes and changelog; and
- contribution and governance guidance.

### 8.4 Token authoring tool

The existing OKLCH theme builder serves as the foundation for authoring and exporting color scales and semantic theme mappings. It should produce canonical token data for code and a Figma-compatible variable manifest. Figma synchronization may use a plugin or API bridge; arbitrary JSON import must not be presented as a native Figma capability.

## 9. Design token requirements

### 9.1 Token architecture

Tokens must use three levels:

1. **Primitive tokens:** raw values such as color scales, spacing steps, radii, typography, shadows, and motion values.
2. **Semantic tokens:** purpose-based aliases such as `color.background.canvas`, `color.text.primary`, and `color.border.focus`.
3. **Component tokens:** narrowly scoped aliases only where a component cannot be expressed cleanly through semantic tokens.

Components must consume semantic or component tokens, not primitive values (color, spacing, or otherwise).

Canonical token data should follow the W3C Design Tokens Community Group format where practical. Generated CSS and Figma manifests are build artifacts, not separate hand-maintained sources.

Spacing and other non-color foundations follow the same three-layer model: primitive scale values (for example `space.1`, `radius.2`), semantic purpose aliases (for example `spacing.inset.container`, `radius.control`), and rare component-scoped aliases only when shared semantics are insufficient.

### 9.2 Color

- OKLCH is the canonical authoring format for color.
- Each scale must define intended use, gamut behavior, and contrast relationships rather than relying only on numbered stops.
- Browser CSS should preserve OKLCH values where supported by the browser baseline.
- Out-of-gamut colors must be detected and mapped predictably for sRGB-only destinations.
- Figma values must be converted to supported color values while retaining a traceable relationship to canonical OKLCH tokens.
- Semantic foreground/background pairs in default themes must pass the applicable WCAG 2.2 AA contrast threshold.
- Contrast validation must cover component states, including hover, active, disabled, selected, focus, and destructive states.
- Color must not be the only means of conveying state or meaning.

### 9.3 Theme model

- Ship maintained light and dark modes.
- Support theme customization through documented CSS custom property overrides.
- Apply themes through a stable root selector such as `[data-theme]`.
- Support an optional `prefers-color-scheme` default without overriding an explicit user choice.
- Avoid flashes of the incorrect theme in documented SSR usage.
- Token overrides must be possible at the application root and at a scoped subtree.

### 9.4 Non-color foundations

v1 must define and document:

- spacing and radius as **size foundations** on an **8px spacing grid** with a single **4px half-step** for dense inline UI; semantic aliases for inset (padding), gap (sibling separation), stack (vertical rhythm), overlay offset, and corner radius (`control`, `surface`, `container`, `pill`, `circle`); specification in [`SIZES-SEMANTICS.md`](./SIZES-SEMANTICS.md) and CSS in [`sizes.css`](./sizes.css); Figma variable parity with CSS custom properties;
- sizing (control width/height);
- typography with semantic roles for display, headings (`h1`–`h6`), and UI copy (`body`, `control`, `label`, `caption`, `title`); Manrope as the default UI font; specification in [`TEXT-SEMANTICS.md`](./TEXT-SEMANTICS.md) and CSS in [`text.css`](./text.css); Figma variable parity with CSS custom properties;
- border width;
- elevation/shadow with semantic roles for raised surfaces, overlays, modals, and rings; specification in [`ELEVATION-SEMANTICS.md`](./ELEVATION-SEMANTICS.md) and CSS in [`elevation.css`](./elevation.css); Figma variable parity with CSS custom properties;
- opacity;
- focus ring;
- z-index layers; and
- motion duration and easing, including reduced-motion behavior; specification in [`MOTION-SEMANTICS.md`](./MOTION-SEMANTICS.md) and CSS in [`motion.css`](./motion.css); Figma variable parity with CSS custom properties.

## 10. React technical requirements

- React 19 and TypeScript are the v1 baseline.
- Packages must be ESM-first and publish valid type declarations.
- React and React DOM must be peer dependencies.
- Components must support server rendering and hydration.
- Importing a module must not access browser-only globals.
- Components and package entry points must be tree-shakeable.
- Styling must use CSS custom properties and prebuilt CSS.
- Z-UI must not require Tailwind CSS, a CSS-in-JS runtime, or a framework-specific host.
- Public components that render DOM nodes should support refs where useful.
- DOM-compatible props and `data-*` attributes should pass through where safe.
- Controlled and uncontrolled usage must follow standard React conventions.
- Form components must work with native form submission and expose name, value, required, disabled, and validation semantics where applicable.
- Development warnings may explain invalid composition but must not affect production behavior.
- Internal dependencies must be justified by accessibility, maintenance, and bundle impact.

### 10.1 API conventions

- Prefer familiar names based on HTML and React conventions.
- Use explicit props for behavior; do not infer critical behavior from visual content.
- Prefer composition for slots such as icons, descriptions, and actions.
- Every component must document default behavior, state model, ref target, keyboard behavior, accessible-name requirements, and token hooks.
- Breaking API changes require a major version after v1.
- Components must not silently replace consumer-provided accessible names or IDs.

## 11. Accessibility requirements

WCAG 2.2 Level AA is a release requirement for default themes, component behavior, documentation examples, and the documentation site.

Every applicable component must:

- use semantic HTML whenever a native element provides the required behavior;
- expose an accessible name and description path;
- provide visible focus indication using `:focus-visible`;
- support keyboard-only operation according to the relevant WAI-ARIA Authoring Practices pattern;
- preserve logical focus order;
- manage focus on open, close, dismissal, and restoration where required;
- communicate state through native attributes or correct ARIA states;
- support screen magnification, zoom to 200%, text resizing, and reflow at 320 CSS pixels;
- avoid required motion and honor `prefers-reduced-motion`;
- meet target-size requirements or document justified exceptions;
- work in forced-colors/high-contrast environments where practical; and
- avoid announcing decorative icons and duplicate content.

Automated checks are necessary but not sufficient. Release testing must include keyboard navigation and manual screen-reader checks on a documented browser/assistive-technology matrix.

## 12. v1 component scope

Z-UI ships **49 public components** organized into two tiers. The **Stable** tier (21 components) is the semver-guaranteed core that must satisfy the full definition of done before v1.0. The **Developing** tier (28 components) is public and supported but may change API or behavior until promoted to Stable.

### 12.1 Stable tier (21 components)

These components must satisfy the full definition of done (§12.3) before v1.0 and receive semver guarantees after v1.0.

#### Actions and display

1. Button
2. Icon Button
3. Link
4. Badge
5. Avatar
6. Separator
7. Spinner
8. Skeleton
9. Alert

#### Forms

10. Field
11. Text Field
12. Textarea
13. Checkbox
14. Radio Group
15. Switch
16. Select

#### Disclosure and overlays

17. Tabs
18. Dialog
19. Tooltip
20. Popover
21. Menu

### 12.2 Developing tier (28 components)

These components are public, documented, and tested but may change before promotion to Stable. Promotion requires satisfying the full definition of done and a parity review.

#### Actions and navigation

- Breadcrumbs
- Floating Action Button
- Megamenu
- Navbar
- Pagination
- Steps
- Toolbar

#### Forms and input

- Calendar
- File Input
- Filter
- OTP Input
- Range Slider
- Rating
- Validator

#### Feedback and display

- Card
- Indicator
- Progress
- Radial Progress
- Status
- Timeline

#### Layout, data, and disclosure

- Accordion
- Carousel
- Drawer
- ListItem
- Stack
- Table
- Theme Controller
- Toast

### 12.3 Definition of done — Stable tier

A Stable component is complete only when it has:

- a reviewed React implementation and public TypeScript API;
- a matching Figma component set;
- light and dark styling through shared semantic tokens;
- documented variants, states, composition rules, and examples;
- accessibility and keyboard-interaction documentation;
- unit and interaction tests;
- automated accessibility checks;
- manual keyboard and screen-reader verification where applicable;
- visual regression coverage for supported variants and themes;
- RTL verification where directional behavior exists;
- a measured bundle-size contribution; and
- a changelog entry.

### 12.4 Definition of done — Developing tier

A Developing component must have at minimum:

- a reviewed React implementation and public TypeScript API;
- light and dark styling through shared semantic tokens;
- package Markdown documentation;
- unit tests with automated accessibility checks (`checkA11y`);
- a docs-app registry entry (`.docs.tsx`); and
- documented known gaps or promotion blockers.

Developing components are not semver-guaranteed until promoted to Stable.

## 13. Figma/code parity

A parity manifest should record, per component:

- shared component name;
- supported variants and sizes;
- state names;
- slot names;
- relevant semantic and component tokens;
- deprecations; and
- Figma and package release versions.

The same concepts should use the same names in Figma and React unless platform constraints require a documented exception. CI or release tooling should detect token drift automatically. Component parity may initially use a release checklist, but must have an owner and auditable status.

Figma assets must not model inaccessible combinations as recommended defaults. Examples include icon-only controls without a naming note, low-contrast color combinations, and input states without labels or descriptions.

## 14. Performance and quality targets

Initial budgets, to be validated during alpha:

- No CSS-in-JS runtime.
- No production dependency added without a documented size and maintenance review.
- A single basic component import should add no more than 5 kB gzip of Z-UI JavaScript, excluding React and shared complex-interaction primitives.
- The full v1 component JavaScript should target no more than 30 kB gzip, excluding React.
- Core tokens and component CSS should target no more than 20 kB gzip.
- Package entry points must have no unintended side effects beyond explicitly imported CSS.
- Documentation examples must avoid unnecessary re-renders and layout shifts.

If a component cannot meet a budget without compromising accessibility or correctness, the trade-off must be documented and approved rather than hidden.

## 15. Browser and environment support

v1 supports the latest two stable versions of Chrome, Edge, Firefox, and Safari at release time. The project must also test:

- current iOS Safari;
- server rendering in a representative React 19 framework;
- keyboard-only interaction;
- forced-colors mode on Windows; and
- a published screen-reader matrix covering at least VoiceOver/Safari and NVDA/Chrome or Firefox.

The support matrix must be versioned in documentation. Features outside the baseline should degrade safely.

## 16. Testing and release gates

Required automated checks:

- TypeScript type checking;
- linting and formatting;
- unit and interaction tests;
- accessibility rule checks;
- visual regression in light and dark modes;
- token schema and generated-artifact validation;
- package export and type-consumer tests;
- bundle-size budgets; and
- production build verification.

Required manual checks before a stable component release:

- keyboard operation;
- focus behavior;
- screen-reader behavior for complex components;
- browser matrix smoke test;
- Figma/code parity review; and
- documentation accuracy.

No component may be labeled stable while known critical or high-severity accessibility defects remain.

## 17. Documentation requirements

Each component page must answer:

1. What problem does this component solve?
2. When should it and should it not be used?
3. How is it installed and imported?
4. What are its variants, states, and composition options?
5. What accessible name or visible label must the consumer provide?
6. What keyboard interactions are supported?
7. Which tokens can be customized?
8. How does the Figma component map to React?
9. Are there SSR, portal, form, or performance considerations?

Examples must be copyable, typed, and accessible. Documentation must not use placeholder ARIA attributes to silence automated checks.

## 18. Open-source requirements

Before public beta, the repository must include:

- an OSI-approved permissive license;
- README and project status;
- contribution guide;
- code of conduct;
- security policy and private vulnerability-reporting path;
- issue and pull-request templates;
- semantic versioning and changelog policy;
- maintainer and review expectations; and
- provenance and license review for dependencies and design assets.

Public APIs and token names should be treated as contracts. Deprecations must include a replacement path and remain available for at least one minor release when practical.

## 19. Success metrics

### Adoption

- Median time from installation to first rendered component is under 10 minutes in usability testing.
- At least 80% of alpha evaluators complete installation and basic theming without maintainer help.
- At least five external teams or projects use the beta and provide structured feedback before v1.

### Quality

- 100% of stable components satisfy the component definition of done.
- Zero known critical or high-severity accessibility defects at stable release.
- 100% of documented default foreground/background pairs pass their applicable WCAG AA threshold.
- All stable components have a Figma/code parity record.
- Bundle budgets pass in CI, except for explicitly approved and documented exceptions.

### Sustainability

- A first-time contributor can run, test, and preview the project using the documented setup.
- Issues and pull requests use published triage and review expectations.
- Releases provide synchronized package, documentation, token, and Figma change notes.

Downloads, stars, and Figma library usage may be observed, but they are not substitutes for adoption quality, accessibility, or maintainability.

## 20. Delivery phases

### Phase 0: Foundations

- Confirm naming, license, governance, and package ownership.
- Define token schema and naming.
- Establish package, documentation, testing, and release infrastructure.
- Produce initial light and dark themes.
- Define accessibility and browser test matrices.

### Phase 1: Alpha

- Deliver tokens, documentation shell, and the first 8–10 components.
- Publish an unpublished or prerelease Figma library.
- Validate API conventions, styling, package budgets, and token export.
- Test setup and theming with internal or invited users.

### Phase 2: Beta

- Complete the Stable tier (21 components) and harden the Developing tier.
- Publish prerelease packages and a public Figma community file/library.
- Complete component documentation and parity records.
- Recruit external adopters and resolve API, accessibility, and theming issues.
- Freeze candidate v1 APIs and token names.

### Phase 3: v1.0

- Pass all release gates.
- Publish stable packages, documentation, and Figma library.
- Publish migration, support, governance, and roadmap information.
- Begin semver-governed maintenance.

## 21. Key risks and mitigations

### Design/code drift

Mitigate with shared tokens, parity manifests, synchronized release checklists, and automated drift checks where possible.

### Accessibility regressions in complex widgets

Mitigate by preferring native elements, adopting documented interaction patterns, testing with assistive technology, and limiting custom behavior.

### Customization undermines accessibility

Mitigate with semantic token contracts, contrast tooling, warnings in documentation, and tested reference themes. Clearly state that arbitrary overrides can invalidate conformance.

### Scope expansion delays a stable release

Mitigate with the tiered catalog model, explicit non-goals, and definition-of-done gates that gate semver guarantees to the Stable tier only.

### Lightweight goals conflict with correct behavior

Mitigate with per-component measurement and transparent exceptions. Accessibility and correctness take priority over an arbitrary byte target.

### OKLCH/Figma color differences

Mitigate with a canonical source, documented gamut mapping, deterministic conversion, and visual/contrast validation of generated Figma values.

## 22. Decisions recorded

- Audience: general React product teams.
- Styling: CSS custom properties with prebuilt CSS.
- Accessibility target: WCAG 2.2 Level AA.
- Initial scope: tokens plus a tiered catalog of 49 components (21 Stable, 28 Developing).
- Platform baseline: React 19, TypeScript, and ESM-first packaging.
- Themes: maintained light and dark modes with theme customization.

## 23. Open decisions before implementation freeze

1. Select the exact permissive license.
2. Confirm npm package names and organization ownership.
3. Decide whether complex interaction primitives are implemented internally or built on a maintained accessibility library.
4. Approve token naming conventions and the canonical token schema.
5. Select documentation and visual-regression tooling.
6. Define the exact browser/screen-reader versions for the first release matrix.
7. Confirm the v1 component list after alpha user interviews.
8. Define the Figma publication and synchronization workflow.
9. Validate bundle budgets against representative implementations.

## 24. Requirement language

The words **must**, **should**, and **may** are intentional:

- **Must** indicates a release requirement.
- **Should** indicates the default expectation; exceptions require rationale.
- **May** indicates an optional capability.

When implementation choices conflict, prioritize in this order: accessibility and correctness, API stability, design/code parity, user experience, maintainability, then bundle size.
