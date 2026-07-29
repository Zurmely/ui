import { Checkbox } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

interface CheckboxPlaygroundProps {
  checked: boolean;
  disabled: boolean;
  invalid: boolean;
}

export const checkboxDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'checkbox',
  name: 'Checkbox',
  category: 'Forms',
  summary: 'Binary selection control with invalid and disabled states.',
  importPath: '@z-ui/react/checkbox',
  componentName: 'Checkbox',
  controls: {
    checked: booleanControl('checked', false),
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <Checkbox checked={props.checked as boolean} disabled={props.disabled as boolean} invalid={props.invalid as boolean} />
  ),
  code: (props) => {
    const parts = [
      props.checked ? 'checked' : null,
      props.disabled ? 'disabled' : null,
      props.invalid ? 'invalid' : null,
    ].filter(Boolean);
    return `<Checkbox${parts.length ? ` ${parts.join(' ')}` : ''} />`;
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<checkbox />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<checkbox />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<checkbox />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
