import {
  Field,
  FieldDescription,
  FieldLabel,
  TextField,
} from '@z-ux/ui';
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
  importPath: '@z-ux/ui/text-field',
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
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Username</FieldLabel>
          <TextField placeholder="jane_doe" />
          <FieldDescription>Visible on your public profile.</FieldDescription>
        </Field>
      ),
      doNotUse: () => <TextField placeholder="jane_doe" aria-label="Username" />,
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Name input',
      description: 'Single-line text field with placeholder.',
      code: '<TextField placeholder="Enter your name" aria-label="Name" />',
      render: () => <TextField placeholder="Enter your name" aria-label="Name" />,
    },
    {
      label: 'Email with error',
      description: 'Invalid text field after form validation.',
      code: '<TextField type="email" invalid aria-label="Email" placeholder="you@example.com" />',
      render: () => <TextField type="email" invalid aria-label="Email" placeholder="you@example.com" />,
    },
    {
      label: 'Labeled field',
      description: 'TextField composed inside a Field with label and helper text.',
      code: `<Field>
  <FieldLabel>Username</FieldLabel>
  <TextField aria-label="Username" placeholder="jane_doe" />
  <FieldDescription>Visible on your public profile.</FieldDescription>
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Username</FieldLabel>
          <TextField aria-label="Username" placeholder="jane_doe" />
          <FieldDescription>Visible on your public profile.</FieldDescription>
        </Field>
      ),
    },
  ];
  return doc;
})();
