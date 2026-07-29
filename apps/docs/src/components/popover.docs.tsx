import { Popover, PopoverContent, PopoverTrigger } from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const popoverDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'popover',
  name: 'Popover',
  category: 'Overlays',
  summary: 'Floating content anchored to a trigger.',
  importPath: '@z-ui/react/popover',
  componentName: 'Popover',
  controls: {
    content: textControl('content', 'Popover content goes here.'),
  },
  render: (props) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>{props.content as string}</PopoverContent>
    </Popover>
  ),
  code: (props) => `<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>${props.content}</PopoverContent>
</Popover>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<popover />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<popover />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<popover />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
