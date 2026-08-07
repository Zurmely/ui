import { Field, FieldDescription, FieldError, FieldLabel, TextField } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, textControl } from './shared-controls';

export const fieldDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'field',
  name: 'Field',
  category: 'Forms',
  summary: 'Groups label, control, description, and error for form inputs.',
  importPath: '@z-ux/ui/field',
  componentName: 'Field',
  controls: {
    label: textControl('label', 'Email'),
    description: textControl('description', 'We will never share your email.'),
    invalid: booleanControl('invalid', false),
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <Field invalid={props.invalid as boolean} disabled={props.disabled as boolean}>
      <FieldLabel>{props.label as string}</FieldLabel>
      <TextField type="email" placeholder="you@example.com" />
      <FieldDescription>{props.description as string}</FieldDescription>
      {props.invalid ? <FieldError>This field is required.</FieldError> : null}
    </Field>
  ),
  code: (props) => `<Field${props.invalid ? ' invalid' : ''}${props.disabled ? ' disabled' : ''}>
  <FieldLabel>${props.label}</FieldLabel>
  <TextField type="email" placeholder="you@example.com" />
  <FieldDescription>${props.description}</FieldDescription>
  ${props.invalid ? '<FieldError>This field is required.</FieldError>' : ''}
</Field>`,
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Email</FieldLabel>
          <TextField type="email" placeholder="you@example.com" />
          <FieldDescription>We will never share your email.</FieldDescription>
        </Field>
      ),
      doNotUse: () => (
        <TextField type="email" placeholder="you@example.com" aria-label="Email" style={{ width: '100%', maxWidth: '24rem' }} />
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Email field',
      description: 'Label, input, and helper text for a signup form.',
      code: `<Field>
  <FieldLabel>Email</FieldLabel>
  <TextField type="email" placeholder="you@example.com" />
  <FieldDescription>We will never share your email.</FieldDescription>
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Email</FieldLabel>
          <TextField type="email" placeholder="you@example.com" />
          <FieldDescription>We will never share your email.</FieldDescription>
        </Field>
      ),
    },
    {
      label: 'Validation error',
      description: 'Invalid field with an error message below the input.',
      code: `<Field invalid>
  <FieldLabel>Username</FieldLabel>
  <TextField invalid aria-label="Username" />
  <FieldError>Username is already taken.</FieldError>
</Field>`,
      render: () => (
        <Field invalid style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Username</FieldLabel>
          <TextField invalid aria-label="Username" />
          <FieldError>Username is already taken.</FieldError>
        </Field>
      ),
    },
    {
      label: 'Disabled field',
      description: 'Read-only field while account details are locked.',
      code: `<Field disabled>
  <FieldLabel>Account ID</FieldLabel>
  <TextField disabled value="acct_123" aria-label="Account ID" />
</Field>`,
      render: () => (
        <Field disabled style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Account ID</FieldLabel>
          <TextField disabled value="acct_123" aria-label="Account ID" />
        </Field>
      ),
    },
  ];
  return doc;
})();
