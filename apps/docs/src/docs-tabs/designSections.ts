import type { DocSection } from '../markdown/sections';
import { DESIGN_TAB_EXAMPLE_SECTION_TITLE } from './constants';

export function splitDesignTabSections(design: DocSection[]): {
  lead: DocSection[];
  markdownExamples: DocSection | null;
} {
  const examplesIndex = design.findIndex(
    (section) => section.title === DESIGN_TAB_EXAMPLE_SECTION_TITLE,
  );
  if (examplesIndex === -1) {
    return { lead: design, markdownExamples: null };
  }
  return {
    lead: design.slice(0, examplesIndex),
    markdownExamples: design[examplesIndex],
  };
}
