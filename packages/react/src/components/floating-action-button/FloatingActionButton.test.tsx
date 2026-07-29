import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { FloatingActionButton } from './FloatingActionButton';

function PlusIcon() {
  return <span>+</span>;
}

describe('FloatingActionButton', () => {
  it('renders with accessible name', () => {
    renderWithTheme(
      <FloatingActionButton aria-label="Create item" icon={<PlusIcon />} />,
    );
    expect(screen.getByRole('button', { name: 'Create item' })).toBeInTheDocument();
  });

  it('forwards ref to button element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <FloatingActionButton ref={ref} aria-label="Create item" icon={<PlusIcon />} />,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies variant and size data attributes', () => {
    renderWithTheme(
      <FloatingActionButton
        aria-label="Create item"
        variant="secondary"
        size="lg"
        icon={<PlusIcon />}
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-size', 'lg');
    expect(button).toHaveClass('z-floating-action-button', 'z-focus-ring');
  });

  it('disables when loading', () => {
    renderWithTheme(
      <FloatingActionButton aria-label="Create item" isLoading icon={<PlusIcon />} />,
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
      <FloatingActionButton
        aria-label="Create item"
        icon={<PlusIcon />}
        onClick={onClick}
      />,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <FloatingActionButton aria-label="Create item" icon={<PlusIcon />} />,
    );
    await checkA11y(container);
  });
});
