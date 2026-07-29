import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cx } from '../../shared';
import './skeleton.css';

export type SkeletonRadius =
  | 'control'
  | 'control-compact'
  | 'surface'
  | 'container'
  | 'pill'
  | 'circle';

export type SkeletonTextRole =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'title'
  | 'body'
  | 'control'
  | 'label'
  | 'caption';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Corner treatment. Defaults to `control`. */
  radius?: SkeletonRadius;
  /** Match a typography role’s line box height. */
  text?: SkeletonTextRole;
  /** Explicit width. Numbers are treated as pixels. */
  width?: string | number;
  /** Explicit height. Numbers are treated as pixels. Ignored when `text` is set unless needed for circles. */
  height?: string | number;
}

function toCssSize(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === 'number' ? `${value}px` : value;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  {
    radius = 'control',
    text,
    width,
    height,
    className,
    style,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
  },
  ref,
) {
  const resolvedWidth = toCssSize(width);
  const resolvedHeight = toCssSize(height);
  const isLabeled = Boolean(ariaLabel);
  const mergedStyle: CSSProperties = {
    ...style,
    ...(resolvedWidth !== undefined ? { width: resolvedWidth } : null),
    ...(resolvedHeight !== undefined ? { height: resolvedHeight } : null),
  };

  return (
    <span
      ref={ref}
      className={cx('z-skeleton', className)}
      data-radius={radius}
      data-text={text}
      role={isLabeled ? 'status' : undefined}
      aria-busy={isLabeled ? true : undefined}
      aria-label={ariaLabel}
      aria-hidden={isLabeled ? undefined : (ariaHidden ?? true)}
      style={mergedStyle}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';
