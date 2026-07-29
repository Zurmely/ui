import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { RadialProgress } from './RadialProgress';

describe('RadialProgress', () => {
  it('renders with progressbar role', () => {
    renderWithTheme(<RadialProgress value={50} aria-label="Upload progress" />);
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toBeInTheDocument();
  });

  it('forwards ref to root element', () => {
    const ref = vi.fn();
    renderWithTheme(<RadialProgress ref={ref} value={25} />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('applies size data attribute', () => {
    renderWithTheme(<RadialProgress value={10} size="lg" aria-label="Loading" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-size', 'lg');
  });

  it('reflects value and max in aria attributes', () => {
    renderWithTheme(<RadialProgress value={30} max={200} aria-label="Loading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '30');
    expect(bar).toHaveAttribute('aria-valuemax', '200');
  });

  it('omits value attributes when indeterminate', () => {
    renderWithTheme(<RadialProgress indeterminate aria-label="Loading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('data-indeterminate', 'true');
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<RadialProgress value={60} aria-label="Download" />);
    await checkA11y(container);
  });
});
