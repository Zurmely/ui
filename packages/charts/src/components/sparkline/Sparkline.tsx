import { useMemo } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { ChartFrame } from '../../primitives/ChartFrame';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { getNumericDomain, useLinearYScale, usePointXScale } from '../../shared/scales';
import { SPARKLINE_MARGIN } from '../../shared/constants';
import { cx } from '../../shared/cx';
import type { ChartMargin, ChartSeries } from '../../shared/types';
import './sparkline.css';

export interface SparklineProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T, key: string) => number;
  height?: number;
  width?: number;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface SparklineSvgProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  colors: string[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T, key: string) => number;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
}

function SparklineSvg<T extends Record<string, unknown>>({
  data,
  series,
  colors,
  xAccessor,
  yAccessor,
  innerWidth,
  innerHeight,
  margin,
}: SparklineSvgProps<T>) {
  const yDomain = useMemo(
    () =>
      getNumericDomain(
        data as Record<string, unknown>[],
        series,
        yAccessor as (row: Record<string, unknown>, key: string) => number,
      ),
    [data, series, yAccessor],
  );
  const xScale = usePointXScale(data, xAccessor, innerWidth);
  const yScale = useLinearYScale(yDomain, innerHeight);

  return (
    <Group top={margin.top} left={margin.left}>
      {series.map((item, index) => {
        const color = resolveSeriesColor(colors, index, item.color);
        return (
          <LinePath
            key={item.key}
            data={data}
            x={(row) => xScale(String(xAccessor(row))) ?? 0}
            y={(row) => yScale(yAccessor(row, item.key))}
            stroke={color}
            strokeWidth={2}
            curve={curveMonotoneX}
            className="z-sparkline__path"
          />
        );
      })}
    </Group>
  );
}

export function Sparkline<T extends Record<string, unknown>>({
  data,
  series,
  xAccessor,
  yAccessor,
  height = 48,
  width,
  ariaLabel,
  className,
  loading = false,
}: SparklineProps<T>) {
  const colors = useChartSeriesColors(series.length);

  return (
    <div className={cx('z-sparkline', className)}>
      <ChartFrame
        data={data}
        height={height}
        width={width}
        margin={SPARKLINE_MARGIN}
        ariaLabel={ariaLabel}
        loading={loading}
        showDataTable={false}
      >
        {(dimensions) => (
          <SparklineSvg
            data={data}
            series={series}
            colors={colors}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            {...dimensions}
          />
        )}
      </ChartFrame>
    </div>
  );
}
