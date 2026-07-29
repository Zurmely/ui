import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

describe('Tooltip', () => {
  it('shows content on trigger hover', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    await user.hover(screen.getByRole('button', { name: 'Hover me' }));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
    });
  });

  it('applies z-tooltip classes', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    expect(trigger).toHaveClass('z-tooltip__trigger', 'z-focus-ring');

    await user.hover(trigger);
    await waitFor(() => {
      const content = document.querySelector('.z-tooltip__content');
      expect(content).toHaveTextContent('Tooltip text');
    });
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Label</TooltipTrigger>
          <TooltipContent>Helpful text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await checkA11y(container);
  });
});
