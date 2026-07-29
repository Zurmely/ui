import { Field, FieldDescription, FieldError, FieldLabel, TextField } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, textControl } from './shared-controls';

export const fieldDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'field',
  name: 'Field',
  category: 'Forms',
  summary: 'Groups label, control, description, and error for form inputs.',
  importPath: '@z-ui/react/field',
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<field />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<field />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<field />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
