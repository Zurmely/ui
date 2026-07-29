---
name: asd-ste100-docs
description: Rewrites and reviews this repository's Markdown documentation in ASD-STE100 Simplified Technical English. Use when the user asks to rewrite, simplify, or audit documentation with STE, Simplified Technical English, ASD-STE100, controlled English, or plain-language rules, including README.md, PRD.md, the *-SEMANTICS.md contracts, packages/react/docs/*, and component Markdown files.
disable-model-invocation: false
---

# ASD-STE100 documentation rewriting

Rewrite documentation so that a reader with limited English can understand it on the first read. Change the language, not the technical contract.

## Non-negotiable

- **Never change technical facts.** Token names, prop names, component names, file paths, commands, code, values, and tables of record stay exactly as they are.
- **Never change code.** Rewrite prose only. Do not touch fenced code blocks, inline code spans, front matter, or link targets.
- **Preserve document structure** unless the user asks for a restructure. Keep heading text, heading order, numbering, and table columns.
- **Do not add information.** If prose is ambiguous, ask instead of inventing behavior.
- **Do not delete a requirement** to shorten a sentence. Split the sentence instead.

## Reference files

Read the file you need, not all of them.

- Condensed writing rules by section: [RULES.md](RULES.md)
- Word choices, approved alternatives, and technical-name policy: [DICTIONARY.md](DICTIONARY.md)
- Before/after rewrites from this repository: [EXAMPLES.md](EXAMPLES.md)
- Mechanical checker: `scripts/check_ste.py`

Always read `RULES.md` and `DICTIONARY.md` before the first rewrite in a session.

## Workflow

Copy this checklist and track progress:

```
- [ ] 1. Agree on scope
- [ ] 2. Build the technical-name list
- [ ] 3. Rewrite one file
- [ ] 4. Run the checker
- [ ] 5. Verify the contract is unchanged
- [ ] 6. Report
```

### 1. Agree on scope

List the files in scope and their order. Rewrite one file per pass. Do not start a second file until the first one passes step 5.

Typical documentation in this repository:

| Group | Files |
| --- | --- |
| Root contracts | `README.md`, `PRD.md`, `COLOR-SEMANTICS.md`, `SIZES-SEMANTICS.md`, `TEXT-SEMANTICS.md`, `MOTION-SEMANTICS.md`, `ELEVATION-SEMANTICS.md` |
| Package guides | `packages/react/docs/NAMING.md`, `packages/react/docs/STATE-MATRIX.md`, `packages/react/docs/COMPONENT_TEMPLATE.md` |
| Component documentation | `packages/react/src/components/*/*.md` |

### 2. Build the technical-name list

Before you rewrite, collect the terms that must stay constant in the file: component names, prop names, variant and tone values, `--z-*` token names, `data-*` attributes, package names, and command names.

One thing gets one name. If the file already uses two names for the same thing, do not choose one silently. Report the conflict and ask.

### 3. Rewrite one file

Work paragraph by paragraph, top to bottom. For each sentence:

1. Put the actor first and use the active voice.
2. Use one instruction or one statement per sentence.
3. Keep procedural sentences to 20 words or fewer, and descriptive sentences to 25 words or fewer.
4. Replace a not-approved word with an approved word from `DICTIONARY.md`.
5. Break a noun cluster longer than three words with a preposition or a hyphen.
6. Keep paragraphs to six sentences or fewer, with one topic each.
7. Turn a sentence that contains a list of actions or conditions into a vertical list.

Keep the tone of a specification. Simple English is not informal English.

### 4. Run the checker

```bash
python3 .cursor/skills/asd-ste100-docs/scripts/check_ste.py README.md
```

The checker reports long sentences, long noun clusters, not-approved words, contractions, slashes, semicolons, and long paragraphs. It skips code blocks, tables, and link targets.

Fix each finding or justify it. A finding is a signal, not a verdict: a long sentence that carries a single unbreakable requirement can stay if you say why.

Run the checker again until it is clean or every remaining finding has a stated reason.

### 5. Verify the contract is unchanged

```bash
git diff -- <file>
```

Read the diff and confirm:

- No token name, prop name, value, default, or path changed.
- No code block changed.
- No table cell that records an API changed, except for prose inside a `Notes` column.
- No requirement disappeared.

If the diff shows a technical change you did not intend, revert that hunk.

### 6. Report

State:

- Files rewritten
- Rules that drove the largest changes
- Checker findings that remain, with the reason for each
- Terminology conflicts found, and the question you need answered
- Confirmation that the technical contract is unchanged

## Repository-specific rules

- Component documentation follows the numbered sections in `packages/react/docs/COMPONENT_TEMPLATE.md`. Keep the section headings and their order.
- Treat `--z-*` variables, prop names, and `data-*` attributes as technical names. Never simplify, translate, or pluralize them.
- Keep the words `must`, `must not`, `do not`, and `can`. They carry requirement strength. Do not soften `must` to `should`.
- The words "primitive", "semantic token", "component-scoped token", "tone", "variant", "slot", and "state" are the project vocabulary. Keep them and use them consistently.
- Write `Use when:` and `Do not use when:` lists as short imperative or noun-phrase items.
- Do not rename a heading such as `What problem does this component solve?` even though it is a question. Headings are part of the template contract.
