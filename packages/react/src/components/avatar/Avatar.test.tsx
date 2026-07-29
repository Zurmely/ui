import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    renderWithTheme(<Avatar src="/alice.jpg" alt="Alice Brown" />);
    expect(screen.getByRole('img', { name: 'Alice Brown' })).toBeInTheDocument();
  });

  it('renders fallback when src is missing', () => {
    renderWithTheme(<Avatar fallback="AB" alt="Alice Brown" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Alice Brown' })).toBeInTheDocument();
  });

  it('forwards ref to span element', () => {
    const ref = vi.fn();
    renderWithTheme(<Avatar ref={ref} fallback="AB" alt="Alice Brown" />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies size data attribute', () => {
    renderWithTheme(<Avatar fallback="AB" alt="Alice Brown" size="lg" />);
    expect(screen.getByText('AB').parentElement).toHaveAttribute('data-size', 'lg');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Avatar fallback="AB" alt="Alice Brown" />);
    await checkA11y(container);
  });
});
