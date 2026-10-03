import { parseAllSections } from '../markdown/sections';

const AI_MARKDOWN_MODULES = import.meta.glob('../../../../packages/react/docs/ai/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function getAiMarkdown(slug: string): string | undefined {
  const entry = Object.entries(AI_MARKDOWN_MODULES).find(([path]) => path.endsWith(`/${slug}.md`));
  return entry?.[1];
}

function sectionBody(slug: string, title: string): string {
  const markdown = getAiMarkdown(slug);
  if (!markdown) {
    return '';
  }
  const section = parseAllSections(markdown).find((entry) => entry.title === title);
  return section?.body.trim() ?? '';
}

export function getAiAnatomySupplement(slug: string): string {
  const compose = sectionBody(slug, 'Compose');
  const tokens = sectionBody(slug, 'Style with tokens');
  return [compose, tokens].filter(Boolean).join('\n\n');
}

export function getAiPropsSupplement(slug: string): string {
  return sectionBody(slug, 'Props that change behavior');
}

export function getAiImportSupplement(slug: string): string {
  const body = sectionBody(slug, 'Import');
  if (!body) {
    return '';
  }
  return body.startsWith('```') ? body : `\`\`\`tsx\n${body}\n\`\`\``;
}
