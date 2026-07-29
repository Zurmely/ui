import { TextField, Validator, ValidatorMessage } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const validatorDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'validator',
  name: 'Validator',
  category: 'Forms',
  summary: 'Wraps a control with async validation feedback.',
  importPath: '@z-ui/react/validator',
  componentName: 'Validator',
  controls: {
    value: textControl('value', ''),
    minLength: { type: 'number', label: 'min length', defaultValue: 3, min: 1, max: 20 },
  },
  render: (props) => (
    <Validator
      value={props.value as string}
      validate={(v) => (v.length < (props.minLength as number) ? 'Too short' : undefined)}
      defaultTouched
    >
      <TextField
        value={props.value as string}
        onChange={() => {}}
        aria-label="Username"
        style={{ width: '100%', maxWidth: '20rem' }}
      />
      <ValidatorMessage />
    </Validator>
  ),
  code: (props) => `<Validator value={value} validate={(v) => v.length < ${props.minLength} ? 'Too short' : undefined}>
  <TextField aria-label="Username" />
  <ValidatorMessage />
</Validator>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<validator />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, minLength: 4 }) : '<validator />',
      render: () => doc.render({ ...defaults, minLength: 4 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<validator />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
