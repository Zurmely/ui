import { Field, FieldLabel, OTPInput, TextField } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const otpInputDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'otp-input',
  name: 'OTPInput',
  category: 'Forms',
  summary: 'One-time password input with multiple digit fields.',
  importPath: '@z-ux/ui/otp-input',
  componentName: 'OTPInput',
  controls: {
    length: { type: 'number', label: 'length', defaultValue: 6, min: 4, max: 8 },
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <Field style={{ width: '100%', maxWidth: '24rem' }}>
      <FieldLabel>Verification code</FieldLabel>
      <OTPInput
        length={props.length as number}
        disabled={props.disabled as boolean}
      />
    </Field>
  ),
  code: (props) => `<Field>
  <FieldLabel>Verification code</FieldLabel>
  <OTPInput length={${props.length}}${props.disabled ? ' disabled' : ''} />
</Field>`,
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Verification code</FieldLabel>
          <OTPInput length={6} />
        </Field>
      ),
      doNotUse: () => (
        <TextField placeholder="123456" aria-label="Verification code" style={{ width: '100%', maxWidth: '12rem' }} />
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Verification code',
      description: 'Six-digit code entry for two-factor authentication.',
      code: `<Field>
  <FieldLabel>Verification code</FieldLabel>
  <OTPInput length={6} />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Verification code</FieldLabel>
          <OTPInput length={6} />
        </Field>
      ),
    },
    {
      label: 'Short PIN',
      description: 'Four-digit PIN for quick device unlock.',
      code: `<Field>
  <FieldLabel>PIN</FieldLabel>
  <OTPInput length={4} />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>PIN</FieldLabel>
          <OTPInput length={4} />
        </Field>
      ),
    },
    {
      label: 'Resend unavailable',
      description: 'Read-only code display while resend is unavailable.',
      code: `<Field>
  <FieldLabel>Verification code</FieldLabel>
  <OTPInput length={6} disabled />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Verification code</FieldLabel>
          <OTPInput length={6} disabled />
        </Field>
      ),
    },
  ];
  return doc;
})();
