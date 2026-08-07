import { useMemo } from 'react';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { max, min } from '@visx/vendor/d3-array';
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
import './candlestick-chart.css';

export interface CandlestickChartProps<T extends Record<string, unknown>> {
  data: T[];
  xAccessor: (row: T) => string | number | Date;
  openAccessor: (row: T) => number;
  highAccessor: (row: T) => number;
  lowAccessor: (row: T) => number;
  closeAccessor: (row: T) => number;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface CandlestickChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  xAccessor: (row: T) => string | number | Date;
  openAccessor: (row: T) => number;
  highAccessor: (row: T) => number;
  lowAccessor: (row: T) => number;
  closeAccessor: (row: T) => number;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function CandlestickChartSvg<T extends Record<string, unknown>>({
  data,
  xAccessor,
  openAccessor,
  highAccessor,
  lowAccessor,
  closeAccessor,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: CandlestickChartSvgProps<T>) {
  const theme = useChartTheme();
  const yDomain = useMemo<[number, number]>(() => {
    const lows = data.map((row) => lowAccessor(row));
    const highs = data.map((row) => highAccessor(row));
    const minValue = min(lows) ?? 0;
    const maxValue = max(highs) ?? 0;
    return minValue === maxValue ? [0, maxValue || 1] : [minValue, maxValue];
  }, [data, highAccessor, lowAccessor]);

  const xScale = useBandXScale(data, xAccessor, innerWidth);
  const yScale = useLinearYScale(yDomain, innerHeight);
  const barWidth = Math.max(1, (xScale.bandwidth() ?? 0) * 0.6);

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid ? <ChartGrid width={innerWidth} height={innerHeight} yScale={yScale} /> : null}
      {data.map((row, index) => {
        const open = openAccessor(row);
        const high = highAccessor(row);
        const low = lowAccessor(row);
        const close = closeAccessor(row);
        const centerX = (xScale(String(xAccessor(row))) ?? 0) + (xScale.bandwidth() ?? 0) / 2;
        const bullish = close >= open;
        const color = bullish ? theme.positive : theme.negative;
        const yHigh = yScale(high);
        const yLow = yScale(low);
        const yOpen = yScale(open);
        const yClose = yScale(close);

        return (
          <g
            key={index}
            className={cx('z-candlestick-chart__bar', bullish ? 'z-candlestick-chart__bar--up' : 'z-candlestick-chart__bar--down')}
            onMouseMove={
              showTooltip
                ? (event) => {
                    const point = localPoint(event);
                    if (!point) return;
                    onShowTooltip(point.y + margin.top, point.x + margin.left, [
                      { label: 'Open', value: formatChartValue(open), color },
                      { label: 'High', value: formatChartValue(high), color },
                      { label: 'Low', value: formatChartValue(low), color },
                      { label: 'Close', value: formatChartValue(close), color },
                    ]);
                  }
                : undefined
            }
            onMouseLeave={showTooltip ? onHideTooltip : undefined}
          >
            <line
              x1={centerX}
              x2={centerX}
              y1={yHigh}
              y2={yLow}
              stroke={color}
              className="z-candlestick-chart__wick"
            />
            <line
              x1={centerX - barWidth / 2}
              x2={centerX}
              y1={yOpen}
              y2={yOpen}
              stroke={color}
              className="z-candlestick-chart__tick"
            />
            <line
              x1={centerX}
              x2={centerX + barWidth / 2}
              y1={yClose}
              y2={yClose}
              stroke={color}
              className="z-candlestick-chart__tick"
            />
          </g>
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
  { key: 'up', label: 'Up' },
  { key: 'down', label: 'Down' },
];

export function CandlestickChart<T extends Record<string, unknown>>({
  data,
  xAccessor,
  openAccessor,
  highAccessor,
  lowAccessor,
  closeAccessor,
  height = 320,
  width,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: CandlestickChartProps<T>) {
  const theme = useChartTheme();
  const { tooltip, showTooltip: openTooltip, hideTooltip } = useChartTooltipState();
  const legendItems = LEGEND_ITEMS.map((item) => ({
    ...item,
    color: item.key === 'up' ? theme.positive : theme.negative,
  }));

  return (
    <div className={cx('z-candlestick-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <CandlestickChartSvg
            data={data}
            xAccessor={xAccessor}
            openAccessor={openAccessor}
            highAccessor={highAccessor}
            lowAccessor={lowAccessor}
            closeAccessor={closeAccessor}
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
