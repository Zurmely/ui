import { useMemo } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { localPoint } from '@visx/event';
import { curveMonotoneX } from '@visx/curve';
import { ChartAxis } from '../../primitives/ChartAxis';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartGrid } from '../../primitives/ChartGrid';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { useChartTheme } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { getNumericDomain, useLinearYScale, usePointXScale } from '../../shared/scales';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './threshold-chart.css';

export interface ThresholdChartProps<T extends Record<string, unknown>> {
  data: T[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T) => number;
  threshold: number;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface ThresholdChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T) => number;
  threshold: number;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function ThresholdChartSvg<T extends Record<string, unknown>>({
  data,
  xAccessor,
  yAccessor,
  threshold,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: ThresholdChartSvgProps<T>) {
  const theme = useChartTheme();

  const yDomain = useMemo((): [number, number] => {
    const values = data.map(yAccessor);
    const minValue = Math.min(...values, threshold);
    const maxValue = Math.max(...values, threshold);
    return minValue === maxValue ? [0, maxValue || 1] : [minValue, maxValue];
  }, [data, yAccessor, threshold]);

  const xScale = usePointXScale(data, xAccessor, innerWidth);
  const yScale = useLinearYScale(yDomain, innerHeight);

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid ? <ChartGrid width={innerWidth} height={innerHeight} yScale={yScale} /> : null}
      <Threshold
        id="z-threshold-chart"
        data={data}
        x={(row) => xScale(String(xAccessor(row))) ?? 0}
        y0={(row) => yScale(yAccessor(row))}
        y1={() => yScale(threshold)}
        clipAboveTo={0}
        clipBelowTo={innerHeight}
        belowAreaProps={{
          fill: theme.negative,
          fillOpacity: 0.3,
          className: 'z-threshold-chart__below',
        }}
        aboveAreaProps={{
          fill: theme.positive,
          fillOpacity: 0.3,
          className: 'z-threshold-chart__above',
        }}
        curve={curveMonotoneX}
      />
      <LinePath
        data={data}
        x={(row) => xScale(String(xAccessor(row))) ?? 0}
        y={(row) => yScale(yAccessor(row))}
        stroke={theme.reference}
        strokeWidth={2}
        curve={curveMonotoneX}
        className="z-threshold-chart__line"
      />
      <line
        x1={0}
        x2={innerWidth}
        y1={yScale(threshold)}
        y2={yScale(threshold)}
        stroke={theme.reference}
        strokeDasharray="4 4"
        className="z-threshold-chart__threshold-line"
      />
      {showTooltip
        ? data.map((row, rowIndex) => {
            const x = xScale(String(xAccessor(row))) ?? 0;
            return (
              <rect
                key={rowIndex}
                x={x - 8}
                y={0}
                width={16}
                height={innerHeight}
                fill="transparent"
                onMouseMove={(event) => {
                  const point = localPoint(event);
                  if (!point) return;
                  onShowTooltip(
                    point.y + margin.top,
                    point.x + margin.left,
                    [
                      { label: 'Value', value: formatChartValue(yAccessor(row)) },
                      { label: 'Threshold', value: formatChartValue(threshold) },
                    ],
                  );
                }}
                onMouseLeave={onHideTooltip}
              />
            );
          })
        : null}
      <ChartAxis scale={xScale} position="bottom" top={innerHeight} />
      <ChartAxis
        scale={yScale}
        position="left"
        tickFormat={(value) => formatChartValue(Number(value))}
      />
    </Group>
  );
}

export function ThresholdChart<T extends Record<string, unknown>>({
  data,
  xAccessor,
  yAccessor,
  threshold,
  height = 320,
  width,
  showGrid = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: ThresholdChartProps<T>) {
  const { tooltip, showTooltip: openTooltip, hideTooltip } = useChartTooltipState();

  return (
    <div className={cx('z-threshold-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <ThresholdChartSvg
            data={data}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            threshold={threshold}
            showGrid={showGrid}
            showTooltip={showTooltip}
            onShowTooltip={openTooltip}
            onHideTooltip={hideTooltip}
            {...dimensions}
          />
        )}
      </ChartFrame>
      {showTooltip ? (
        <ChartTooltip top={tooltip.top} left={tooltip.left} open={tooltip.open}>
          {tooltip.data.map((item) => (
            <ChartTooltipRow key={item.label} {...item} />
          ))}
        </ChartTooltip>
      ) : null}
    </div>
  );
}
