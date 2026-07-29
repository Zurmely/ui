import { TextField } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, textControl } from './shared-controls';

interface TextFieldPlaygroundProps {
  placeholder: string;
  disabled: boolean;
  invalid: boolean;
}

export const textFieldDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'text-field',
  name: 'TextField',
  category: 'Forms',
  summary: 'Single-line text input with field context integration.',
  importPath: '@z-ui/react/text-field',
  componentName: 'TextField',
  controls: {
    placeholder: textControl('placeholder', 'Enter your name'),
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <TextField
      placeholder={props.placeholder as string}
      disabled={props.disabled as boolean}
      invalid={props.invalid as boolean}
      aria-label="Name"
    />
  ),
  code: (props) => {
    const parts = [
      `placeholder="${props.placeholder}"`,
      props.disabled ? 'disabled' : null,
      props.invalid ? 'invalid' : null,
      'aria-label="Name"',
    ].filter(Boolean);
    return `<TextField ${parts.join(' ')} />`;
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<text-field />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<text-field />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<text-field />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
