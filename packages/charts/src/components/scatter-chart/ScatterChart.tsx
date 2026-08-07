import { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { scaleLinear } from '@visx/scale';
import { min, max } from '@visx/vendor/d3-array';
import { ChartAxis } from '../../primitives/ChartAxis';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartGrid } from '../../primitives/ChartGrid';
import { ChartLegend } from '../../primitives/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { ChartMargin, ChartSeries } from '../../shared/types';
import './scatter-chart.css';

export interface ScatterChartProps<T extends Record<string, unknown>> {
  data: T[];
  series?: ChartSeries[];
  seriesAccessor?: (row: T) => string;
  xAccessor: (row: T) => number;
  yAccessor: (row: T) => number;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface ScatterChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  visibleSeries: ChartSeries[];
  colors: string[];
  seriesAccessor?: (row: T) => string;
  xAccessor: (row: T) => number;
  yAccessor: (row: T) => number;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function ScatterChartSvg<T extends Record<string, unknown>>({
  data,
  series,
  visibleSeries,
  colors,
  seriesAccessor,
  xAccessor,
  yAccessor,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: ScatterChartSvgProps<T>) {
  const xValues = data.map(xAccessor);
  const yValues = data.map(yAccessor);

  const xDomain = useMemo(
    () => [min(xValues) ?? 0, max(xValues) ?? 1] as [number, number],
    [xValues],
  );
  const yDomain = useMemo(
    () => [min(yValues) ?? 0, max(yValues) ?? 1] as [number, number],
    [yValues],
  );

  const xScale = useMemo(
    () =>
      scaleLinear({
        domain: xDomain,
        range: [0, innerWidth],
        nice: true,
      }),
    [xDomain, innerWidth],
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: yDomain,
        range: [innerHeight, 0],
        nice: true,
      }),
    [yDomain, innerHeight],
  );

  const isHiddenSeries = (key: string) =>
    visibleSeries.length > 0 && !visibleSeries.some((item) => item.key === key);

  const getColor = (row: T) => {
    if (!seriesAccessor || series.length === 0) {
      return resolveSeriesColor(colors, 0);
    }
    const key = seriesAccessor(row);
    const index = series.findIndex((item) => item.key === key);
    const item = series[index];
    return resolveSeriesColor(colors, index, item?.color);
  };

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid ? <ChartGrid width={innerWidth} height={innerHeight} xScale={xScale} yScale={yScale} /> : null}
      {data.map((row, index) => {
        if (seriesAccessor && isHiddenSeries(seriesAccessor(row))) return null;
        const color = getColor(row);
        return (
          <circle
            key={index}
            cx={xScale(xAccessor(row))}
            cy={yScale(yAccessor(row))}
            r={5}
            fill={color}
            className="z-scatter-chart__point"
            onMouseMove={(event) => {
              if (!showTooltip) return;
              const point = localPoint(event);
              if (!point) return;
              onShowTooltip(
                point.y + margin.top,
                point.x + margin.left,
                [
                  { label: 'X', value: formatChartValue(xAccessor(row)) },
                  { label: 'Y', value: formatChartValue(yAccessor(row)) },
                ],
              );
            }}
            onMouseLeave={onHideTooltip}
          />
        );
      })}
      <ChartAxis
        scale={xScale}
        position="bottom"
        top={innerHeight}
        tickFormat={(value) => formatChartValue(Number(value))}
      />
      <ChartAxis
        scale={yScale}
        position="left"
        tickFormat={(value) => formatChartValue(Number(value))}
      />
    </Group>
  );
}

export function ScatterChart<T extends Record<string, unknown>>({
  data,
  series = [],
  seriesAccessor,
  xAccessor,
  yAccessor,
  height = 320,
  width,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: ScatterChartProps<T>) {
  const colors = useChartSeriesColors(series.length || 1);
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(() => new Set());
  const { tooltip, showTooltip: openTooltip, hideTooltip } = useChartTooltipState();
  const visibleSeries = series.filter((item) => !hiddenKeys.has(item.key));

  const toggleSeries = (key: string) => {
    setHiddenKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className={cx('z-scatter-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <ScatterChartSvg
            data={data}
            series={series}
            visibleSeries={visibleSeries}
            colors={colors}
            seriesAccessor={seriesAccessor}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            showGrid={showGrid}
            showTooltip={showTooltip}
            onShowTooltip={openTooltip}
            onHideTooltip={hideTooltip}
            {...dimensions}
          />
        )}
      </ChartFrame>
      {showLegend && series.length > 0 ? (
        <ChartLegend items={series} hiddenKeys={hiddenKeys} onToggle={toggleSeries} />
      ) : null}
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
