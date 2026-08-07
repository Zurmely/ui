import type { ReactNode } from 'react';
import { ParentSize } from '@visx/responsive';
import { Spinner } from '@z-ux/ui/spinner';
import { cx } from '../shared/cx';
import type { ChartMargin } from '../shared/types';
import { DEFAULT_MARGIN } from '../shared/constants';
import '../primitives/chart.css';

export interface ChartFrameProps<T extends Record<string, unknown>> {
  data: T[];
  width?: number;
  height?: number;
  margin?: Partial<ChartMargin>;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
  responsive?: boolean;
  showDataTable?: boolean;
  children: (dimensions: {
    width: number;
    height: number;
    innerWidth: number;
    innerHeight: number;
    margin: ChartMargin;
  }) => ReactNode;
}

function ChartDataTable<T extends Record<string, unknown>>({
  data,
  ariaLabel,
}: {
  data: T[];
  ariaLabel: string;
}) {
  if (data.length === 0) return null;
  const columns = Object.keys(data[0] ?? {});

  return (
    <table className="z-chart__data-table">
      <caption className="z-chart__data-table-caption">{ariaLabel}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column}>{String(row[column] ?? '')}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ChartFrameInner<T extends Record<string, unknown>>({
  data,
  width = 400,
  height = 300,
  margin: marginOverride,
  ariaLabel,
  className,
  loading = false,
  showDataTable = true,
  children,
}: ChartFrameProps<T>) {
  const margin: ChartMargin = { ...DEFAULT_MARGIN, ...marginOverride };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  if (loading) {
    return (
      <div className={cx('z-chart', 'z-chart--loading', className)} style={{ width, height }}>
        <Spinner size="md" aria-label="Loading chart" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cx('z-chart', 'z-chart--empty', className)} style={{ width, height }}>
        <p className="z-chart__empty-message">No data to display</p>
      </div>
    );
  }

  return (
    <figure className={cx('z-chart', className)} style={{ width, height }}>
      <svg
        className="z-chart__svg"
        width={width}
        height={height}
        role="img"
        aria-label={ariaLabel}
      >
        {children({ width, height, innerWidth, innerHeight, margin })}
      </svg>
      {showDataTable ? <ChartDataTable data={data} ariaLabel={ariaLabel} /> : null}
    </figure>
  );
}

export function ChartFrame<T extends Record<string, unknown>>({
  responsive,
  width,
  height = 300,
  ...props
}: ChartFrameProps<T>) {
  const isResponsive = responsive ?? width == null;

  if (!isResponsive && width != null) {
    return <ChartFrameInner width={width} height={height} {...props} />;
  }

  return (
    <div className="z-chart__responsive" style={{ width: width ?? '100%', height }}>
      <ParentSize debounceTime={10}>
        {({ width: parentWidth }) => (
          <ChartFrameInner
            {...props}
            width={parentWidth}
            height={height}
            responsive={false}
          />
        )}
      </ParentSize>
    </div>
  );
}
