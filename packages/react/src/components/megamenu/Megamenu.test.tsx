import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Megamenu, MegamenuContent, MegamenuItem, MegamenuTrigger } from './Megamenu';

describe('Megamenu', () => {
  it('opens large menu content when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Megamenu>
        <MegamenuTrigger>Products</MegamenuTrigger>
        <MegamenuContent>
          <MegamenuItem href="/analytics">Analytics</MegamenuItem>
          <MegamenuItem href="/billing">Billing</MegamenuItem>
        </MegamenuContent>
      </Megamenu>,
    );

    await user.click(screen.getByRole('button', { name: 'Products' }));
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Billing' })).toBeInTheDocument();
  });

  it('marks selected items with data-selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Megamenu>
        <MegamenuTrigger>Products</MegamenuTrigger>
        <MegamenuContent>
          <MegamenuItem href="/analytics" selected>
            Analytics
          </MegamenuItem>
        </MegamenuContent>
      </Megamenu>,
    );

    await user.click(screen.getByRole('button', { name: 'Products' }));
    expect(screen.getByRole('link', { name: 'Analytics' })).toHaveAttribute('data-selected', 'true');
  });

  it('applies z-megamenu classes', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Megamenu>
        <MegamenuTrigger>Products</MegamenuTrigger>
        <MegamenuContent>
          <MegamenuItem href="/analytics">Analytics</MegamenuItem>
        </MegamenuContent>
      </Megamenu>,
    );

    const trigger = screen.getByRole('button', { name: 'Products' });
    expect(trigger).toHaveClass('z-megamenu__trigger', 'z-focus-ring');

    await user.click(trigger);
    expect(screen.getByRole('dialog')).toHaveClass('z-megamenu__content');
    expect(screen.getByRole('link')).toHaveClass('z-megamenu__item', 'z-focus-ring');
  });

  it('has no axe violations when open', async () => {
    const { container } = renderWithTheme(
      <Megamenu defaultOpen>
        <MegamenuTrigger>Products</MegamenuTrigger>
        <MegamenuContent>
          <MegamenuItem href="/analytics">Analytics</MegamenuItem>
          <MegamenuItem href="/billing">Billing</MegamenuItem>
        </MegamenuContent>
      </Megamenu>,
    );
    await checkA11y(container);
  });
});
