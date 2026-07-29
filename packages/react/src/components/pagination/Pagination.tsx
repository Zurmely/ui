import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type LiHTMLAttributes } from 'react';
import { cx } from '../../shared';
import { Link } from '../link/Link';
import '../../shared/focus-ring.css';
import './pagination.css';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  label?: string;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { label = 'Pagination', className, children, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label={label}
      className={cx('z-pagination', className)}
      {...props}
    >
      <ul className="z-pagination__list">{children}</ul>
    </nav>
  );
});
Pagination.displayName = 'Pagination';

export const PaginationItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  function PaginationItem({ className, ...props }, ref) {
    return <li ref={ref} className={cx('z-pagination__item', className)} {...props} />;
  },
);
PaginationItem.displayName = 'PaginationItem';

export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
  disabled?: boolean;
}

export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  function PaginationLink({ current = false, disabled = false, className, children, ...props }, ref) {
    return (
      <Link
        ref={ref}
        className={cx('z-pagination__link', className)}
        aria-current={current ? 'page' : undefined}
        disabled={disabled}
        {...props}
      >
        {children}
      </Link>
    );
  },
);
PaginationLink.displayName = 'PaginationLink';

export const PaginationEllipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function PaginationEllipsis({ className, children = '…', ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cx('z-pagination__ellipsis', className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    );
  },
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
