import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const tooltipDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'tooltip',
  name: 'Tooltip',
  category: 'Overlays',
  summary: 'Contextual hint on hover or focus.',
  importPath: '@z-ui/react/tooltip',
  componentName: 'Tooltip',
  controls: {
    content: textControl('content', 'Add to library'),
  },
  render: (props) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>{props.content as string}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  code: (props) => `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>${props.content}</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<tooltip />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<tooltip />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<tooltip />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
