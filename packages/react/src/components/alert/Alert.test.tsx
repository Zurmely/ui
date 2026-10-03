import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders title and description', () => {
    renderWithTheme(
      <Alert tone="success" title="Saved" description="Your changes were saved." />,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
  });

  it('uses children as description fallback', () => {
    renderWithTheme(<Alert tone="info">Additional context.</Alert>);
    expect(screen.getByText('Additional context.')).toBeInTheDocument();
  });

  it('forwards ref to div element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <Alert ref={ref} title="Notice">
        Details
      </Alert>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('renders optional icon when provided', () => {
    renderWithTheme(
      <Alert tone="warning" title="Warning" icon={<span data-testid="tone-icon">!</span>} />,
    );
    expect(screen.getByTestId('tone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('tone-icon').parentElement).toHaveClass('z-alert__icon');
  });

  it('renders no icon slot when icon is omitted', () => {
    const { container } = renderWithTheme(<Alert title="Notice">Details</Alert>);
    expect(container.querySelector('.z-alert__icon')).not.toBeInTheDocument();
  });

  it('applies tone data attribute and action slot', () => {
    renderWithTheme(
      <Alert tone="danger" title="Error" action={<button type="button">Retry</button>} />,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('data-tone', 'danger');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Alert tone="warning" title="Warning" description="Check your input." />,
    );
    await checkA11y(container);
  });
});
