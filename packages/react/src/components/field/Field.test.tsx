import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Field, FieldDescription, FieldError, FieldLabel } from './Field';

describe('Field', () => {
  it('renders label associated with control id', () => {
    renderWithTheme(
      <Field id="email">
        <FieldLabel>Email</FieldLabel>
      </Field>,
    );
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email');
    expect(label).toHaveAttribute('id', 'email-label');
  });

  it('renders description with id', () => {
    renderWithTheme(
      <Field id="email">
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>,
    );
    const description = screen.getByText('We will never share your email.');
    expect(description).toHaveAttribute('id', 'email-description');
  });

  it('renders error with role alert', () => {
    renderWithTheme(
      <Field id="email" invalid>
        <FieldError>Email is required.</FieldError>
      </Field>,
    );
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Email is required.');
    expect(error).toHaveAttribute('id', 'email-error');
  });

  it('sets data-disabled and data-invalid on wrapper', () => {
    const { container } = renderWithTheme(
      <Field disabled invalid>
        <FieldLabel>Name</FieldLabel>
      </Field>,
    );
    const field = container.querySelector('.z-field');
    expect(field).toHaveAttribute('data-disabled', 'true');
    expect(field).toHaveAttribute('data-invalid', 'true');
  });

  it('has no axe violations when composed with label and description', async () => {
    const { container } = renderWithTheme(
      <Field id="name">
        <FieldLabel>Name</FieldLabel>
        <FieldDescription>Your full name.</FieldDescription>
      </Field>,
    );
    await checkA11y(container);
  });
});
