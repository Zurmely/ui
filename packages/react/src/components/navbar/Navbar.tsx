import { forwardRef, type HTMLAttributes, type LiHTMLAttributes } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './navbar.css';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  label?: string;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { label = 'Main navigation', className, children, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cx('z-navbar', className)} {...props}>
      <nav aria-label={label} className="z-navbar__nav">
        {children}
      </nav>
    </header>
  );
});
Navbar.displayName = 'Navbar';

export const NavbarLogo = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function NavbarLogo({ className, ...props }, ref) {
    return <div ref={ref} className={cx('z-navbar__logo', className)} {...props} />;
  },
);
NavbarLogo.displayName = 'NavbarLogo';

export const NavbarContent = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  function NavbarContent({ className, ...props }, ref) {
    return <ul ref={ref} className={cx('z-navbar__content', className)} {...props} />;
  },
);
NavbarContent.displayName = 'NavbarContent';

export const NavbarItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  function NavbarItem({ className, ...props }, ref) {
    return <li ref={ref} className={cx('z-navbar__item', className)} {...props} />;
  },
);
NavbarItem.displayName = 'NavbarItem';
