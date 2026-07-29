import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders with separator role', () => {
    renderWithTheme(<Separator />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('forwards ref to div element', () => {
    const ref = vi.fn();
    renderWithTheme(<Separator ref={ref} />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('applies orientation data attribute', () => {
    renderWithTheme(<Separator orientation="vertical" />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Separator />);
    await checkA11y(container);
  });
});
