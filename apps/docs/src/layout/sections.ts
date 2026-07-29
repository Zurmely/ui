export type DocsSection = 'about' | 'foundations' | 'components' | 'elements' | 'pages';

export const SECTIONS = [
  { id: 'about' as const, label: 'About', path: '/' },
  { id: 'foundations' as const, label: 'Foundations', path: '/foundations/colors' },
  { id: 'components' as const, label: 'Components', path: '/components' },
  { id: 'elements' as const, label: 'Elements', path: '/elements' },
  { id: 'pages' as const, label: 'Pages', path: '/pages' },
] as const;

export function getActiveSection(pathname: string): DocsSection {
  if (pathname.startsWith('/foundations')) return 'foundations';
  if (pathname.startsWith('/components')) return 'components';
  if (pathname.startsWith('/elements')) return 'elements';
  if (pathname.startsWith('/pages')) return 'pages';
  return 'about';
}

export function sectionHasSidebar(section: DocsSection): boolean {
  return section !== 'about';
}
