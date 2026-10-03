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

/** Per-component writing tips. Empty bodies mean the writer has not supplied copy yet. */
export function getComponentWritingSections(_slug: string): WritingSection[] {
  return WRITING_TIP_CATEGORIES.map((title) => ({ title, body: '' }));
}
