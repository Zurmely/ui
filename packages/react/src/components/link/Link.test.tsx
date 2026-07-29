import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Link } from './Link';

describe('Link', () => {
  it('renders children', () => {
    renderWithTheme(<Link href="/settings">Settings</Link>);
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
  });

  it('forwards ref to anchor element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <Link ref={ref} href="/home">
        Home
      </Link>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLAnchorElement);
  });

  it('applies disabled state via aria-disabled', () => {
    renderWithTheme(
      <Link href="/billing" disabled>
        Billing
      </Link>,
    );
    const link = screen.getByText('Billing');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('data-disabled', 'true');
    expect(link).not.toHaveAttribute('href');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((event) => event.preventDefault());
    renderWithTheme(
      <Link href="/docs" onClick={onClick}>
        Docs
      </Link>,
    );
    await user.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Link href="/about">About</Link>);
    await checkA11y(container);
  });
});
