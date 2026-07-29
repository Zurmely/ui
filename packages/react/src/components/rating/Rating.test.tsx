import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Field, FieldLabel } from '../field/Field';
import { Rating } from './Rating';

describe('Rating', () => {
  it('renders interactive stars', () => {
    renderWithTheme(<Rating aria-label="Rating" />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('selects a star value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(<Rating aria-label="Rating" onValueChange={onValueChange} />);
    await user.click(screen.getByRole('radio', { name: '4 stars' }));
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it('moves selection with arrow keys', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(<Rating aria-label="Rating" onValueChange={onValueChange} defaultValue={2} />);
    const secondStar = screen.getByRole('radio', { name: '2 stars' });
    secondStar.focus();
    await user.keyboard('{ArrowRight}');
    expect(onValueChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole('radio', { name: '3 stars' })).toHaveFocus();
  });

  it('renders read-only display', () => {
    renderWithTheme(<Rating readOnly value={3} aria-label="Rating" />);
    expect(screen.getByRole('img', { name: 'Rating: 3 out of 5' })).toBeInTheDocument();
  });

  it('integrates with field context', () => {
    renderWithTheme(
      <Field id="rating" invalid required>
        <FieldLabel>Rating</FieldLabel>
        <Rating />
      </Field>,
    );
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('id', 'rating');
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAttribute('aria-required', 'true');
  });

  it('has no axe violations when composed with field', async () => {
    const { container } = renderWithTheme(
      <Field id="rating">
        <FieldLabel>Rating</FieldLabel>
        <Rating />
      </Field>,
    );
    await checkA11y(container);
  });
});
