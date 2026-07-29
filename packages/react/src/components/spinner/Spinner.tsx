import { forwardRef, type HTMLAttributes } from 'react';
import { cx, type Size } from '../../shared';
import './spinner.css';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: Size;
  'aria-label'?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', className, 'aria-label': ariaLabel = 'Loading', ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-busy="true"
      aria-label={ariaLabel}
      className={cx('z-spinner', className)}
      data-size={size}
      {...props}
    />
  );
});

Spinner.displayName = 'Spinner';
