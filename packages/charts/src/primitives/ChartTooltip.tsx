import type { ReactNode } from 'react';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { cx } from '../shared/cx';
import '../primitives/chart.css';

export interface ChartTooltipProps {
  top?: number;
  left?: number;
  open?: boolean;
  children: ReactNode;
}

export function ChartTooltip({ top = 0, left = 0, open = false, children }: ChartTooltipProps) {
  if (!open) return null;

  return (
    <TooltipWithBounds
      top={top}
      left={left}
      className={cx('z-chart-tooltip')}
      style={{
        ...defaultStyles,
        background: 'var(--z-color-overlay-tooltip)',
        color: 'var(--z-color-text-inverse)',
        borderRadius: 'var(--z-radius-control)',
        padding: 'var(--z-spacing-inline-component)',
        boxShadow: 'var(--z-elevation-raised)',
        fontSize: 'var(--z-text-caption-size)',
        lineHeight: 'var(--z-text-caption-line-height)',
      }}
    >
      {children}
    </TooltipWithBounds>
  );
}

export interface ChartTooltipRowProps {
  label: string;
  value: string;
  color?: string;
}

export function ChartTooltipRow({ label, value, color }: ChartTooltipRowProps) {
  return (
    <div className="z-chart-tooltip__row">
      {color ? (
        <span className="z-chart-tooltip__swatch" style={{ backgroundColor: color }} />
      ) : null}
      <span className="z-chart-tooltip__label">{label}</span>
      <span className="z-chart-tooltip__value">{value}</span>
    </div>
  );
}
