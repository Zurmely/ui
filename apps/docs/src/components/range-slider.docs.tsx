import { RangeSlider } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const rangeSliderDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'range-slider',
  name: 'RangeSlider',
  category: 'Forms',
  summary: 'Dual-thumb range slider for selecting a value interval.',
  importPath: '@z-ui/react/range-slider',
  componentName: 'RangeSlider',
  controls: {
    min: { type: 'number', label: 'min', defaultValue: 0, min: 0, max: 100 },
    max: { type: 'number', label: 'max', defaultValue: 100, min: 0, max: 100 },
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <RangeSlider
      min={props.min as number}
      max={props.max as number}
      defaultValue={[20, 80]}
      disabled={props.disabled as boolean}
      aria-label="Range"
      style={{ width: '100%', maxWidth: '20rem' }}
    />
  ),
  code: (props) => `<RangeSlider min={${props.min}} max={${props.max}} defaultValue={[20, 80]} aria-label="Range" />`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<range-slider />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, min: 1, max: 101 }) : '<range-slider />',
      render: () => doc.render({ ...defaults, min: 1, max: 101 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<range-slider />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
