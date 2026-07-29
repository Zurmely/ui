import { forwardRef, type HTMLAttributes } from 'react';
import { cx, type Size, type Tone } from '../../shared';
import './badge.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: Size;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('z-badge', className)}
      data-tone={tone}
      data-size={size}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
