import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumbs,
  BreadcrumbSeparator,
} from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders navigation with aria-label', () => {
    renderWithTheme(
      <Breadcrumbs label="Site">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink current>Settings</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(screen.getByRole('navigation', { name: 'Site' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Settings')).toHaveAttribute('aria-current', 'page');
  });

  it('applies z-breadcrumbs classes', () => {
    renderWithTheme(
      <Breadcrumbs>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink current>Current</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(screen.getByRole('navigation')).toHaveClass('z-breadcrumbs');
    expect(screen.getByRole('link')).toHaveClass('z-breadcrumbs__link');
    expect(screen.getByText('Current')).toHaveClass('z-breadcrumbs__link--current');
    expect(screen.getByText('/')).toHaveClass('z-breadcrumbs__separator');
  });

  it('focuses breadcrumb link on click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((event) => event.preventDefault());
    renderWithTheme(
      <Breadcrumbs>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs" onClick={onClick}>
            Docs
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>,
    );

    const link = screen.getByRole('link', { name: 'Docs' });
    await user.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(link).toHaveFocus();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Breadcrumbs>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink current>Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>,
    );
    await checkA11y(container);
  });
});
