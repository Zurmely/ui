import { Stack } from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { sizeControl } from './shared-controls';

export const stackDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'stack',
  name: 'Stack',
  category: 'Layout',
  summary: 'Flex layout with consistent gap spacing.',
  importPath: '@z-ui/react/stack',
  componentName: 'Stack',
  controls: {
    direction: {
      type: 'select',
      label: 'direction',
      options: ['horizontal', 'vertical'],
      defaultValue: 'vertical',
    },
    gap: sizeControl(),
  },
  render: (props) => (
    <Stack
      direction={props.direction as 'horizontal' | 'vertical'}
      gap={props.gap as 'sm' | 'md' | 'lg'}
    >
      <Button variant="secondary">First</Button>
      <Button variant="secondary">Second</Button>
      <Button variant="secondary">Third</Button>
    </Stack>
  ),
  code: (props) => `<Stack direction="${props.direction}" gap="${props.gap}">
  <Button variant="secondary">First</Button>
  <Button variant="secondary">Second</Button>
</Stack>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<stack />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, direction: 'horizontal' }) : '<stack />',
      render: () => doc.render({ ...defaults, direction: 'horizontal' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<stack />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
