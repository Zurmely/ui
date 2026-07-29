import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with checkbox role', () => {
    renderWithTheme(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('forwards ref to root element', () => {
    const ref = vi.fn();
    renderWithTheme(<Checkbox ref={ref} aria-label="Accept" />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('supports uncontrolled defaultChecked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Checkbox defaultChecked={false} aria-label="Accept" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('supports controlled checked state', () => {
    const { rerender } = renderWithTheme(
      <Checkbox checked={false} onCheckedChange={() => {}} aria-label="Accept" />,
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'unchecked');
    rerender(
      <div data-theme="light">
        <Checkbox checked onCheckedChange={() => {}} aria-label="Accept" />
      </div>,
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'checked');
  });

  it('applies invalid data attribute', () => {
    renderWithTheme(<Checkbox invalid aria-label="Accept" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-invalid', 'true');
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('respects disabled', () => {
    renderWithTheme(<Checkbox disabled aria-label="Accept" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Checkbox aria-label="Accept terms" />);
    await checkA11y(container);
  });
});
