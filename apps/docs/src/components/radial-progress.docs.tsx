import { RadialProgress } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, sizeControl } from './shared-controls';

export const radialProgressDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'radial-progress',
  name: 'RadialProgress',
  category: 'Display',
  summary: 'Circular progress indicator.',
  importPath: '@z-ui/react/radial-progress',
  componentName: 'RadialProgress',
  controls: {
    value: { type: 'number', label: 'value', defaultValue: 75, min: 0, max: 100 },
    indeterminate: booleanControl('indeterminate', false),
    size: sizeControl(),
  },
  render: (props) => (
    <RadialProgress
      value={props.indeterminate ? undefined : (props.value as number)}
      indeterminate={props.indeterminate as boolean}
      size={props.size as 'sm' | 'md' | 'lg'}
    />
  ),
  code: (props) =>
    props.indeterminate
      ? `<RadialProgress indeterminate${props.size !== 'md' ? ` size="${props.size}"` : ''} />`
      : `<RadialProgress value={${props.value}}${props.size !== 'md' ? ` size="${props.size}"` : ''} />`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<radial-progress />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, value: 76 }) : '<radial-progress />',
      render: () => doc.render({ ...defaults, value: 76 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<radial-progress />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
