import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders a date grid', () => {
    renderWithTheme(<Calendar aria-label="Choose date" defaultMonth={new Date(2026, 6, 1)} />);
    expect(screen.getByRole('grid', { name: 'July 2026' })).toBeInTheDocument();
  });

  it('selects a date on click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderWithTheme(
      <Calendar defaultMonth={new Date(2026, 6, 1)} onSelect={onSelect} aria-label="Choose date" />,
    );
    await user.click(screen.getByRole('button', { name: /July 15, 2026/i }));
    expect(onSelect).toHaveBeenCalledWith(new Date(2026, 6, 15));
  });

  it('navigates months', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Calendar defaultMonth={new Date(2026, 6, 1)} aria-label="Choose date" />);
    await user.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('grid', { name: 'August 2026' })).toBeInTheDocument();
  });

  it('moves focus with arrow keys in the date grid', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Calendar
        defaultMonth={new Date(2026, 6, 1)}
        defaultSelected={new Date(2026, 6, 15)}
        aria-label="Choose date"
      />,
    );
    const selectedDay = screen.getByRole('button', { name: /July 15, 2026/i });
    selectedDay.focus();
    expect(selectedDay).toHaveAttribute('tabindex', '0');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: /July 16, 2026/i })).toHaveFocus();
    expect(screen.getByRole('button', { name: /July 15, 2026/i })).toHaveAttribute('tabindex', '-1');
  });

  it('sets data-invalid when invalid', () => {
    renderWithTheme(
      <Calendar invalid defaultMonth={new Date(2026, 6, 1)} aria-label="Choose date" />,
    );
    expect(document.querySelector('.z-calendar')).toHaveAttribute('data-invalid', 'true');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Calendar defaultMonth={new Date(2026, 6, 1)} aria-label="Choose date" />,
    );
    await checkA11y(container);
  });
});
