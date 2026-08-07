import { useMemo } from 'react';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { ChartAxis } from '../../primitives/ChartAxis';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartGrid } from '../../primitives/ChartGrid';
import { ChartLegend } from '../../primitives/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { useChartTheme } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { useBandXScale, useLinearYScale } from '../../shared/scales';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './waterfall-chart.css';

export interface WaterfallChartProps<T extends Record<string, unknown>> {
  data: T[];
  labelAccessor: (row: T) => string;
  valueAccessor: (row: T) => number;
  isTotalAccessor?: (row: T) => boolean;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface WaterfallBar {
  key: string;
  label: string;
  value: number;
  start: number;
  end: number;
  isTotal: boolean;
}

interface WaterfallChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  labelAccessor: (row: T) => string;
  valueAccessor: (row: T) => number;
  isTotalAccessor?: (row: T) => boolean;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function WaterfallChartSvg<T extends Record<string, unknown>>({
  data,
  labelAccessor,
  valueAccessor,
  isTotalAccessor,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: WaterfallChartSvgProps<T>) {
  const theme = useChartTheme();

  const bars = useMemo(() => {
    let runningTotal = 0;
    return data.map((row, index) => {
      const value = valueAccessor(row);
      const isTotal = isTotalAccessor?.(row) ?? false;
      let start = runningTotal;
      let end = runningTotal + value;

      if (isTotal) {
        start = 0;
        end = value;
        runningTotal = value;
      } else {
        runningTotal += value;
      }

      return {
        key: String(index),
        label: labelAccessor(row),
        value,
        start: Math.min(start, end),
        end: Math.max(start, end),
        isTotal,
      } satisfies WaterfallBar;
    });
  }, [data, isTotalAccessor, labelAccessor, valueAccessor]);

  const yDomain = useMemo<[number, number]>(() => {
    const maxValue = Math.max(0, ...bars.map((bar) => bar.end));
    const minValue = Math.min(0, ...bars.map((bar) => bar.start));
    return minValue === maxValue ? [0, maxValue || 1] : [minValue, maxValue];
  }, [bars]);

  const xScale = useBandXScale(
    data,
    (row) => labelAccessor(row),
    innerWidth,
  );
  const yScale = useLinearYScale(yDomain, innerHeight);
  const barWidth = Math.max(1, (xScale.bandwidth() ?? 0) * 0.7);

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid ? <ChartGrid width={innerWidth} height={innerHeight} yScale={yScale} /> : null}
      {bars.map((bar) => {
        const x = (xScale(bar.label) ?? 0) + ((xScale.bandwidth() ?? 0) - barWidth) / 2;
        const y = yScale(bar.end);
        const height = Math.abs(yScale(bar.start) - yScale(bar.end));
        const color = bar.isTotal ? theme.muted : bar.value >= 0 ? theme.positive : theme.negative;

        return (
          <rect
            key={bar.key}
            x={x}
            y={y}
            width={barWidth}
            height={height}
            fill={color}
            className={cx(
              'z-waterfall-chart__bar',
              bar.isTotal && 'z-waterfall-chart__bar--total',
              !bar.isTotal && bar.value >= 0 && 'z-waterfall-chart__bar--positive',
              !bar.isTotal && bar.value < 0 && 'z-waterfall-chart__bar--negative',
            )}
            onMouseMove={
              showTooltip
                ? (event) => {
                    const point = localPoint(event);
                    if (!point) return;
                    onShowTooltip(point.y + margin.top, point.x + margin.left, [
                      { label: bar.label, value: formatChartValue(bar.value), color },
                    ]);
                  }
                : undefined
            }
            onMouseLeave={showTooltip ? onHideTooltip : undefined}
          />
        );
      })}
      <ChartAxis scale={xScale} position="bottom" top={innerHeight} />
      <ChartAxis
        scale={yScale}
        position="left"
        tickFormat={(value) => formatChartValue(Number(value))}
      />
    </Group>
  );
}

const LEGEND_ITEMS = [
  { key: 'positive', label: 'Increase' },
  { key: 'negative', label: 'Decrease' },
  { key: 'total', label: 'Total' },
];

export function WaterfallChart<T extends Record<string, unknown>>({
  data,
  labelAccessor,
  valueAccessor,
  isTotalAccessor,
  height = 320,
  width,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: WaterfallChartProps<T>) {
  const theme = useChartTheme();
  const { tooltip, showTooltip: openTooltip, hideTooltip } = useChartTooltipState();
  const legendItems = LEGEND_ITEMS.map((item) => ({
    ...item,
    color:
      item.key === 'positive'
        ? theme.positive
        : item.key === 'negative'
          ? theme.negative
          : theme.muted,
  }));

  return (
    <div className={cx('z-waterfall-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <WaterfallChartSvg
            data={data}
            labelAccessor={labelAccessor}
            valueAccessor={valueAccessor}
            isTotalAccessor={isTotalAccessor}
            showGrid={showGrid}
            showTooltip={showTooltip}
            onShowTooltip={openTooltip}
            onHideTooltip={hideTooltip}
            {...dimensions}
          />
        )}
      </ChartFrame>
      {showLegend ? <ChartLegend items={legendItems} /> : null}
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
