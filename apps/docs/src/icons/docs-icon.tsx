import type { LucideProps } from 'lucide-react';

/** Shared stroke size for docs chrome icons (nav + component pages). */
export const DOCS_ICON_SIZE = 16;

/** Single stroke weight across the docs site. */
export const DOCS_ICON_STROKE = 2;

export function docsIconProps(overrides?: LucideProps): LucideProps {
  return {
    size: DOCS_ICON_SIZE,
    strokeWidth: DOCS_ICON_STROKE,
    color: 'currentColor',
    'aria-hidden': true,
    ...overrides,
  };
}
