import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field/Field';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a native textarea', () => {
    renderWithTheme(<Textarea aria-label="Bio" />);
    expect(screen.getByRole('textbox', { name: 'Bio' })).toBeInTheDocument();
  });

  it('forwards ref to textarea element', () => {
    const ref = vi.fn();
    renderWithTheme(<Textarea ref={ref} aria-label="Bio" />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('integrates with field context for id and aria-describedby', () => {
    renderWithTheme(
      <Field id="bio" invalid required>
        <FieldLabel>Bio</FieldLabel>
        <Textarea />
        <FieldDescription>Tell us about yourself.</FieldDescription>
        <FieldError>Bio is required.</FieldError>
      </Field>,
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'bio');
    expect(textarea).toHaveAttribute('aria-describedby', 'bio-description bio-error');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-required', 'true');
    expect(textarea).toBeRequired();
  });

  it('sets data-invalid and data-disabled attributes', () => {
    renderWithTheme(<Textarea disabled invalid aria-label="Bio" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('data-invalid', 'true');
    expect(textarea).toHaveAttribute('data-disabled', 'true');
    expect(textarea).toBeDisabled();
  });

  it('inherits disabled and invalid from field context', () => {
    renderWithTheme(
      <Field id="bio" disabled invalid>
        <Textarea aria-label="Bio" />
      </Field>,
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('data-invalid', 'true');
  });

  it('has no axe violations when composed with field', async () => {
    const { container } = renderWithTheme(
      <Field id="bio">
        <FieldLabel>Bio</FieldLabel>
        <Textarea />
        <FieldDescription>A short introduction.</FieldDescription>
      </Field>,
    );
    await checkA11y(container);
  });
});
