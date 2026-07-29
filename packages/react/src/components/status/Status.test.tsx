import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Status } from './Status';

describe('Status', () => {
  it('renders indicator with label', () => {
    renderWithTheme(<Status tone="success">Online</Status>);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('supports label prop', () => {
    renderWithTheme(<Status tone="warning" label="Degraded" />);
    expect(screen.getByText('Degraded')).toBeInTheDocument();
  });

  it('forwards ref to span element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <Status ref={ref} tone="danger">
        Offline
      </Status>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies tone and size data attributes', () => {
    renderWithTheme(
      <Status tone="info" size="sm">
        Syncing
      </Status>,
    );
    const status = screen.getByText('Syncing').closest('.z-status');
    expect(status).toHaveAttribute('data-tone', 'info');
    expect(status).toHaveAttribute('data-size', 'sm');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<Status tone="primary">Active</Status>);
    await checkA11y(container);
  });
});
