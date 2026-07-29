import { forwardRef, type HTMLAttributes } from 'react';
import { cx, type Size } from '../../shared';
import './stack.css';

export type StackDirection = 'horizontal' | 'vertical';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: Size;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction = 'vertical', gap = 'md', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('z-stack', className)}
      data-direction={direction}
      data-gap={gap}
      {...props}
    />
  );
});

Stack.displayName = 'Stack';
