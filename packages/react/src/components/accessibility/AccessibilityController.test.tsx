import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { AccessibilityController } from './AccessibilityController';

describe('AccessibilityController', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-contrast');
    document.documentElement.removeAttribute('data-motion');
    document.documentElement.removeAttribute('data-transparency');
    document.documentElement.removeAttribute('data-link-underline');
  });

  it('renders accessibility flag groups as radiogroups', () => {
    renderWithTheme(<AccessibilityController />);

    expect(screen.getByRole('radiogroup', { name: 'Contrast' })).toBeInTheDocument();
    expect(screen.getByRole('radiogroup', { name: 'Motion' })).toBeInTheDocument();
    expect(screen.getByRole('radiogroup', { name: 'Transparency' })).toBeInTheDocument();
    expect(screen.getByRole('radiogroup', { name: 'Link underline' })).toBeInTheDocument();
  });

  it('uses system defaults and does not set override attributes', () => {
    renderWithTheme(<AccessibilityController />);

    expect(screen.getAllByRole('radio', { name: 'System' })[0]).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(document.documentElement.getAttribute('data-contrast')).toBeNull();
    expect(document.documentElement.getAttribute('data-motion')).toBeNull();
    expect(document.documentElement.getAttribute('data-transparency')).toBeNull();
    expect(document.documentElement.getAttribute('data-link-underline')).toBeNull();
  });

  it('applies high contrast when selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<AccessibilityController onChange={onChange} />);

    const contrastGroup = screen.getByRole('radiogroup', { name: 'Contrast' });
    await user.click(within(contrastGroup).getByRole('radio', { name: 'High' }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        contrast: 'high',
      }),
    );
    expect(document.documentElement.getAttribute('data-contrast')).toBe('high');
  });

  it('applies reduced motion and always underline when selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(<AccessibilityController />);

    const motionGroup = screen.getByRole('radiogroup', { name: 'Motion' });
    await user.click(within(motionGroup).getByRole('radio', { name: 'Reduced' }));
    expect(document.documentElement.getAttribute('data-motion')).toBe('reduced');

    const underlineGroup = screen.getByRole('radiogroup', { name: 'Link underline' });
    await user.click(within(underlineGroup).getByRole('radio', { name: 'Always' }));
    expect(document.documentElement.getAttribute('data-link-underline')).toBe('always');
    expect(motionGroup).toBeInTheDocument();
    expect(underlineGroup).toBeInTheDocument();
  });

  it('supports controlled value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(
      <AccessibilityController value={{ contrast: 'standard', motion: 'system' }} onChange={onChange} />,
    );

    expect(screen.getAllByRole('radio', { name: 'Standard' })[0]).toHaveAttribute(
      'aria-checked',
      'true',
    );

    await user.click(screen.getByRole('radio', { name: 'High' }));
    expect(onChange).toHaveBeenCalled();
    expect(screen.getAllByRole('radio', { name: 'Standard' })[0]).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<AccessibilityController />);
    await checkA11y(container);
  });
});
