import { Checkbox, Field, FieldLabel, Stack, Switch } from '@z-ux/ui';
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
  importPath: '@z-ux/ui/checkbox',
  componentName: 'Checkbox',
  controls: {
    checked: booleanControl('checked', false),
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <Field id="playground-checkbox">
      <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
        <Checkbox
          id="playground-checkbox"
          checked={props.checked as boolean}
          disabled={props.disabled as boolean}
          invalid={props.invalid as boolean}
        />
        <FieldLabel>Accept terms</FieldLabel>
      </Stack>
    </Field>
  ),
  code: (props) => {
    const parts = [
      props.checked ? 'checked' : null,
      props.disabled ? 'disabled' : null,
      props.invalid ? 'invalid' : null,
    ].filter(Boolean);
    return `<Field id="terms">
  <Stack direction="horizontal" gap="sm">
    <Checkbox id="terms"${parts.length ? ` ${parts.join(' ')}` : ''} />
    <FieldLabel>Accept terms</FieldLabel>
  </Stack>
</Field>`;
  },
    whenToUsePreviews: {
      use: () => (
        <Field id="terms-preview">
          <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
            <Checkbox id="terms-preview" />
            <FieldLabel>I agree to the terms</FieldLabel>
          </Stack>
        </Field>
      ),
      doNotUse: () => <Switch aria-label="I agree to the terms" />,
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Terms acceptance',
      description: 'Checkbox with a visible label for optional consent.',
      code: `<Field id="terms">
  <Stack direction="horizontal" gap="sm">
    <Checkbox id="terms" />
    <FieldLabel>Accept terms and conditions</FieldLabel>
  </Stack>
</Field>`,
      render: () => (
        <Field id="terms-example">
          <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
            <Checkbox id="terms-example" />
            <FieldLabel>Accept terms and conditions</FieldLabel>
          </Stack>
        </Field>
      ),
    },
    {
      label: 'Email updates',
      description: 'Pre-selected filter in a settings form.',
      code: `<Field id="email-updates">
  <Stack direction="horizontal" gap="sm">
    <Checkbox id="email-updates" checked />
    <FieldLabel>Send me email updates</FieldLabel>
  </Stack>
</Field>`,
      render: () => (
        <Field id="email-updates-example">
          <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
            <Checkbox id="email-updates-example" checked />
            <FieldLabel>Send me email updates</FieldLabel>
          </Stack>
        </Field>
      ),
    },
    {
      label: 'Required consent',
      description: 'Validation error on a required checkbox.',
      code: `<Field id="agree-terms" invalid>
  <Stack direction="horizontal" gap="sm">
    <Checkbox id="agree-terms" invalid />
    <FieldLabel>Agree to terms</FieldLabel>
  </Stack>
</Field>`,
      render: () => (
        <Field id="agree-terms-example" invalid>
          <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
            <Checkbox id="agree-terms-example" invalid />
            <FieldLabel>Agree to terms</FieldLabel>
          </Stack>
        </Field>
      ),
    },
  ];
  return doc;
})();
