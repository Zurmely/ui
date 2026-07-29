import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Field, FieldError, FieldLabel } from '../field/Field';
import { OTPInput } from './OTPInput';

describe('OTPInput', () => {
  it('renders digit fields', () => {
    renderWithTheme(<OTPInput aria-label="Verification code" length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('advances focus on input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<OTPInput aria-label="Verification code" length={4} />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1');
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveFocus();
  });

  it('calls onChange with combined value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<OTPInput aria-label="Verification code" length={4} onChange={onChange} />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1234');
    expect(onChange).toHaveBeenLastCalledWith('1234');
  });

  it('integrates with field context', () => {
    renderWithTheme(
      <Field id="otp" invalid required>
        <FieldLabel>Code</FieldLabel>
        <OTPInput length={4} />
        <FieldError>Invalid code.</FieldError>
      </Field>,
    );
    const first = screen.getAllByRole('textbox')[0];
    expect(first).toHaveAttribute('id', 'otp');
    expect(first).toHaveAttribute('aria-invalid', 'true');
    expect(first).toHaveAttribute('aria-describedby', 'otp-description otp-error');
    expect(first).toBeRequired();
  });

  it('has no axe violations when composed with field', async () => {
    const { container } = renderWithTheme(
      <Field id="otp">
        <FieldLabel>Code</FieldLabel>
        <OTPInput length={4} />
      </Field>,
    );
    await checkA11y(container);
  });
});
