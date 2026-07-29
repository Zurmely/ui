import { OTPInput } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const otpInputDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'otp-input',
  name: 'OTPInput',
  category: 'Forms',
  summary: 'One-time password input with multiple digit fields.',
  importPath: '@z-ui/react/otp-input',
  componentName: 'OTPInput',
  controls: {
    length: { type: 'number', label: 'length', defaultValue: 6, min: 4, max: 8 },
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <OTPInput
      length={props.length as number}
      disabled={props.disabled as boolean}
      aria-label="One-time password"
    />
  ),
  code: (props) => `<OTPInput length={${props.length}}${props.disabled ? ' disabled' : ''} aria-label="One-time password" />`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<otp-input />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, length: 7 }) : '<otp-input />',
      render: () => doc.render({ ...defaults, length: 7 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<otp-input />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
