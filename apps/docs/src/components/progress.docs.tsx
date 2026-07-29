import { Progress } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const progressDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'progress',
  name: 'Progress',
  category: 'Display',
  summary: 'Linear progress indicator.',
  importPath: '@z-ui/react/progress',
  componentName: 'Progress',
  controls: {
    value: { type: 'number', label: 'value', defaultValue: 60, min: 0, max: 100 },
    indeterminate: booleanControl('indeterminate', false),
  },
  render: (props) => (
    <Progress
      value={props.indeterminate ? undefined : (props.value as number)}
      indeterminate={props.indeterminate as boolean}
      style={{ width: '100%', maxWidth: '20rem' }}
    />
  ),
  code: (props) =>
    props.indeterminate
      ? '<Progress indeterminate />'
      : `<Progress value={${props.value}} />`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<progress />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, value: 61 }) : '<progress />',
      render: () => doc.render({ ...defaults, value: 61 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<progress />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
