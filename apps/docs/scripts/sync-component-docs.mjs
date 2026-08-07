#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../..');

const SLUG_TO_FOLDER = {
  'accessibility-controller': 'accessibility',
};

const CANONICAL_HEADINGS = [
  'Overview',
  'When to use',
  'Install',
  'API',
  'Accessibility',
  'Keyboard',
  'Tokens',
  'Figma',
  'Notes',
  'Examples',
];

const STE_SECTIONS = ['Overview', 'When to use', 'Accessibility', 'Notes'];

const ACCESSIBILITY_CONTROLLER_FIGMA = `## Figma

| Accessibility settings | \`AccessibilityController\` |`;

function folderForSlug(slug) {
  return SLUG_TO_FOLDER[slug] ?? slug;
}

function humanDocPath(slug, componentName, importPath) {
  const folder = folderForSlug(slug);
  if (isChartsImport(importPath)) {
    return path.join(root, 'packages/charts/src/components', folder, `${componentName}.md`);
  }
  return path.join(root, 'packages/react/src/components', folder, `${componentName}.md`);
}

function aiDocPath(slug, importPath) {
  if (isChartsImport(importPath)) {
    return path.join(root, 'packages/charts/docs/ai', `${slug}.md`);
  }
  return path.join(root, 'packages/react/docs/ai', `${slug}.md`);
}

function isChartsImport(importPath) {
  return importPath?.startsWith('@z-ux/charts');
}

function extractQuotedField(content, field) {
  const re = new RegExp(`${field}:\\s*'([^']*)'`);
  return content.match(re)?.[1] ?? null;
}

function extractSummary(content) {
  const single = content.match(/summary:\s*'([^']*)'/);
  if (single) return single[1];
  const multi = content.match(/summary:\s*\n\s*'([^']*)'/);
  if (multi) return multi[1];
  return '';
}

function readRegistry() {
  const docsDir = path.join(root, 'apps/docs/src/components');
  const entries = [];

  for (const file of fs.readdirSync(docsDir)) {
    if (!file.endsWith('.docs.tsx')) continue;
    const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
    const slug = extractQuotedField(content, 'slug');
    const componentName = extractQuotedField(content, 'componentName');
    const importPath = extractQuotedField(content, 'importPath');
    const category = extractQuotedField(content, 'category');
    const summary = extractSummary(content);
    // Charts are parked locally (gitignored) until design-system ready.
    if (isChartsImport(importPath)) continue;
    if (!slug || !componentName) {
      throw new Error(`Could not parse metadata from ${file}`);
    }
    entries.push({ slug, componentName, importPath, category, summary });
  }

  return entries.sort((a, b) => a.slug.localeCompare(b.slug));
}

function parseSections(content) {
  const lines = content.split('\n');
  const title = lines[0]?.startsWith('# ') ? lines[0].slice(2).trim() : '';
  const sections = {};
  let current = null;
  let body = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      if (current) sections[current] = body.join('\n').replace(/\n+$/, '');
      current = line.slice(3).trim();
      body = [];
    } else {
      body.push(line);
    }
  }
  if (current) sections[current] = body.join('\n').replace(/\n+$/, '');

  return { title, sections };
}

function rebuildHumanDoc(title, sections) {
  const parts = [`# ${title}`];
  for (const heading of CANONICAL_HEADINGS) {
    if (!sections[heading]) continue;
    const body = sections[heading].replace(/\n{3,}/g, '\n\n').trim();
    parts.push('', `## ${heading}`, '', body);
  }
  return `${parts.join('\n')}\n`;
}

function rewriteSentence(text) {
  let s = text.trim();
  if (!s) return s;

  s = s.replace(/\blets users\b/gi, 'lets the user');
  s = s.replace(/\ballows users to\b/gi, 'lets the user');
  s = s.replace(/\bcan be used to\b/gi, 'can');
  s = s.replace(/\bin order to\b/gi, 'to');
  s = s.replace(/\butilize\b/gi, 'use');
  s = s.replace(/\butilizes\b/gi, 'uses');
  s = s.replace(/\bensure\b/gi, 'make sure');
  s = s.replace(/\bprovides\b/gi, 'gives');
  s = s.replace(/\bperforms\b/gi, 'does');
  s = s.replace(/\bdisplays\b/gi, 'shows');
  s = s.replace(/\bindicates\b/gi, 'shows');
  s = s.replace(/\bYou must\b/g, 'You need to');
  s = s.replace(/\bGive\b/g, 'Set');

  return s.replace(/\s+/g, ' ').trim();
}

function rewriteProseBlock(text) {
  if (!text) return text;

  const lines = text.split('\n');
  const out = [];
  let inCode = false;

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCode = !inCode;
      out.push(line);
      continue;
    }
    if (inCode || line.startsWith('|')) {
      out.push(line);
      continue;
    }
    if (!line.trim()) {
      out.push(line);
      continue;
    }
    if (line.match(/^\*\*[^*]+:\*\*$/)) {
      out.push(line);
      continue;
    }
    if (line.startsWith('- ')) {
      const noteMatch = line.match(/^(- )(\*\*[^*]+:\*\*)\s*(.*)$/);
      if (noteMatch) {
        out.push(`${noteMatch[1]}${noteMatch[2]} ${rewriteSentence(noteMatch[3])}`);
        continue;
      }
      const bulletText = line.slice(2);
      out.push(`- ${rewriteSentence(bulletText)}`);
      continue;
    }
    out.push(rewriteSentence(line));
  }

  return out.join('\n');
}

function rewriteOverview(text, summary) {
  const rewritten = rewriteProseBlock(text);
  const sentences =
    rewritten.match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()) ?? [rewritten.trim()];

  if (sentences.length >= 2) {
    return `${sentences[0]}\n\n${sentences[1]}`;
  }

  const first = sentences[0] ?? '';
  const second = summary ? rewriteSentence(summary.endsWith('.') ? summary : `${summary}.`) : '';

  if (first && second && !first.toLowerCase().includes(second.toLowerCase().slice(0, 20))) {
    return `${first}\n\n${second}`;
  }

  return first;
}

function ensureAccessibilityControllerFigma(sections) {
  if (sections.Figma?.trim()) return sections;
  sections.Figma = '| Accessibility settings | `AccessibilityController` |';
  return sections;
}

function parseMarkdownTable(text) {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('|'));
  if (lines.length < 2) return [];

  const splitRow = (line) =>
    line
      .split('|')
      .map((c) => c.trim())
      .filter((c, i, arr) => i > 0 && i < arr.length - 1);

  const headers = splitRow(lines[0]);
  return lines.slice(2).map((line) => {
    const cells = splitRow(line);
    return Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? '']));
  });
}

function extractBullets(section, label) {
  const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*\\n([\\s\\S]*?)(?=\\*\\*|$)`);
  const match = section.match(re);
  if (!match) return [];
  return (match[1].match(/^- .+$/gm) ?? []).map((b) => b.replace(/^- /, '').trim());
}

function extractImportLines(installSection) {
  const tsxMatch = installSection.match(/```tsx\n([\s\S]*?)```/);
  if (!tsxMatch) return null;
  const block = tsxMatch[1];
  const imports = [];
  const importRe = /import\s+(?:[\s\S]*?);/g;
  let match;
  while ((match = importRe.exec(block)) !== null) {
    const statement = match[0]
      .replace(/\s+/g, ' ')
      .replace(/,\s*}/g, ' }')
      .replace(/,\s*,/g, ',')
      .trim();
    if (!statement.includes('@z-ux/tokens')) imports.push(statement);
  }
  return imports.length > 0 ? imports.join('\n') : null;
}

function extractApiTable(apiSection) {
  const beforeSub = apiSection.split(/^### /m)[0];
  return parseMarkdownTable(beforeSub);
}

function extractSubsection(apiSection, name) {
  const match = apiSection.match(new RegExp(`### ${name}\\s*\\n([\\s\\S]*?)(?=### |$)`));
  return match?.[1]?.trim() ?? '';
}

function propDecisionRule(row) {
  const prop =
    row['Prop'] ?? row['Prop / attribute'] ?? row['Component'] ?? row['Slot'] ?? '';
  const values = row['Values'] ?? row['Type'] ?? '';
  const notes = row['Notes'] ?? '';
  const defaultVal = row['Default'] ?? '';

  if (!prop) return null;

  const cleanProp = prop.replace(/`/g, '');
  if (/^[A-Z]/.test(cleanProp) && cleanProp !== 'ReactNode') {
    return null;
  }

  const cleanValues = values.replace(/`/g, '');
  const cleanDefault = defaultVal.replace(/`/g, '');

  if (cleanValues && cleanValues !== 'boolean' && !cleanValues.includes('(')) {
    const valText = cleanValues;
    if (defaultVal && defaultVal !== '—') {
      return `Set \`${cleanProp}\` for ${valText}; default is ${cleanDefault}.`;
    }
    return `Set \`${cleanProp}\` for ${valText}.`;
  }

  if (
    cleanValues === 'boolean' ||
    cleanDefault === 'boolean' ||
    cleanDefault === 'false' ||
    cleanDefault === 'true'
  ) {
    if (notes) return `Set \`${cleanProp}\` when ${notes.replace(/\.$/, '')}.`;
    const hints = {
      disabled: 'the control should not accept input',
      isLoading: 'the control shows a loading state',
      open: 'you control open state externally',
      defaultOpen: 'the overlay should open initially without external state',
      modal: 'focus should be trapped and outside interaction blocked',
      invalid: 'validation failed',
      required: 'the field is required',
      asChild: 'you need to merge props onto a child element',
    };
    const hint = hints[cleanProp];
    if (hint) return `Set \`${cleanProp}\` when ${hint}.`;
    return `Set \`${cleanProp}\` to toggle ${cleanProp} behavior.`;
  }

  if (notes) return `Set \`${cleanProp}\` when ${notes.replace(/\.$/, '')}.`;

  return `Set \`${cleanProp}\` to change behavior.`;
}

function buildComposeSection(apiSection, componentName) {
  const slotsBlock = extractSubsection(apiSection, 'Slots');
  const subBlock = extractSubsection(apiSection, 'Subcomponents');
  const parts = [];

  if (slotsBlock) {
    const rows = parseMarkdownTable(slotsBlock);
    for (const row of rows) {
      const slot = row['Slot'] ?? '';
      const required = row['Required'] ?? '';
      const notes = row['Notes'] ?? row['Allowed components'] ?? '';
      if (!slot) continue;
      const req = required.toLowerCase().startsWith('yes') ? 'Required' : 'Optional';
      parts.push(`- **${slot.replace(/`/g, '')}** (${req}): ${notes || 'slot content'}.`);
    }
  }

  if (subBlock) {
    const rows = parseMarkdownTable(subBlock);
    for (const row of rows) {
      const comp = row['Component'] ?? '';
      const role = row['Role'] ?? '';
      if (comp) parts.push(`- **${comp.replace(/`/g, '')}**: ${role || 'subcomponent'}.`);
    }
  }

  if (parts.length === 0) {
    return `Use \`${componentName}\` as documented in the human API section. Add child controls or slots that match the task.`;
  }

  return parts.join('\n');
}

function buildStyleTokensSection(tokensSection) {
  const rows = parseMarkdownTable(tokensSection);
  const bullets = rows.map((row) => {
    const part = row['Part'] ?? row['Direction'] ?? row['Gap'] ?? 'Surface';
    const tokens = row['Semantic tokens'] ?? row['Token'] ?? '';
    if (!tokens) return null;
    return `- **${part.replace(/`/g, '')}:** ${tokens}`;
  }).filter(Boolean);

  const standard = [
    '- Use semantic `--z-color-*`, `--z-spacing-*`, `--z-text-*`, `--z-radius-*`, and `--z-motion-*` roles from the human doc Tokens table.',
    '- Do not hardcode colors, rem sizes, or easings when a semantic token exists.',
    '- Import token CSS at the app layer; do not bundle tokens inside component CSS.',
  ];

  return [...bullets, ...standard].join('\n');
}

function preferInsteadRows(doNotBullets) {
  const rows = [];
  for (const bullet of doNotBullets) {
    const useInstead = bullet.match(/Use `([^`]+)` instead\.?$/i);
    const useOr = bullet.match(/Use `([^`]+)` or `([^`]+)`\.?$/i);
    const parens = bullet.match(/\(`([^`]+)`\)/);
    const inlineUse = bullet.match(/Use `([^`]+)` with/);

    let situation = bullet.replace(/\.$/, '');
    let component = '';

    if (useInstead) {
      situation = bullet.replace(/\.\s*Use `[^`]+` instead\.?$/i, '').replace(/\.$/, '');
      component = useInstead[1];
    } else if (useOr) {
      situation = bullet.replace(/\.\s*Use `[^`]+` or `[^`]+`\.?$/i, '').replace(/\.$/, '');
      component = useOr[2] ? `${useOr[1]} / ${useOr[2]}` : useOr[1];
    } else if (inlineUse) {
      situation = bullet.replace(/\.\s*Use `[^`]+` with.*$/, '').replace(/\.$/, '');
      component = inlineUse[1];
    } else if (parens) {
      component = parens[1];
      situation = bullet.replace(/\s*\(`[^`]+`\)\.?/, '').replace(/\.$/, '');
    } else {
      const componentMatch = bullet.match(/`([A-Z][A-Za-z0-9]*)`/);
      if (componentMatch) {
        component = componentMatch[1];
        situation = bullet.replace(/`[^`]+`/g, '').replace(/\.$/, '').trim();
      }
    }

    if (!component) continue;
    rows.push({ situation, component });
  }
  return rows;
}

function buildDoNotSection(doNotBullets, notesSection, componentName) {
  const items = [];

  for (const bullet of doNotBullets) {
    const text = bullet.replace(/\.\s*Use `[^`]+` instead\.?$/i, '.').trim();
    if (text) items.push(text.endsWith('.') ? text : `${text}.`);
  }

  const noteLines = notesSection.match(/^- \*\*[^*]+:\*\*.*$/gm) ?? [];
  for (const line of noteLines) {
    const m = line.match(/^- \*\*([^:]+):\*\*\s*(.*)$/);
    if (!m) continue;
    const label = m[1].trim();
    if (label === 'SSR' || label === 'Portal' || label === 'Form') continue;
    items.push(`${m[2].trim()}`);
  }

  items.push(`Do not recreate \`${componentName}\` with raw HTML and one-off CSS when this component fits the task.`);

  return items.map((item) => `- ${item.replace(/^- /, '')}`).join('\n');
}

function relationshipHint(summary, category) {
  const short = summary.split('.')[0];
  return short.length > 80 ? `${short.slice(0, 77)}...` : short;
}

function buildRelatedSection(meta, registry) {
  const siblings = registry
    .filter((d) => d.category === meta.category && d.slug !== meta.slug)
    .sort((a, b) => a.componentName.localeCompare(b.componentName));

  const picks = siblings.slice(0, 4);

  return picks
    .map((d) => `- \`${d.componentName}\` — ${relationshipHint(d.summary, d.category)}`)
    .join('\n');
}

function overviewForPurpose(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('**'))
    .join('\n\n');
}

function buildAiDoc(meta, sections, registry) {
  const overview = sections.Overview ?? meta.summary;
  const whenToUse = sections['When to use'] ?? '';
  const install = sections.Install ?? '';
  const api = sections.API ?? '';
  const accessibility = sections.Accessibility ?? '';
  const tokens = sections.Tokens ?? '';
  const notes = sections.Notes ?? '';

  const useWhen = extractBullets(whenToUse, 'Use when');
  const doNotUse = extractBullets(whenToUse, 'Do not use when');

  const selectWhen =
    useWhen.length > 0
      ? useWhen.map((b) => `- ${b}`).join('\n')
      : `- ${meta.summary}`;

  const preferRows = preferInsteadRows(doNotUse);
  const preferInstead =
    preferRows.length > 0
      ? [
          '| Situation | Use |',
          '| --- | --- |',
          ...preferRows.map((r) => {
            const useCell = r.component.includes('/')
              ? r.component
                  .split('/')
                  .map((c) => c.trim())
                  .map((c) => `\`${c}\``)
                  .join(' / ')
              : `\`${r.component}\``;
            return `| ${r.situation} | ${useCell} |`;
          }),
        ].join('\n')
      : '| Situation | Use |\n| --- | --- |\n| Task needs a different pattern | See Related components |';

  const importLines = extractImportLines(install);
  const importBlock =
    importLines ??
    `import { ${meta.componentName} } from '${meta.importPath ?? `@z-ux/ui/${folderForSlug(meta.slug)}`}';`;

  const compose = buildComposeSection(api, meta.componentName);

  const apiRows = extractApiTable(api);
  const propRows = apiRows
    .map((row) => {
      const rule = propDecisionRule(row);
      if (!rule) return null;
      const propMatch = rule.match(/`([^`]+)`/);
      const prop = propMatch?.[1] ?? '';
      const when = rule.replace(/^Set `[^`]+` /, '');
      return { prop, when };
    })
    .filter(Boolean)
    .slice(0, 8);

  const propsSection =
    propRows.length > 0
      ? [
          '| Prop | When to set |',
          '| --- | --- |',
          ...propRows.map((r) => `| \`${r.prop}\` | ${r.when} |`),
        ].join('\n')
      : '| Prop | When to set |\n| --- | --- |\n| — | See human doc API table for props. |';

  const styleTokens = buildStyleTokensSection(tokens);
  const doNot = buildDoNotSection(doNotUse, notes, meta.componentName);
  const related = buildRelatedSection(meta, registry);

  const folder = folderForSlug(meta.slug);
  const humanLink = `[${meta.componentName}.md](../../src/components/${folder}/${meta.componentName}.md)`;

  return [
    `# ${meta.componentName}`,
    '',
    '## Purpose',
    '',
    overviewForPurpose(overview) || meta.summary,
    '',
    '## Select when',
    '',
    selectWhen,
    '',
    '## Prefer instead',
    '',
    preferInstead,
    '',
    '## Import',
    '',
    '```tsx',
    importBlock,
    '```',
    '',
    '## Compose',
    '',
    compose,
    '',
    '## Props that change behavior',
    '',
    propsSection,
    '',
    '## Style with tokens',
    '',
    styleTokens,
    '',
    '## Do not',
    '',
    doNot,
    '',
    '## Related',
    '',
    related,
    '',
    '## Human doc',
    '',
    humanLink,
    '',
  ].join('\n');
}

function processHumanDoc(meta, rawContent) {
  const { title, sections } = parseSections(rawContent);

  for (const sectionName of STE_SECTIONS) {
    if (sections[sectionName]) {
      if (sectionName === 'Overview') {
        sections[sectionName] = rewriteOverview(sections[sectionName], meta.summary);
      } else {
        sections[sectionName] = rewriteProseBlock(sections[sectionName]);
      }
    }
  }

  if (meta.slug === 'accessibility-controller') {
    ensureAccessibilityControllerFigma(sections);
  }

  return rebuildHumanDoc(title || meta.componentName, sections);
}

function main() {
  const registry = readRegistry();
  let humanUpdated = 0;
  let aiUpdated = 0;

  for (const meta of registry) {
    const humanPath = humanDocPath(meta.slug, meta.componentName, meta.importPath);
    if (!fs.existsSync(humanPath)) {
      console.error(`Missing human doc: ${humanPath}`);
      process.exit(1);
    }

    const rawHuman = fs.readFileSync(humanPath, 'utf8');
    const updatedHuman = processHumanDoc(meta, rawHuman);

    if (updatedHuman !== rawHuman) {
      fs.writeFileSync(humanPath, updatedHuman);
      humanUpdated += 1;
    }

    const { sections } = parseSections(updatedHuman);
    const aiContent = buildAiDoc(meta, sections, registry);
    const aiPath = aiDocPath(meta.slug, meta.importPath);
    const existingAi = fs.existsSync(aiPath) ? fs.readFileSync(aiPath, 'utf8') : '';

    fs.writeFileSync(aiPath, aiContent);
    if (aiContent !== existingAi) {
      aiUpdated += 1;
    }
  }

  const reactRegistry = registry.filter((meta) => !isChartsImport(meta.importPath));

  const reactAiFiles = fs
    .readdirSync(path.join(root, 'packages/react/docs/ai'))
    .filter((f) => f.endsWith('.md') && f !== 'README.md' && f !== 'TEMPLATE.md');

  console.log(`sync-component-docs: processed ${registry.length} components`);
  console.log(`  human docs updated: ${humanUpdated}`);
  console.log(`  ai docs written/updated: ${aiUpdated}`);
  console.log(`  react ai files on disk: ${reactAiFiles.length}`);

  if (reactAiFiles.length !== reactRegistry.length) {
    console.error(
      `Expected ${reactRegistry.length} react ai docs, found ${reactAiFiles.length}`,
    );
    process.exit(1);
  }
}

main();
