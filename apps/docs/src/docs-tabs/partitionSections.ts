import type { DocSection } from '../markdown/sections';
import { CODE_REFERENCE_SECTION_TITLES, DESIGN_USAGE_SECTION_TITLES } from './constants';

export function partitionMarkdownSections(sections: DocSection[]) {
  const design: DocSection[] = [];
  const code: DocSection[] = [];

  for (const section of sections) {
    if (DESIGN_USAGE_SECTION_TITLES.has(section.title)) {
      design.push(section);
    } else if (CODE_REFERENCE_SECTION_TITLES.has(section.title)) {
      code.push(section);
    }
  }

  return { design, code };
}
