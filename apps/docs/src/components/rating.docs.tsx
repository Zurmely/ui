import { Rating } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const ratingDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'rating',
  name: 'Rating',
  category: 'Forms',
  summary: 'Star rating input.',
  importPath: '@z-ui/react/rating',
  componentName: 'Rating',
  controls: {
    value: { type: 'number', label: 'value', defaultValue: 3, min: 0, max: 5 },
    max: { type: 'number', label: 'max', defaultValue: 5, min: 1, max: 10 },
    readOnly: booleanControl('readOnly', false),
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <Rating
      value={props.value as number}
      max={props.max as number}
      readOnly={props.readOnly as boolean}
      disabled={props.disabled as boolean}
      aria-label="Rating"
    />
  ),
  code: (props) => `<Rating value={${props.value}} max={${props.max}} aria-label="Rating" />`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<rating />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, value: 4, max: 6 }) : '<rating />',
      render: () => doc.render({ ...defaults, value: 4, max: 6 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<rating />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
