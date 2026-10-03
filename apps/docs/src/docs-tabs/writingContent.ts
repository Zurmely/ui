import { parseSections } from '../markdown/sections';

const WRITING_MARKDOWN_MODULES = import.meta.glob('./writing/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const WRITING_TIP_CATEGORIES = [
  'Labels',
  'Buttons',
  'Empty states',
  'Errors',
  'Helper text',
] as const;

export type WritingTipCategory = (typeof WRITING_TIP_CATEGORIES)[number];

export interface WritingSection {
  title: WritingTipCategory;
  body: string;
}

function getWritingMarkdown(slug: string): string | undefined {
  const entry = Object.entries(WRITING_MARKDOWN_MODULES).find(([path]) => path.endsWith(`/${slug}.md`));
  return entry?.[1];
}

/** Per-component UI writing tips for the Content / writing tab. */
export function getComponentWritingSections(slug: string): WritingSection[] {
  const markdown = getWritingMarkdown(slug);
  if (!markdown) {
    return WRITING_TIP_CATEGORIES.map((title) => ({ title, body: '' }));
  }

  const parsed = parseSections(markdown);
  const byTitle = new Map(parsed.map((section) => [section.title, section.body]));

  return WRITING_TIP_CATEGORIES.map((title) => ({
    title,
    body: byTitle.get(title) ?? '',
  }));
}
