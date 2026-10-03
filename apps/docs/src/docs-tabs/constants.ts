export const DOC_TAB_QUERY_KEY = 'tab';

export const DOC_TAB_IDS = {
  design: 'design',
  code: 'code',
  writing: 'writing',
  changelog: 'changelog',
} as const;

export type DocTabId = (typeof DOC_TAB_IDS)[keyof typeof DOC_TAB_IDS];

export const DOC_TABS: { value: DocTabId; label: string }[] = [
  { value: DOC_TAB_IDS.design, label: 'Design usage' },
  { value: DOC_TAB_IDS.code, label: 'Code reference' },
  { value: DOC_TAB_IDS.writing, label: 'Content / writing' },
  { value: DOC_TAB_IDS.changelog, label: 'Changelog' },
];

const VALID_TAB_SET = new Set<string>(Object.values(DOC_TAB_IDS));

export function parseDocTabParam(value: string | null): DocTabId {
  if (value && VALID_TAB_SET.has(value)) {
    return value as DocTabId;
  }
  return DOC_TAB_IDS.design;
}

export const DESIGN_TAB_EXAMPLE_SECTION_TITLE = 'Examples';
