import { Spinner } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { sizeControl } from './shared-controls';

export const spinnerDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'spinner',
  name: 'Spinner',
  category: 'Display',
  summary: 'Loading spinner indicator.',
  importPath: '@z-ui/react/spinner',
  componentName: 'Spinner',
  controls: {
    size: sizeControl(),
  },
  render: (props) => <Spinner size={props.size as 'sm' | 'md' | 'lg'} />,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<spinner />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<spinner />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<spinner />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
