/** Maps docs-site registry slugs to component folder names under packages/react/src/components. */
export const SLUG_TO_FOLDER: Record<string, string> = {
  'accessibility-controller': 'accessibility',
};

export function folderForSlug(slug: string): string {
  return SLUG_TO_FOLDER[slug] ?? slug;
}
