import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with status role and default label', () => {
    renderWithTheme(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('forwards ref to span element', () => {
    const ref = vi.fn();
    renderWithTheme(<Spinner ref={ref} />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLSpanElement);
  });

  it('sets aria-busy and custom aria-label', () => {
    renderWithTheme(<Spinner aria-label="Saving changes" />);
    const spinner = screen.getByRole('status', { name: 'Saving changes' });
    expect(spinner).toHaveAttribute('aria-busy', 'true');
  });

  it('applies size data attribute', () => {
    renderWithTheme(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toHaveAttribute('data-size', 'sm');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Spinner />);
    await checkA11y(container);
  });
});
