import { RadioGroup, RadioGroupItem } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const radioGroupDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'radio-group',
  name: 'RadioGroup',
  category: 'Forms',
  summary: 'Single selection from a group of options.',
  importPath: '@z-ui/react/radio-group',
  componentName: 'RadioGroup',
  controls: {
    value: {
      type: 'select',
      label: 'value',
      options: ['option-a', 'option-b', 'option-c'],
      defaultValue: 'option-a',
    },
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <RadioGroup
      value={props.value as string}
      disabled={props.disabled as boolean}
      invalid={props.invalid as boolean}
      aria-label="Options"
    >
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-a" /> Option A
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-b" /> Option B
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-c" /> Option C
      </label>
    </RadioGroup>
  ),
  code: (props) => `<RadioGroup value="${props.value}" aria-label="Options">
  <RadioGroupItem value="option-a" />
  <RadioGroupItem value="option-b" />
</RadioGroup>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<radio-group />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, value: 'option-b' }) : '<radio-group />',
      render: () => doc.render({ ...defaults, value: 'option-b' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<radio-group />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
