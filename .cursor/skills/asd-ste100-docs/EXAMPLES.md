# Rewrite examples

Every example uses real text from this repository. The technical facts are identical on both sides.

## 1. Long descriptive sentence with three topics

**Before** (44 words, three topics, `and more`):

> This document defines how **color semantics** work in Z-UI: purpose-based color tokens that stay stable across light and dark themes, map cleanly between Figma and code, and remain usable under interaction states (hover, focus, disabled, and more).

**After:**

> This document defines the color semantics of Z-UI. A semantic color token names a purpose, not a value.
>
> A semantic color token must:
>
> - Keep the same name in the light theme and the dark theme.
> - Map to the same name in Figma and in CSS.
> - Work in every interaction state, such as hover, focus, and disabled.

Rules applied: one topic per sentence, 25-word limit, vertical list for a list of conditions, no `and more`.

## 2. Passive voice and a hidden actor

**Before:**

> Contrast **must** be validated for interaction and meaning states: hover, active, disabled, selected, focus, and destructive.

**After:**

> You **must** check the contrast of every interaction state and every meaning state: hover, active, disabled, selected, focus, and destructive.

Rules applied: active voice, named actor, `check` instead of `validate`. The requirement word `must` stays.

## 3. Metaphor and idiom

**Before:**

> Semantics let teams retheme the neutral emphasis role once and keep every component consistent without restyling each control by hand.

**After:**

> Change the neutral emphasis role one time. Every component that uses the role changes with it. You do not restyle each control.

Rules applied: short sentences, no `let teams`, active voice, imperative first.

## 4. Long noun cluster

**Before:**

> Default semantic foreground/background pairs must meet WCAG 2.2 Level AA contrast.

**After:**

> Each default pair of a semantic foreground token and a semantic background token must meet WCAG 2.2 Level AA contrast.

Rules applied: three-word noun cluster limit, no slash between words.

## 5. Parenthesis that carries a requirement

**Before:**

> Color **must not** be the only way to convey state or meaning (use labels, icons, structure, disabled attributes, focus rings, etc.).

**After:**

> Color **must not** be the only signal of state or meaning. Add a second signal, such as a label, an icon, the structure, a disabled attribute, or a focus ring.

Rules applied: no requirement inside parentheses, no `etc.`, `show` family verb instead of `convey`.

## 6. Component documentation prose

**Before:**

> Badge displays compact status labels or counts with tone-aware subtle background colors across light and dark themes.

**After:**

> Badge shows a short status label or a count. Badge uses a subtle background color for each tone, in the light theme and in the dark theme.

Rules applied: one topic per sentence, no `tone-aware` coined adjective, technical name `tone` kept.

## 7. Guidance list items

**Before:**

> - Showing status, category, or count metadata inline.
> - A short label needs tonal emphasis without full alert treatment.

**After:**

> - You show a status, a category, or a count next to other text.
> - A short label needs the emphasis of a tone, but not the emphasis of `Alert`.

Rules applied: parallel sentence pattern, no `-ing` form as a noun, no coined phrase `full alert treatment`.

## 8. Conditional instruction

**Before:**

> Hardcoded values are acceptable only where the documentation says that token category is not implemented.

**After:**

> If the documentation says that a token category is not implemented, you can use a literal value. In every other case, use a token.

Rules applied: condition before action, `can` for permission, rule and exception separated.

## 9. Do not over-simplify

**Before:**

> Component-scoped tokens are an escape hatch and require explicit approval.

**After:**

> A component-scoped token is a last resort. Ask for approval before you add one.

**Wrong:**

> Do not use component-scoped tokens.

The wrong version is shorter, but it changed the rule. Simplify the language, never the requirement.
