export const DOC_TAB_QUERY_KEY = 'tab';

export const DOC_TAB_IDS = {
  design: 'design',
  playground: 'playground',
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

export const COMPONENT_DOC_TABS: { value: DocTabId; label: string }[] = [
  { value: DOC_TAB_IDS.design, label: 'Design usage' },
  { value: DOC_TAB_IDS.playground, label: 'Playground' },
  { value: DOC_TAB_IDS.code, label: 'Code reference' },
  { value: DOC_TAB_IDS.writing, label: 'Content / writing' },
  { value: DOC_TAB_IDS.changelog, label: 'Changelog' },
];

const FOUNDATION_TAB_VALUES = DOC_TABS.map((tab) => tab.value);

export function parseDocTabParam(
  value: string | null,
  validTabValues: readonly DocTabId[] = FOUNDATION_TAB_VALUES,
): DocTabId {
  const validSet = new Set<string>(validTabValues);
  if (value && validSet.has(value)) {
    return value as DocTabId;
  }
  return DOC_TAB_IDS.design;
}
