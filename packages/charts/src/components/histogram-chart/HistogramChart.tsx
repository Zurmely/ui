import { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { bin } from '@visx/vendor/d3-array';
import { scaleBand } from '@visx/scale';
import { ChartAxis } from '../../primitives/ChartAxis';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartGrid } from '../../primitives/ChartGrid';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { useLinearYScale } from '../../shared/scales';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './histogram-chart.css';

export interface HistogramChartProps<T extends Record<string, unknown>> {
  data: T[];
  valueAccessor: (row: T) => number;
  binCount?: number;
  height?: number;
  width?: number;
  showGrid?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface HistogramChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  valueAccessor: (row: T) => number;
  binCount: number;
  colors: string[];
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
}

function HistogramChartSvg<T extends Record<string, unknown>>({
  data,
  valueAccessor,
  binCount,
  colors,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
}: HistogramChartSvgProps<T>) {
  const values = useMemo(() => data.map(valueAccessor), [data, valueAccessor]);

  const bins = useMemo(
    () =>
      bin()
        .domain([Math.min(...values), Math.max(...values)])
        .thresholds(binCount)(values),
    [values, binCount],
  );

  const xDomain = useMemo(
    () => bins.map((_, index) => String(index)),
    [bins],
  );

  const yDomain = useMemo(
    () => [0, Math.max(...bins.map((b) => b.length), 1)] as [number, number],
    [bins],
  );

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        domain: xDomain,
        range: [0, innerWidth],
        padding: 0.1,
      }),
    [xDomain, innerWidth],
  );

  const yScale = useLinearYScale(yDomain, innerHeight);
  const color = resolveSeriesColor(colors, 0);

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid ? <ChartGrid width={innerWidth} height={innerHeight} yScale={yScale} /> : null}
      {bins.map((histogramBin, index) => {
        const x = xScale(String(index)) ?? 0;
        const barHeight = innerHeight - yScale(histogramBin.length);
        return (
          <Bar
            key={index}
            x={x}
            y={yScale(histogramBin.length)}
            width={xScale.bandwidth()}
            height={barHeight}
            fill={color}
            className="z-histogram-chart__bar"
          />
        );
      })}
      <ChartAxis
        scale={xScale}
        position="bottom"
        top={innerHeight}
        tickFormat={(value) => {
          const binIndex = Number(value);
          const histogramBin = bins[binIndex];
          if (!histogramBin) return '';
          return formatChartValue(histogramBin.x0 ?? 0);
        }}
      />
      <ChartAxis
        scale={yScale}
        position="left"
        tickFormat={(value) => formatChartValue(Number(value))}
      />
    </Group>
  );
}

export function HistogramChart<T extends Record<string, unknown>>({
  data,
  valueAccessor,
  binCount = 10,
  height = 320,
  width,
  showGrid = true,
  ariaLabel,
  className,
  loading = false,
}: HistogramChartProps<T>) {
  const colors = useChartSeriesColors(1);

  return (
    <div className={cx('z-histogram-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <HistogramChartSvg
            data={data}
            valueAccessor={valueAccessor}
            binCount={binCount}
            colors={colors}
            showGrid={showGrid}
            {...dimensions}
          />
        )}
      </ChartFrame>
    </div>
  );
}
