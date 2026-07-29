# Condensed ASD-STE100 writing rules

This is a working restatement of the ASD-STE100 writing rules, grouped by the sections of the specification and adapted to software documentation. It is not the official text. When a decision matters, consult the official specification.

## 1. Words

1. Use only approved words. Approved words are the words in the STE Dictionary, the technical names in your project, and the technical verbs your project needs. See [DICTIONARY.md](DICTIONARY.md).
2. Use an approved word only as the part of speech given for it. If `use` is approved as a verb, do not write `the use of`.
3. Use an approved word with its approved meaning only. Do not reuse a word for a second meaning in the same document set.
4. Use one term for one thing. Do not introduce a synonym for variety.
5. Use one verb for one action. Do not alternate between `set`, `assign`, and `define` for the same operation.
6. Use technical names freely when they name a real thing: a component, a prop, a token, a file, a value, a standard.
7. Use a technical verb only when no approved verb states the action. `Render`, `import`, and `mount` are technical verbs in this domain.
8. Do not use slang, idioms, metaphors, or humor. `Under the hood`, `out of the box`, and `first-class` are not allowed.
9. Do not use a word as a noun if it is an `-ing` form, unless the `-ing` form is a technical name. Write `the component renders the label` instead of `rendering of the label`.
10. Keep articles. Write `the token`, not `token`. Articles help a reader parse a sentence.
11. Do not drop words to save space. Telegraphic style is harder to read, not easier.

## 2. Noun phrases

1. Use three words or fewer in a noun cluster. `focus ring color` is acceptable. `dark theme focus ring color token` is not.
2. Break a long cluster with a preposition or a hyphen: `the color token for the focus ring in the dark theme`.
3. Define a cluster you must keep, once, at first use.
4. Do not turn a verb into a noun when the verb works. Write `the token changes the color` instead of `the token performs a color change`.

## 3. Verbs

1. Use the active voice. Name the actor: the component, the token, the developer, the user, the build.
2. Use the passive voice only in descriptive text where the actor is unknown or irrelevant, and never in an instruction.
3. Use simple tenses only: infinitive, imperative, simple present, simple past, and the past participle as an adjective. Do not use the perfect or progressive tenses.
4. Use the imperative for every instruction: `Run the build`, not `The build should be run`.
5. Do not omit the verb. Every sentence needs one.
6. Use `can` for capability, `must` for a requirement, `do not` for a prohibition. Avoid `may`, `might`, `could`, `would`, and `shall`.
7. Do not use a compound verb where a single verb works. Write `remove` instead of `carry out the removal of`.

## 4. Sentences

1. Keep a procedural sentence to 20 words or fewer.
2. Keep a descriptive sentence to 25 words or fewer.
3. Write one instruction per sentence. Two actions that must happen together can share one sentence.
4. Write one topic per paragraph.
5. Keep a paragraph to six sentences or fewer.
6. Start with the main point. Put the condition before the action: `If the theme is dark, use the subtle background token.`
7. Vary sentence length so that the text does not read as a list of fragments.
8. Connect related sentences with a clear word such as `then`, `also`, `however`, or `because`.

## 5. Procedures

1. Use the imperative for every step.
2. Use a numbered vertical list when the order matters, and a bulleted list when it does not.
3. Give one action per step. Split a step that contains `and then`.
4. State the condition, the location, or the precondition before the action.
5. Put the reason after the action if the reader needs it: `Run the token build, because the published CSS is generated.`
6. Keep a list item to one sentence where possible.

## 6. Descriptive writing

1. Describe one thing at a time.
2. Use a table for parallel facts such as props, values, and defaults. Do not describe a table in prose again.
3. Use a short paragraph to explain purpose and constraint, and a list for enumerable facts.
4. State the rule before the exception.

## 7. Warnings, cautions, and notes

1. Start a warning or a caution with a clear command.
2. State the condition after the command, or before it in a separate short sentence.
3. Keep a warning to the fewest words that state the risk and the action.
4. Use a note for information only. Never hide a requirement in a note.

## 8. Punctuation and numbers

1. Use the period, the comma, the colon, the hyphen, and parentheses. Prefer short sentences over heavy punctuation.
2. Do not use the semicolon. Write two sentences.
3. Do not use a slash between words. Write `light or dark`, not `light/dark`. A slash inside a technical name or a path stays.
4. Do not use parentheses to carry a requirement. Move it into a sentence.
5. Do not use contractions. Write `do not`, not `don't`.
6. Use an abbreviation only after you write the full term once, or when the abbreviation is the accepted technical name, such as CSS, ARIA, or SSR.
7. Write numbers as digits when they carry a value: `12px`, `3 nouns`, `20 words`.
8. Do not use `&` for `and`, `e.g.` for `for example`, or `i.e.` for `that is`.

## 9. Writing practices

1. Prefer a list, a table, or a diagram to a long paragraph.
2. Keep the same sentence pattern for parallel items in a list.
3. Repeat a noun rather than use a pronoun whose reference is not obvious.
4. Place a reference to another document at the end of the sentence.
5. Do not use empty intensifiers such as `very`, `simply`, `just`, `easily`, `powerful`, or `seamless`.
6. Do not address the reader with politeness words such as `please`.
