import { forwardRef, type HTMLAttributes } from 'react';
import { cx, type Size } from '../../shared';
import './radial-progress.css';

export interface RadialProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  size?: Size;
  'aria-label'?: string;
}

const STROKE_WIDTH = 4;

export const RadialProgress = forwardRef<HTMLDivElement, RadialProgressProps>(
  function RadialProgress(
    {
      value,
      max = 100,
      indeterminate = false,
      size = 'md',
      className,
      'aria-label': ariaLabel = 'Progress',
      ...props
    },
    ref,
  ) {
    const clampedMax = max > 0 ? max : 100;
    const hasValue = value !== undefined && !indeterminate;
    const clampedValue = hasValue ? Math.min(Math.max(value, 0), clampedMax) : undefined;
    const percent = hasValue && clampedValue !== undefined ? clampedValue / clampedMax : 0;
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - percent);

    return (
      <div
        ref={ref}
        role="progressbar"
        className={cx('z-radial-progress', className)}
        data-size={size}
        data-indeterminate={indeterminate ? 'true' : undefined}
        aria-label={ariaLabel}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : clampedMax}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        {...props}
      >
        <svg
          className="z-radial-progress__svg"
          viewBox="0 0 40 40"
          aria-hidden="true"
          data-indeterminate={indeterminate ? 'true' : undefined}
        >
          <circle
            className="z-radial-progress__track"
            cx="20"
            cy="20"
            r={radius}
            fill="none"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            className="z-radial-progress__indicator"
            cx="20"
            cy="20"
            r={radius}
            fill="none"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? undefined : dashOffset}
            data-indeterminate={indeterminate ? 'true' : undefined}
            transform="rotate(-90 20 20)"
          />
        </svg>
      </div>
    );
  },
);

RadialProgress.displayName = 'RadialProgress';
