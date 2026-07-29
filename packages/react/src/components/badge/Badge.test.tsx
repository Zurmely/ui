import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    renderWithTheme(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('forwards ref to span element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <Badge ref={ref} tone="success">
        Done
      </Badge>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies tone and size data attributes', () => {
    renderWithTheme(
      <Badge tone="warning" size="sm">
        Pending
      </Badge>,
    );
    const badge = screen.getByText('Pending');
    expect(badge).toHaveAttribute('data-tone', 'warning');
    expect(badge).toHaveAttribute('data-size', 'sm');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Badge tone="info">New</Badge>);
    await checkA11y(container);
  });
});
