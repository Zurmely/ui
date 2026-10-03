import {
  Field,
  FieldLabel,
  TextField,
  Validator,
  ValidatorMessage,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const validatorDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'validator',
  name: 'Validator',
  category: 'Forms',
  summary:
      'Runs sync or async validate against a controlled value and exposes invalid through Field. validateOn="submit" runs only when you call touch() from useValidatorContext — there is no native form submit hook.',
  importPath: '@z-ux/ui/validator',
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
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Username</FieldLabel>
          <Validator value="ab" validate={(v) => (v.length < 3 ? 'Too short' : undefined)} defaultTouched>
            <TextField value="ab" onChange={() => {}} aria-label="Username" />
            <ValidatorMessage />
          </Validator>
        </Field>
      ),
      doNotUse: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Username</FieldLabel>
          <TextField value="ab" onChange={() => {}} aria-label="Username" />
        </Field>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Username check',
      description: 'Inline validation on a text field.',
      code: `<Validator value={value} validate={(v) => v.length < 3 ? 'Too short' : undefined}>
  <TextField aria-label="Username" />
  <ValidatorMessage />
</Validator>`,
      render: () => (
        <Validator value="ab" validate={(v) => (v.length < 3 ? 'Too short' : undefined)} defaultTouched>
          <TextField value="ab" onChange={() => {}} aria-label="Username" style={{ width: '100%', maxWidth: '20rem' }} />
          <ValidatorMessage />
        </Validator>
      ),
    },
    {
      label: 'Valid input',
      description: 'No error when validation passes.',
      code: `<Validator value={value} validate={(v) => v.length < 3 ? 'Too short' : undefined}>
  <TextField aria-label="Username" />
  <ValidatorMessage />
</Validator>`,
      render: () => (
        <Validator value="jane" validate={(v) => (v.length < 3 ? 'Too short' : undefined)} defaultTouched>
          <TextField value="jane" onChange={() => {}} aria-label="Username" style={{ width: '100%', maxWidth: '20rem' }} />
          <ValidatorMessage />
        </Validator>
      ),
    },
    {
      label: 'Async check',
      description: 'validate may return a Promise. ValidatorMessage shows the resolved error.',
      code: `<Validator
  value={username}
  validate={async (v) => {
    const taken = await checkUsername(v);
    return taken ? 'Username is taken' : undefined;
  }}
>
  <TextField aria-label="Username" />
  <ValidatorMessage />
</Validator>`,
      render: () => (
        <Validator
          value="taken"
          validate={async () => 'Username is taken'}
          defaultTouched
        >
          <TextField
            value="taken"
            onChange={() => {}}
            aria-label="Username"
            style={{ width: '100%', maxWidth: '20rem' }}
          />
          <ValidatorMessage />
        </Validator>
      ),
    },
    {
      label: 'Signup form',
      description: 'Validator wrapped field in a registration form.',
      code: `<Field>
  <FieldLabel>Username</FieldLabel>
  <Validator value={value} validate={validateUsername}>
    <TextField aria-label="Username" />
    <ValidatorMessage />
  </Validator>
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Username</FieldLabel>
          <Validator value="" validate={(v) => (v.length < 3 ? 'Too short' : undefined)} defaultTouched>
            <TextField value="" onChange={() => {}} aria-label="Username" />
            <ValidatorMessage />
          </Validator>
        </Field>
      ),
    },
  ];
  return doc;
})();
