import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders with progressbar role', () => {
    renderWithTheme(<Progress value={50} aria-label="Upload progress" />);
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toBeInTheDocument();
  });

  it('forwards ref to root element', () => {
    const ref = vi.fn();
    renderWithTheme(<Progress ref={ref} value={25} />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('reflects value and max in aria attributes', () => {
    renderWithTheme(<Progress value={30} max={200} aria-label="Loading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '30');
    expect(bar).toHaveAttribute('aria-valuemax', '200');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
  });

  it('omits value attributes when indeterminate', () => {
    renderWithTheme(<Progress indeterminate aria-label="Loading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('data-indeterminate', 'true');
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar).not.toHaveAttribute('aria-valuemax');
  });

  it('clamps value within max', () => {
    renderWithTheme(<Progress value={150} max={100} aria-label="Loading" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Progress value={60} aria-label="Download" />);
    await checkA11y(container);
  });
});
