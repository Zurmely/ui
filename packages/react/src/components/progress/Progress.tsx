import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../shared';
import './progress.css';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  'aria-label'?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value,
    max = 100,
    indeterminate = false,
    className,
    'aria-label': ariaLabel = 'Progress',
    ...props
  },
  ref,
) {
  const clampedMax = max > 0 ? max : 100;
  const hasValue = value !== undefined && !indeterminate;
  const clampedValue = hasValue ? Math.min(Math.max(value, 0), clampedMax) : undefined;
  const percent = hasValue && clampedValue !== undefined ? (clampedValue / clampedMax) * 100 : 0;

  return (
    <div
      ref={ref}
      role="progressbar"
      className={cx('z-progress', className)}
      data-indeterminate={indeterminate ? 'true' : undefined}
      aria-label={ariaLabel}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : clampedMax}
      aria-valuenow={indeterminate ? undefined : clampedValue}
      {...props}
    >
      <div
        className="z-progress__track"
        aria-hidden="true"
        data-indeterminate={indeterminate ? 'true' : undefined}
      >
        <div
          className="z-progress__indicator"
          style={indeterminate ? undefined : { width: `${percent}%` }}
          data-indeterminate={indeterminate ? 'true' : undefined}
        />
      </div>
    </div>
  );
});

Progress.displayName = 'Progress';
