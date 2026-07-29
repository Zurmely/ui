import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field/Field';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders a native input', () => {
    renderWithTheme(<TextField aria-label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    renderWithTheme(<TextField ref={ref} aria-label="Email" />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
  });

  it('integrates with field context for id and aria-describedby', () => {
    renderWithTheme(
      <Field id="email" invalid required>
        <FieldLabel>Email</FieldLabel>
        <TextField />
        <FieldDescription>Enter your work email.</FieldDescription>
        <FieldError>Email is required.</FieldError>
      </Field>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('aria-describedby', 'email-description email-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toBeRequired();
  });

  it('sets data-invalid and data-disabled attributes', () => {
    renderWithTheme(<TextField disabled invalid aria-label="Email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-invalid', 'true');
    expect(input).toHaveAttribute('data-disabled', 'true');
    expect(input).toBeDisabled();
  });

  it('inherits disabled and invalid from field context', () => {
    renderWithTheme(
      <Field id="email" disabled invalid>
        <TextField aria-label="Email" />
      </Field>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('data-invalid', 'true');
  });

  it('has no axe violations when composed with field', async () => {
    const { container } = renderWithTheme(
      <Field id="email">
        <FieldLabel>Email</FieldLabel>
        <TextField />
        <FieldDescription>Work email only.</FieldDescription>
      </Field>,
    );
    await checkA11y(container);
  });
});
