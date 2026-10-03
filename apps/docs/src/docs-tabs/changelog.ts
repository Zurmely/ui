const STATUS_COLOR_LINE =
  'Status colors dropped the colored border, and the info blue moved to a quieter cyan.';

const BORDER_SPACING_TABS_LINE =
  'Resting borders came off existing surfaces, form stacks opened to 8px, status hues separated, and the active tab is a short underline.';

const SEEDED_CHANGELOG: Record<string, readonly string[]> = {
  colors: [STATUS_COLOR_LINE, BORDER_SPACING_TABS_LINE],
  sizes: [BORDER_SPACING_TABS_LINE],
  tabs: [BORDER_SPACING_TABS_LINE],
  card: [BORDER_SPACING_TABS_LINE],
  'list-item': [BORDER_SPACING_TABS_LINE],
  dialog: [BORDER_SPACING_TABS_LINE],
  drawer: [BORDER_SPACING_TABS_LINE],
  badge: [STATUS_COLOR_LINE],
  alert: [STATUS_COLOR_LINE],
  indicator: [STATUS_COLOR_LINE],
  status: [STATUS_COLOR_LINE],
};

export function getChangelogLines(pageKey: string): readonly string[] {
  return SEEDED_CHANGELOG[pageKey] ?? [];
}
