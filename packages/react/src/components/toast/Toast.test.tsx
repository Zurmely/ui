import { screen, waitFor, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';

describe('Toast', () => {
  it('renders toast content when open', async () => {
    renderWithTheme(
      <ToastProvider>
        <Toast open duration={Infinity}>
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Your changes were saved.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Saved')).toBeInTheDocument();
      expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
    });
  });

  it('applies z-toast classes', async () => {
    renderWithTheme(
      <ToastProvider>
        <Toast open duration={Infinity}>
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Details</ToastDescription>
          <ToastAction altText="Undo save">Undo</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    await waitFor(() => {
      expect(document.querySelector('.z-toast__viewport')).toBeInTheDocument();
      expect(document.querySelector('.z-toast__title')).toHaveTextContent('Saved');
      expect(document.querySelector('.z-toast__description')).toHaveTextContent('Details');
      expect(document.querySelector('.z-toast__action')).toHaveTextContent('Undo');
      expect(document.querySelector('.z-toast__close')).toHaveAttribute('aria-label', 'Dismiss');
    });
  });

  it('dismisses when close is clicked', async () => {
    function DismissibleToast() {
      const [open, setOpen] = useState(true);

      return (
        <ToastProvider>
          <Toast open={open} onOpenChange={setOpen} duration={Infinity}>
            <ToastTitle>Saved</ToastTitle>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    }

    renderWithTheme(<DismissibleToast />);

    await waitFor(() => {
      expect(screen.getByText('Saved')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Dismiss'));

    await waitFor(() => {
      expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    });
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <ToastProvider>
        <Toast open duration={Infinity}>
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Your changes were saved.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    await checkA11y(container);
  });
});
