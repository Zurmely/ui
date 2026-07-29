# Word choices

ASD-STE100 allows a word only if it is in the STE Dictionary, or it is a technical name, or it is a technical verb the domain needs. This file lists the choices that come up in this repository.

## Replacements

Left column: word or phrase to avoid. Right column: what to write instead.

### Verbs

| Avoid | Use |
| --- | --- |
| utilize, leverage, employ | use |
| perform, execute (an action) | do, run |
| implement (in prose about a task) | write, add, build |
| enable (a feature) | turn on, allow |
| disable | turn off, prevent |
| ensure, guarantee | make sure, confirm |
| require (as a verb of need) | need, must have |
| provide | give, supply, include |
| obtain, acquire | get |
| indicate | show |
| specify | give, set, name |
| determine | find, decide, set |
| handle, deal with | control, manage, process |
| consume (a token) | use |
| override | replace, change |
| inherit (prose sense) | get from, take from |
| propagate | pass, send |
| accommodate | hold, support |
| facilitate | help |
| commence, initiate | start |
| terminate | stop, end |
| modify | change |
| verify | check, confirm |
| render (prose sense) | show, draw |

`render`, `import`, `export`, `mount`, `unmount`, `hydrate`, `build`, `bundle`, `compile`, and `install` are technical verbs. Use them when they name the real operation. Do not use them as a general-purpose replacement for `show` or `make`.

### Nouns and adjectives

| Avoid | Use |
| --- | --- |
| functionality | function, feature, behavior |
| capability | function, feature |
| implementation | code, the component, the CSS |
| utilization, usage | use |
| documentation (when you mean one file) | this document, the component document |
| numerous, a multitude of | many |
| a variety of | different, several |
| approximately | about |
| prior to | before |
| subsequent to, following | after |
| in order to | to |
| due to the fact that | because |
| in the event that | if |
| with respect to, regarding | about, for |
| additionally, furthermore, moreover | also |
| however (start of sentence) | but, or a new sentence |
| via | with, through |
| etc. | Name the items, or write `and other <plural noun>` |
| e.g. | for example |
| i.e. | that is |
| N/A | not applicable |
| robust, powerful, seamless, elegant | Delete, or state the measurable property |
| simply, just, easily, merely | Delete |
| very, extremely, quite | Delete |
| please | Delete |
| best practice | rule, requirement, convention |
| under the hood, out of the box | Delete, and state the mechanism |
| first-class | supported |
| lightweight | small, or state the size |
| intuitive, user-friendly | Delete, or state the behavior |

### Requirement words

| Word | Meaning | Use |
| --- | --- | --- |
| must | mandatory | Keep |
| must not | prohibited | Keep |
| do not | prohibited, in an instruction | Keep |
| can | capability or permission | Keep |
| should | recommendation | Use only for a real recommendation, never for a requirement |
| may, might, could, shall, ought to | ambiguous | Replace with `can` or `must` |

## Technical names

A technical name is allowed even if it is not an approved word. In this repository the technical names include:

- Component names: `Badge`, `Button`, `Dialog`, and every other exported component
- Prop names and values: `tone`, `variant`, `size`, `neutral`, `subtle`, `sm`, `md`, `lg`
- Token names: every `--z-*` variable, and every primitive such as `--purple-500`
- Token contract names: `font.size.1`, `text.badge`
- Attributes: `data-tone`, `data-size`, `aria-label`
- Files, paths, and packages: `colors.css`, `packages/react/docs/NAMING.md`, `@z-ui/react`
- Commands: `pnpm add`, `pnpm test`
- Standards and platform terms: CSS, HTML, ARIA, SSR, WCAG, DOM, TypeScript, React, Radix, Figma

Rules for technical names:

1. Write a technical name exactly as the code writes it, inside a code span.
2. Do not pluralize a technical name. Write `two `--z-color-text-*` tokens`, not `--z-color-text-*s`.
3. Do not use a technical name as a verb. Write `import the component`, not `React the component`.
4. Use the same name for the same thing in every document.

## Deciding on an unlisted word

Ask three questions in order:

1. Is it a technical name? Keep it.
2. Is there a shorter, more common word with the same meaning? Use that word.
3. Does the sentence still carry the same requirement after the change? If not, split the sentence instead of changing the word.

If a word is central to a document's meaning and no simple word replaces it, keep it and define it once at first use.
