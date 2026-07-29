import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, type Size, type Tone } from '../../shared';
import './status.css';

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: Size;
  label?: ReactNode;
}

export const Status = forwardRef<HTMLSpanElement, StatusProps>(function Status(
  { tone = 'neutral', size = 'md', label, className, children, ...props },
  ref,
) {
  const text = label ?? children;

  return (
    <span
      ref={ref}
      className={cx('z-status', className)}
      data-tone={tone}
      data-size={size}
      {...props}
    >
      <span className="z-status__indicator" aria-hidden="true" />
      {text ? <span className="z-status__label">{text}</span> : null}
    </span>
  );
});
Status.displayName = 'Status';
