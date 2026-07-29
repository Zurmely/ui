import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with switch role', () => {
    renderWithTheme(<Switch aria-label="Notifications" />);
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('forwards ref to root element', () => {
    const ref = vi.fn();
    renderWithTheme(<Switch ref={ref} aria-label="Notifications" />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('supports uncontrolled defaultChecked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Switch defaultChecked={false} aria-label="Notifications" />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    await user.click(switchEl);
    expect(switchEl).toHaveAttribute('data-state', 'checked');
  });

  it('supports controlled checked state', () => {
    const { rerender } = renderWithTheme(
      <Switch checked={false} onCheckedChange={() => {}} aria-label="Notifications" />,
    );
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
    rerender(
      <div data-theme="light">
        <Switch checked onCheckedChange={() => {}} aria-label="Notifications" />
      </div>,
    );
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  it('applies invalid data attribute', () => {
    renderWithTheme(<Switch invalid aria-label="Notifications" />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-invalid', 'true');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
  });

  it('respects disabled', () => {
    renderWithTheme(<Switch disabled aria-label="Notifications" />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Switch aria-label="Notifications" />);
    await checkA11y(container);
  });
});
