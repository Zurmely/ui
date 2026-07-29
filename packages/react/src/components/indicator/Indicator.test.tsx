import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Avatar } from '../avatar/Avatar';
import { Indicator, IndicatorItem } from './Indicator';

describe('Indicator', () => {
  it('renders badge overlay on child content', () => {
    renderWithTheme(
      <Indicator>
        <IndicatorItem>3</IndicatorItem>
        <Avatar fallback="AB" />
      </Indicator>,
    );

    expect(screen.getByText('3')).toHaveClass('z-indicator__item');
    expect(screen.getByText('3')).toHaveAttribute('data-variant', 'badge');
    expect(screen.getByText('3')).toHaveAttribute('data-placement', 'top-end');
    expect(screen.getByText('3')).toHaveAttribute('data-tone', 'danger');
  });

  it('renders dot variant with accessible label', () => {
    renderWithTheme(
      <Indicator>
        <IndicatorItem variant="dot" label="New notifications" />
        <Avatar fallback="AB" />
      </Indicator>,
    );

    const dot = screen.getByLabelText('New notifications');
    expect(dot).toHaveClass('z-indicator__item');
    expect(dot).toHaveAttribute('data-variant', 'dot');
  });

  it('forwards ref to indicator root', () => {
    const ref = vi.fn();
    renderWithTheme(
      <Indicator ref={ref}>
        <Avatar fallback="AB" />
      </Indicator>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Indicator>
        <IndicatorItem tone="primary">5</IndicatorItem>
        <Avatar fallback="AB" alt="User avatar" />
      </Indicator>,
    );
    await checkA11y(container);
  });
});
