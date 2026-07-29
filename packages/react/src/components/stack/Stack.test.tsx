import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children in a flex container', () => {
    renderWithTheme(
      <Stack>
        <span>One</span>
        <span>Two</span>
      </Stack>,
    );

    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('One').parentElement).toHaveClass('z-stack');
  });

  it('applies direction and gap data attributes', () => {
    renderWithTheme(
      <Stack direction="horizontal" gap="lg" data-testid="stack">
        <span>Item</span>
      </Stack>,
    );

    const stack = screen.getByTestId('stack');
    expect(stack).toHaveAttribute('data-direction', 'horizontal');
    expect(stack).toHaveAttribute('data-gap', 'lg');
  });

  it('forwards ref to div element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <Stack ref={ref}>
        <span>Item</span>
      </Stack>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Stack direction="vertical" gap="md">
        <span>First</span>
        <span>Second</span>
      </Stack>,
    );
    await checkA11y(container);
  });
});
