import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

describe('Popover', () => {
  it('opens content when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole('button', { name: 'Open popover' }));
    expect(screen.getByText('Popover body')).toBeInTheDocument();
  });

  it('applies z-popover classes', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole('button', { name: 'Open popover' });
    expect(trigger).toHaveClass('z-popover__trigger', 'z-focus-ring');

    await user.click(trigger);
    expect(screen.getByText('Popover body')).toHaveClass('z-popover__content');
  });

  it('has no axe violations when open', async () => {
    const { container } = renderWithTheme(
      <Popover defaultOpen>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );
    await checkA11y(container);
  });
});
