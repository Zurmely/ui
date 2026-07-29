import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders with aria-label', () => {
    renderWithTheme(
      <IconButton aria-label="Close">
        <span>X</span>
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('forwards ref to button element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <IconButton ref={ref} aria-label="Edit">
        <span>E</span>
      </IconButton>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies variant and size data attributes', () => {
    renderWithTheme(
      <IconButton aria-label="Delete" variant="danger" size="lg">
        <span>D</span>
      </IconButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'danger');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('disables when loading', () => {
    renderWithTheme(
      <IconButton aria-label="Loading" isLoading>
        <span>L</span>
      </IconButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('data-loading', 'true');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <IconButton aria-label="Click" onClick={onClick}>
        <span>C</span>
      </IconButton>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <IconButton aria-label="Accessible">
        <span>A</span>
      </IconButton>,
    );
    await checkA11y(container);
  });
});
