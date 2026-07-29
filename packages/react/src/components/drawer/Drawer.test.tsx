import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

describe('Drawer', () => {
  it('opens content when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('closes when DrawerClose is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies z-drawer classes and side attribute', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent side="left">
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('z-drawer__content');
    expect(dialog).toHaveAttribute('data-side', 'left');
    expect(screen.getByText('Title')).toHaveClass('z-drawer__title');
  });

  it('renders footer slot', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerFooter>
            <button type="button">Save</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('button', { name: 'Save' }).parentElement).toHaveClass(
      'z-drawer__footer',
    );
  });

  it('has no axe violations when open', async () => {
    const { container } = renderWithTheme(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Accessible drawer</DrawerTitle>
          <DrawerDescription>Supporting text</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    await checkA11y(container);
  });
});
