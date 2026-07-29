import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

describe('Dialog', () => {
  it('opens content when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('closes when DialogClose is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies z-dialog classes', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toHaveClass('z-dialog__content');
    expect(screen.getByText('Title')).toHaveClass('z-dialog__title');
  });

  it('has no axe violations when open', async () => {
    const { container } = renderWithTheme(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Accessible dialog</DialogTitle>
          <DialogDescription>Supporting text</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    await checkA11y(container);
  });
});
