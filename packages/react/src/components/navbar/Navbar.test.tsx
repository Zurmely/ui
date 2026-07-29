import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Navbar, NavbarLogo, NavbarContent, NavbarItem } from './Navbar';

describe('Navbar', () => {
  it('renders logo and navigation items', () => {
    renderWithTheme(
      <Navbar>
        <NavbarLogo>Z-UI</NavbarLogo>
        <NavbarContent>
          <NavbarItem>
            <a href="/docs" aria-current="page">
              Docs
            </a>
          </NavbarItem>
          <NavbarItem>
            <a href="/blog">Blog</a>
          </NavbarItem>
        </NavbarContent>
      </Navbar>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByText('Z-UI')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
  });

  it('applies z-navbar classes', () => {
    renderWithTheme(
      <Navbar>
        <NavbarLogo>Logo</NavbarLogo>
        <NavbarContent>
          <NavbarItem>
            <a href="/docs">Docs</a>
          </NavbarItem>
        </NavbarContent>
      </Navbar>,
    );

    expect(screen.getByRole('banner')).toHaveClass('z-navbar');
    expect(screen.getByText('Logo')).toHaveClass('z-navbar__logo');
    expect(screen.getByRole('list')).toHaveClass('z-navbar__content');
    expect(screen.getByRole('listitem')).toHaveClass('z-navbar__item');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Navbar>
        <NavbarLogo>Z-UI</NavbarLogo>
        <NavbarContent>
          <NavbarItem>
            <a href="/docs">Docs</a>
          </NavbarItem>
        </NavbarContent>
      </Navbar>,
    );
    await checkA11y(container);
  });
});
