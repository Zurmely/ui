import { CodeBlock } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { childrenControl } from './shared-controls';

export const codeBlockDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'code-block',
    name: 'CodeBlock',
    category: 'Display',
    summary: 'Inline or multi-line code surface for token names and samples.',
    importPath: '@z-ux/ui/code-block',
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
    whenToUsePreviews: {
      use: () => <CodeBlock variant="single">--z-color-text-primary</CodeBlock>,
      doNotUse: () => <code>--z-color-text-primary</code>,
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Single line',
      description: 'Compact inline chip for token names and short identifiers.',
      code: '<CodeBlock variant="single">--z-color-text-primary</CodeBlock>',
      render: () => <CodeBlock variant="single">--z-color-text-primary</CodeBlock>,
    },
    {
      label: 'Multi line',
      description: 'Block sample with an optional language label.',
      code: `<CodeBlock
  variant="multi"
  language="tsx"
  code={\`import { Button, Stack } from '@z-ux/ui';

export function SaveBar() {
  return (
    <Stack direction="horizontal" gap="sm">
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save</Button>
    </Stack>
  );
}\`}
/>`,
      render: () => (
        <div style={{ width: '100%', maxWidth: '28rem' }}>
          <CodeBlock
            variant="multi"
            language="tsx"
            code={`import { Button, Stack } from '@z-ux/ui';

export function SaveBar() {
  return (
    <Stack direction="horizontal" gap="sm">
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save</Button>
    </Stack>
  );
}`}
          />
        </div>
      ),
    },
    {
      label: 'Token reference',
      description: 'Inline code for a spacing token in documentation.',
      code: '<CodeBlock variant="single">--z-spacing-stack-component</CodeBlock>',
      render: () => <CodeBlock variant="single">--z-spacing-stack-component</CodeBlock>,
    },
  ];
  return doc;
})();
