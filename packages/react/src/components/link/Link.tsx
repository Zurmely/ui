import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './link.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { disabled = false, className, href, tabIndex, onClick, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      className={cx('z-link', 'z-focus-ring', className)}
      data-disabled={disabled ? 'true' : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
});

Link.displayName = 'Link';
