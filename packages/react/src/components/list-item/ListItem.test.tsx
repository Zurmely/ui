import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Avatar } from '../avatar';
import { Badge } from '../badge';
import { Button } from '../button';
import { Switch } from '../switch';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { ListItem, ListItemIcon } from './ListItem';

describe('ListItem', () => {
  it('renders label, description, and regions as div by default', () => {
    renderWithTheme(
      <ListItem
        leading={<span data-testid="leading">L</span>}
        trailing={<span data-testid="trailing">T</span>}
        label="Notifications"
        description="Manage alert preferences"
      >
        Extra content
      </ListItem>,
    );

    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Manage alert preferences')).toBeInTheDocument();
    expect(screen.getByText('Extra content')).toBeInTheDocument();
    expect(screen.getByTestId('leading')).toBeInTheDocument();
    expect(screen.getByTestId('trailing')).toBeInTheDocument();
  });

  it('renders as li with list item class', () => {
    const { container } = renderWithTheme(
      <ul>
        <ListItem as="li" label="Item" size="sm" />
      </ul>,
    );

    const item = container.querySelector('li.z-list-item');
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute('data-size', 'sm');
  });

  it('renders as anchor with selected state', () => {
    renderWithTheme(<ListItem as="a" href="/home" label="Home" selected />);

    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('data-selected', 'true');
  });

  it('renders as button with disabled state', () => {
    renderWithTheme(
      <ListItem as="button" type="button" label="Action" disabled />,
    );

    const button = screen.getByRole('button', { name: 'Action' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled', 'true');
  });

  it('applies align data attribute', () => {
    const { container } = renderWithTheme(
      <ListItem label="Title" align="start" />,
    );

    expect(container.querySelector('.z-list-item')).toHaveAttribute('data-align', 'start');
  });

  it('applies contained variant data attribute', () => {
    const { container } = renderWithTheme(
      <ListItem label="Title" variant="contained" />,
    );

    expect(container.querySelector('.z-list-item')).toHaveAttribute('data-variant', 'contained');
  });

  it('applies compact variant data attribute', () => {
    const { container } = renderWithTheme(
      <ListItem label="Title" variant="compact" />,
    );

    expect(container.querySelector('.z-list-item')).toHaveAttribute('data-variant', 'compact');
  });

  it('defaults to plain variant', () => {
    const { container } = renderWithTheme(<ListItem label="Title" />);

    expect(container.querySelector('.z-list-item')).toHaveAttribute('data-variant', 'plain');
  });

  it('applies interactive data attribute', () => {
    const { container } = renderWithTheme(
      <ListItem as="li" label="Item" interactive />,
    );

    expect(container.querySelector('.z-list-item')).toHaveAttribute('data-interactive', 'true');
  });

  it('injects aria-labelledby and aria-describedby for control', () => {
    renderWithTheme(
      <ListItem
        label="Push notifications"
        description="Receive push alerts"
        control={<Switch />}
      />,
    );

    const switchControl = screen.getByRole('switch');
    expect(switchControl).toHaveAttribute('aria-labelledby');
    expect(switchControl).toHaveAttribute('aria-describedby');
    expect(switchControl.getAttribute('aria-labelledby')).toContain('label');
    expect(switchControl.getAttribute('aria-describedby')).toContain('description');
  });

  it('applies disabled and invalid data attributes with control', () => {
    const { container } = renderWithTheme(
      <ListItem label="Dark mode" control={<Switch />} disabled invalid />,
    );

    const item = container.querySelector('.z-list-item');
    expect(item).toHaveAttribute('data-disabled', 'true');
    expect(item).toHaveAttribute('data-invalid', 'true');
  });

  it('accepts arbitrary leading and trailing components', () => {
    renderWithTheme(
      <ul>
        <ListItem
          as="li"
          leading={<Avatar fallback="AB" alt="Alex" />}
          label="Alex Brown"
          trailing={<Badge tone="primary">Admin</Badge>}
        />
      </ul>,
    );

    expect(screen.getByText('Alex Brown')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('forwards ref to root element', () => {
    const ref = vi.fn();
    renderWithTheme(<ListItem ref={ref} label="Title" />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref to li element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <ul>
        <ListItem ref={ref} as="li" label="Item" />
      </ul>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLLIElement);
  });

  it('warns when trailing contains interactive content inside an interactive row', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    renderWithTheme(
      <ListItem
        as="a"
        href="/settings"
        label="Settings"
        trailing={<Button size="sm">Edit</Button>}
      />,
    );

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[ListItem] Slot "trailing" contains interactive <Button>'),
    );

    warn.mockRestore();
  });

  it('has no axe violations for a basic row', async () => {
    const { container } = renderWithTheme(
      <ListItem
        label="Notifications"
        description="Manage alert preferences"
        leading={
          <ListItemIcon>
            <svg viewBox="0 0 16 16" aria-hidden="true" />
          </ListItemIcon>
        }
      />,
    );
    await checkA11y(container);
  });

  it('has no axe violations for list item with avatar', async () => {
    const { container } = renderWithTheme(
      <ul>
        <ListItem
          as="li"
          leading={<Avatar fallback="AB" alt="Alex" />}
          label="Alex Brown"
          trailing={<Badge>Active</Badge>}
        />
      </ul>,
    );
    await checkA11y(container);
  });

  it('has no axe violations for setting row with control', async () => {
    const { container } = renderWithTheme(
      <ListItem
        label="Email notifications"
        description="Receive updates by email"
        control={<Switch />}
      />,
    );
    await checkA11y(container);
  });

  it('has no axe violations for nav link', async () => {
    const { container } = renderWithTheme(
      <ListItem
        as="a"
        href="/inbox"
        label="Inbox"
        leading={
          <ListItemIcon>
            <svg viewBox="0 0 16 16" />
          </ListItemIcon>
        }
        trailing={<Badge>12</Badge>}
      />,
    );
    await checkA11y(container);
  });
});

describe('ListItemIcon', () => {
  it('renders with icon class', () => {
    const { container } = renderWithTheme(
      <ListItemIcon>
        <svg viewBox="0 0 16 16" />
      </ListItemIcon>,
    );

    expect(container.querySelector('.z-list-item__icon')).toBeInTheDocument();
  });
});
