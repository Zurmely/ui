import { CodeBlock } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { childrenControl } from './shared-controls';

export const codeBlockDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'code-block',
    name: 'CodeBlock',
    category: 'Display',
    summary: 'Inline or multi-line code surface for token names and samples.',
    importPath: '@z-ui/react/code-block',
    componentName: 'CodeBlock',
    controls: {
      variant: {
        type: 'select',
        label: 'variant',
        options: ['single', 'multi'],
        defaultValue: 'single',
      },
      language: {
        type: 'text',
        label: 'language',
        defaultValue: 'tsx',
      },
      children: childrenControl('--z-color-text-primary'),
    },
    render: (props) => {
      const variant = props.variant as 'single' | 'multi';
      if (variant === 'multi') {
        return (
          <div style={{ width: '100%', maxWidth: '28rem' }}>
            <CodeBlock
              variant="multi"
              language={String(props.language || 'tsx')}
              code={String(props.children)}
            />
          </div>
        );
      }
      return <CodeBlock variant="single">{String(props.children)}</CodeBlock>;
    },
    code: (props) => {
      const variant = props.variant as string;
      const language = String(props.language || 'tsx');
      const children = String(props.children);
      if (variant === 'multi') {
        return `<CodeBlock\n  variant="multi"\n  language="${language}"\n  code={\`${children}\`}\n/>`;
      }
      return `<CodeBlock variant="single">${children}</CodeBlock>`;
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Single line',
      description: 'Compact inline chip for token names and short identifiers.',
      code: doc.code ? doc.code(defaults) : '<CodeBlock />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Multi line',
      description: 'Block sample with an optional language label.',
      code: doc.code
        ? doc.code({
            ...defaults,
            variant: 'multi',
            children: "import { Button } from '@z-ui/react';",
          })
        : '<CodeBlock />',
      render: () =>
        doc.render({
          ...defaults,
          variant: 'multi',
          children: "import { Button } from '@z-ui/react';",
        }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with playground props.',
      code: doc.code ? doc.code(defaults) : '<CodeBlock />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
