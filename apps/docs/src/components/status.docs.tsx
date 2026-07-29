import { Status } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { sizeControl, textControl, toneControl } from './shared-controls';

export const statusDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'status',
  name: 'Status',
  category: 'Display',
  summary: 'Status indicator with dot and label.',
  importPath: '@z-ui/react/status',
  componentName: 'Status',
  controls: {
    tone: toneControl('success'),
    size: sizeControl(),
    label: textControl('label', 'Active'),
  },
  render: (props) => (
    <Status
      tone={props.tone as 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'}
      size={props.size as 'sm' | 'md' | 'lg'}
      label={props.label as string}
    />
  ),
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<status />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<status />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<status />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
