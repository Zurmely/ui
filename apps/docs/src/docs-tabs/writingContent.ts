import { parseSections } from '../markdown/sections';

const AI_MARKDOWN_MODULES = import.meta.glob('../../../../packages/react/docs/ai/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const WRITING_SECTION_TITLES = ['Purpose', 'Compose', 'Do not'] as const;

export interface WritingSection {
  title: string;
  body: string;
}

function getAiMarkdown(slug: string): string | undefined {
  const entry = Object.entries(AI_MARKDOWN_MODULES).find(([path]) => path.endsWith(`/${slug}.md`));
  return entry?.[1];
}

export function getComponentWritingSections(slug: string): WritingSection[] {
  const markdown = getAiMarkdown(slug);
  if (!markdown) {
    return [];
  }

  const parsed = parseSections(markdown);
  return parsed
    .filter((section) => (WRITING_SECTION_TITLES as readonly string[]).includes(section.title))
    .map((section) => ({ title: section.title, body: section.body }));
}
