import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from './Menu';

describe('Menu', () => {
  it('opens menu items when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Menu>
        <MenuTrigger>Options</MenuTrigger>
        <MenuContent>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuContent>
      </Menu>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
  });

  it('marks selected items with data-selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Menu>
        <MenuTrigger>Options</MenuTrigger>
        <MenuContent>
          <MenuItem selected>Edit</MenuItem>
          <MenuSeparator />
          <MenuItem>Delete</MenuItem>
        </MenuContent>
      </Menu>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute('data-selected', 'true');
    expect(screen.getByRole('separator')).toHaveClass('z-menu__separator');
  });

  it('applies z-menu classes', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Menu>
        <MenuTrigger>Options</MenuTrigger>
        <MenuContent>
          <MenuItem>Edit</MenuItem>
        </MenuContent>
      </Menu>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).toHaveClass('z-menu__trigger', 'z-focus-ring');

    await user.click(trigger);
    expect(screen.getByRole('menu')).toHaveClass('z-menu__content');
    expect(screen.getByRole('menuitem')).toHaveClass('z-menu__item', 'z-focus-ring');
  });

  it('has no axe violations when open', async () => {
    const { container } = renderWithTheme(
      <Menu defaultOpen>
        <MenuTrigger>Options</MenuTrigger>
        <MenuContent>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await checkA11y(container);
  });
});
