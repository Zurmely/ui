import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Separator } from '../separator';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
  it('renders with toolbar role and label', () => {
    renderWithTheme(
      <Toolbar label="Document actions">
        <Button>Save</Button>
      </Toolbar>,
    );

    expect(screen.getByRole('toolbar', { name: 'Document actions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders leading, content, and trailing regions', () => {
    const { container } = renderWithTheme(
      <Toolbar
        label="Actions"
        leading={<Button size="sm">Back</Button>}
        trailing={<IconButton aria-label="More">⋯</IconButton>}
      >
        <Button>Save</Button>
        <Separator orientation="vertical" />
        <Button variant="secondary">Cancel</Button>
      </Toolbar>,
    );

    expect(container.querySelector('.z-toolbar__leading')).toBeInTheDocument();
    expect(container.querySelector('.z-toolbar__content')).toBeInTheDocument();
    expect(container.querySelector('.z-toolbar__trailing')).toBeInTheDocument();
  });

  it('applies orientation data attribute', () => {
    const { container } = renderWithTheme(
      <Toolbar label="Actions" orientation="vertical">
        <Button>One</Button>
      </Toolbar>,
    );

    expect(container.querySelector('.z-toolbar')).toHaveAttribute('data-orientation', 'vertical');
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('moves focus with arrow keys, Home, and End', async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Toolbar label="Actions">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Toolbar>,
    );

    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    const third = screen.getByRole('button', { name: 'Third' });

    first.focus();
    expect(first).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(second).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(third).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(first).toHaveFocus();

    await user.keyboard('{Home}');
    expect(first).toHaveFocus();

    await user.keyboard('{End}');
    expect(third).toHaveFocus();
  });

  it('forwards ref to root element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <Toolbar ref={ref} label="Actions">
        <Button>Save</Button>
      </Toolbar>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('warns when children slot uses a disallowed element in development', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    renderWithTheme(
      <Toolbar label="Actions">
        <div>bad</div>
      </Toolbar>,
    );

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[Toolbar] Slot "children" received <div>'),
    );

    warn.mockRestore();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Toolbar label="Document actions">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Toolbar>,
    );
    await checkA11y(container);
  });
});
