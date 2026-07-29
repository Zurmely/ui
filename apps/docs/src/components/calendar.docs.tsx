import { Calendar } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const calendarDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'calendar',
  name: 'Calendar',
  category: 'Forms',
  summary: 'Date picker grid for selecting a single date.',
  importPath: '@z-ui/react/calendar',
  componentName: 'Calendar',
  controls: {
    disabled: booleanControl('disabled', false),
  },
  render: (props) => <Calendar disabled={props.disabled as boolean} />,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<calendar />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<calendar />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<calendar />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
