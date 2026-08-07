#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../..');

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
];

const AI_HEADINGS = [
  'Purpose',
  'Select when',
  'Prefer instead',
  'Import',
  'Compose',
  'Props that change behavior',
  'Style with tokens',
  'Do not',
  'Related',
  'Human doc',
];

const SLUG_TO_FOLDER = {
  'accessibility-controller': 'accessibility',
};

function folderForSlug(slug) {
  return SLUG_TO_FOLDER[slug] ?? slug;
}

function isChartsImport(importPath) {
  return importPath?.startsWith('@z-ux/charts');
}

function markdownPathForSlug(slug, importPath) {
  const folder = folderForSlug(slug);
  const packageRoots = isChartsImport(importPath)
    ? [path.join(root, 'packages/charts/src/components', folder)]
    : [path.join(root, 'packages/react/src/components', folder)];

  if (!isChartsImport(importPath)) {
    packageRoots.push(path.join(root, 'packages/charts/src/components', folder));
  } else {
    packageRoots.push(path.join(root, 'packages/react/src/components', folder));
  }

  for (const componentsDir of packageRoots) {
    if (!fs.existsSync(componentsDir)) continue;
    const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.md'));
    if (files.length > 0) {
      return path.join(componentsDir, files[0]);
    }
  }
  return null;
}

function aiDocPathForSlug(slug, importPath) {
  if (isChartsImport(importPath)) {
    return path.join(root, 'packages/charts/docs/ai', `${slug}.md`);
  }
  return path.join(root, 'packages/react/docs/ai', `${slug}.md`);
}

function readRegistryEntries() {
  const docsDir = path.join(root, 'apps/docs/src/components');
  const entries = [];
  for (const file of fs.readdirSync(docsDir)) {
    if (!file.endsWith('.docs.tsx')) continue;
    const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
    const slug = content.match(/slug: '([^']+)'/)?.[1];
    const importPath = content.match(/importPath: '([^']+)'/)?.[1];
    // Charts are parked locally (gitignored) until design-system ready.
    if (isChartsImport(importPath)) continue;
    if (slug) entries.push({ slug, importPath });
  }
  return entries;
}

function checkMarkdownHeadings(filePath, headingsList, label) {
  const content = fs.readFileSync(filePath, 'utf8');
  const headings = [...content.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
  const required = headings.filter((heading) => headingsList.includes(heading));
  const errors = [];

  if (required.length !== headingsList.length) {
    errors.push(`${label}: expected ${headingsList.length} canonical headings, found ${required.length}`);
  }

  for (let i = 0; i < headingsList.length; i++) {
    if (required[i] !== headingsList[i]) {
      errors.push(
        `${label}: heading ${i + 1} should be "${headingsList[i]}", got "${required[i] ?? 'missing'}"`,
      );
      break;
    }
  }

  return errors;
}

function checkExamples(slug) {
  const docsPath = path.join(root, `apps/docs/src/components/${slug}.docs.tsx`);
  const content = fs.readFileSync(docsPath, 'utf8');
  const errors = [];

  const examplesMatch =
    content.match(/examples:\s*\[([\s\S]*?)\]\s*,?\s*\n\s*\};/) ??
    content.match(/doc\.examples\s*=\s*\[([\s\S]*?)\]\s*;/);

  if (!examplesMatch) {
    errors.push('missing examples array');
    return errors;
  }

  const examplesBlock = examplesMatch[1];
  const renderCount = (examplesBlock.match(/render:\s*\(\)/g) ?? []).length;
  const codeCount = (examplesBlock.match(/\bcode:/g) ?? []).length;

  if (renderCount < 3) {
    errors.push(`expected at least 3 examples with render, found ${renderCount}`);
  }
  if (codeCount < 3) {
    errors.push(`expected at least 3 examples with code, found ${codeCount}`);
  }

  return errors;
}

function checkWhenToUsePreviews(slug) {
  const docsPath = path.join(root, `apps/docs/src/components/${slug}.docs.tsx`);
  const content = fs.readFileSync(docsPath, 'utf8');
  const errors = [];

  if (!content.includes('whenToUsePreviews')) {
    errors.push('missing whenToUsePreviews');
    return errors;
  }

  if (!/whenToUsePreviews:\s*\{[\s\S]*?\buse:\s*\(\)/.test(content)) {
    errors.push('whenToUsePreviews missing use render function');
  }
  if (!/whenToUsePreviews:\s*\{[\s\S]*?\bdoNotUse:\s*\(\)/.test(content)) {
    errors.push('whenToUsePreviews missing doNotUse render function');
  }

  return errors;
}

const entries = readRegistryEntries();
const slugs = entries.map((entry) => entry.slug).sort();
const failures = [];

for (const { slug, importPath } of entries) {
  const mdPath = markdownPathForSlug(slug, importPath);
  if (!mdPath) {
    failures.push(`${slug}: missing markdown file`);
    continue;
  }

  for (const error of checkMarkdownHeadings(mdPath, CANONICAL_HEADINGS, 'human')) {
    failures.push(`${slug}: ${error}`);
  }

  const aiPath = aiDocPathForSlug(slug, importPath);
  if (!fs.existsSync(aiPath)) {
    failures.push(`${slug}: missing AI doc at packages/react/docs/ai/${slug}.md`);
  } else {
    for (const error of checkMarkdownHeadings(aiPath, AI_HEADINGS, 'AI')) {
      failures.push(`${slug}: ${error}`);
    }
  }

  for (const error of checkExamples(slug)) {
    failures.push(`${slug}: ${error}`);
  }

  for (const error of checkWhenToUsePreviews(slug)) {
    failures.push(`${slug}: ${error}`);
  }
}

if (failures.length > 0) {
  console.error('docs:check failed:\n');
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(`docs:check passed for ${slugs.length} components.`);
