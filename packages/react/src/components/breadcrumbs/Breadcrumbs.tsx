import { forwardRef, type HTMLAttributes, type LiHTMLAttributes } from 'react';
import { cx } from '../../shared';
import { Link, type LinkProps } from '../link/Link';
import '../../shared/focus-ring.css';
import './breadcrumbs.css';

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  label?: string;
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { label = 'Breadcrumb', className, children, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label={label}
      className={cx('z-breadcrumbs', className)}
      {...props}
    >
      <ol className="z-breadcrumbs__list">{children}</ol>
    </nav>
  );
});
Breadcrumbs.displayName = 'Breadcrumbs';

export const BreadcrumbItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return <li ref={ref} className={cx('z-breadcrumbs__item', className)} {...props} />;
  },
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends LinkProps {
  current?: boolean;
}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ current = false, className, children, ...props }, ref) {
    if (current) {
      return (
        <span
          ref={ref as never}
          className={cx('z-breadcrumbs__link', 'z-breadcrumbs__link--current', className)}
          aria-current="page"
        >
          {children}
        </span>
      );
    }

    return (
      <Link
        ref={ref}
        className={cx('z-breadcrumbs__link', className)}
        {...props}
      >
        {children}
      </Link>
    );
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  function BreadcrumbSeparator({ className, children = '/', ...props }, ref) {
    return (
      <li
        ref={ref}
        className={cx('z-breadcrumbs__separator', className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </li>
    );
  },
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
