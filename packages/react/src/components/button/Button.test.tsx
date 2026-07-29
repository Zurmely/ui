import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    renderWithTheme(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('forwards ref to button element', () => {
    const ref = vi.fn();
    renderWithTheme(<Button ref={ref}>Save</Button>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies variant and size data attributes', () => {
    renderWithTheme(
      <Button variant="secondary" size="lg">
        Action
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('disables when loading', () => {
    renderWithTheme(<Button isLoading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('data-loading', 'true');
    expect(button).toHaveAttribute('data-disabled', 'true');
  });

  it('sets data-disabled when disabled', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-disabled', 'true');
  });

  it('prevents asChild link activation when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <Button asChild disabled>
        <a href="/settings" onClick={onClick}>
          Settings
        </a>
      </Button>,
    );
    const link = screen.getByText('Settings');
    expect(link).toHaveAttribute('data-disabled', 'true');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('tabindex', '-1');
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Button>Accessible</Button>);
    await checkA11y(container);
  });
});
