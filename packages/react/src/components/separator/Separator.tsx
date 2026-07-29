import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../shared';
import './separator.css';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', className, role = 'separator', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      aria-orientation={orientation}
      className={cx('z-separator', className)}
      data-orientation={orientation}
      {...props}
    />
  );
});

Separator.displayName = 'Separator';
