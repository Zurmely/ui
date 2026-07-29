import { forwardRef, type HTMLAttributes } from 'react';
import { cx, type Tone } from '../../shared';
import './indicator.css';

export const Indicator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Indicator({ className, ...props }, ref) {
    return <div ref={ref} className={cx('z-indicator', className)} {...props} />;
  },
);
Indicator.displayName = 'Indicator';

export type IndicatorPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export type IndicatorVariant = 'dot' | 'badge';

export interface IndicatorItemProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: IndicatorVariant;
  placement?: IndicatorPlacement;
  tone?: Tone;
  label?: string;
}

export const IndicatorItem = forwardRef<HTMLSpanElement, IndicatorItemProps>(
  function IndicatorItem(
    { variant = 'badge', placement = 'top-end', tone = 'danger', label, className, children, ...props },
    ref,
  ) {
    const isDot = variant === 'dot';
    const accessibleLabel = label ?? (typeof children === 'string' ? children : undefined);

    return (
      <span
        ref={ref}
        className={cx('z-indicator__item', className)}
        data-variant={variant}
        data-placement={placement}
        data-tone={tone}
        aria-label={isDot ? accessibleLabel : undefined}
        aria-hidden={isDot && !accessibleLabel ? true : undefined}
        {...props}
      >
        {!isDot ? children : null}
      </span>
    );
  },
);
IndicatorItem.displayName = 'IndicatorItem';
