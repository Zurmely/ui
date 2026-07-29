import type { PrismTheme } from 'prism-react-renderer';

/** Theme colors use semantic CSS variables so highlighting follows light/dark themes. */
export const codeBlockHighlightTheme: PrismTheme = {
  plain: {
    color: 'var(--z-color-text-primary)',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: 'var(--z-color-text-tertiary)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'var(--z-color-text-secondary)',
      },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted', 'unit'],
      style: {
        color: 'var(--z-color-text-warning)',
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: 'var(--z-color-text-success)',
      },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: {
        color: 'var(--z-color-text-secondary)',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-value'],
      style: {
        color: 'var(--z-color-text-info)',
      },
    },
    {
      types: ['function', 'class-name'],
      style: {
        color: 'var(--z-color-text-info)',
      },
    },
    {
      types: ['regex', 'important', 'variable'],
      style: {
        color: 'var(--z-color-text-warning)',
      },
    },
  ],
};
