import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Field, FieldLabel } from '../field/Field';
import { FileInput } from './FileInput';

describe('FileInput', () => {
  it('renders browse affordance', () => {
    renderWithTheme(<FileInput aria-label="Upload" />);
    expect(screen.getByRole('button', { name: 'browse' })).toBeInTheDocument();
  });

  it('opens native picker from browse button', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FileInput aria-label="Upload" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');
    await user.click(screen.getByRole('button', { name: 'browse' }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('integrates with field context', () => {
    renderWithTheme(
      <Field id="resume" invalid required>
        <FieldLabel>Resume</FieldLabel>
        <FileInput />
      </Field>,
    );
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('id', 'resume');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
  });

  it('has no axe violations when composed with field', async () => {
    const { container } = renderWithTheme(
      <Field id="resume">
        <FieldLabel>Resume</FieldLabel>
        <FileInput />
      </Field>,
    );
    await checkA11y(container);
  });
});
