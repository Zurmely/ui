import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders a decorative placeholder by default', () => {
    const { container } = renderWithTheme(<Skeleton />);
    const skeleton = container.querySelector('.z-skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveAttribute('data-radius', 'control');
    expect(skeleton).not.toHaveAttribute('role');
  });

  it('forwards ref to span element', () => {
    const ref = vi.fn();
    renderWithTheme(<Skeleton ref={ref} />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies radius and text data attributes', () => {
    const { container } = renderWithTheme(<Skeleton radius="circle" text="body" />);
    const skeleton = container.querySelector('.z-skeleton');
    expect(skeleton).toHaveAttribute('data-radius', 'circle');
    expect(skeleton).toHaveAttribute('data-text', 'body');
  });

  it('applies width and height styles', () => {
    const { container } = renderWithTheme(<Skeleton width={120} height="2rem" />);
    const skeleton = container.querySelector('.z-skeleton');
    expect(skeleton).toHaveStyle({ width: '120px', height: '2rem' });
  });

  it('exposes a status role when labeled', () => {
    renderWithTheme(<Skeleton aria-label="Loading profile" />);
    const skeleton = screen.getByRole('status', { name: 'Loading profile' });
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).not.toHaveAttribute('aria-hidden');
  });

  it('has no axe violations when decorative', async () => {
    const { container } = renderWithTheme(<Skeleton width="8rem" />);
    await checkA11y(container);
  });

  it('has no axe violations when labeled', async () => {
    const { container } = renderWithTheme(<Skeleton aria-label="Loading content" width="8rem" />);
    await checkA11y(container);
  });
});
