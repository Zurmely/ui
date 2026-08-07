import { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { AreaClosed, AreaStack } from '@visx/shape';
import { localPoint } from '@visx/event';
import { curveMonotoneX } from '@visx/curve';
import { max } from '@visx/vendor/d3-array';
import { ChartAxis } from '../../primitives/ChartAxis';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartGrid } from '../../primitives/ChartGrid';
import { ChartLegend } from '../../primitives/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { getNumericDomain, useLinearYScale, usePointXScale } from '../../shared/scales';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { ChartMargin, ChartSeries } from '../../shared/types';
import './area-chart.css';

export type AreaChartVariant = 'default' | 'stacked';

export interface AreaChartProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T, key: string) => number;
  variant?: AreaChartVariant;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface AreaChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  visibleSeries: ChartSeries[];
  colors: string[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T, key: string) => number;
  variant: AreaChartVariant;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function AreaChartSvg<T extends Record<string, unknown>>({
  data,
  series,
  visibleSeries,
  colors,
  xAccessor,
  yAccessor,
  variant,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: AreaChartSvgProps<T>) {
  const keys = visibleSeries.map((item) => item.key);

  const yDomain = useMemo(() => {
    if (variant === 'stacked' && keys.length > 0) {
      const totals = data.map((row) =>
        keys.reduce((sum, key) => sum + yAccessor(row, key), 0),
      );
      const maxTotal = max(totals) ?? 0;
      return [0, maxTotal || 1] as [number, number];
    }
    return getNumericDomain(
      data as Record<string, unknown>[],
      visibleSeries.length ? visibleSeries : series,
      yAccessor as (row: Record<string, unknown>, key: string) => number,
    );
  }, [data, series, visibleSeries, yAccessor, variant, keys]);

  const xScale = usePointXScale(data, xAccessor, innerWidth);
  const yScale = useLinearYScale(yDomain, innerHeight);

  const colorScale = (key: string) => {
    const item = series.find((entry) => entry.key === key);
    const index = series.indexOf(item!);
    return resolveSeriesColor(colors, index, item?.color);
  };

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid ? <ChartGrid width={innerWidth} height={innerHeight} yScale={yScale} /> : null}
      {variant === 'stacked' && keys.length > 0
        ? (
          <AreaStack
            data={data}
            keys={keys}
            value={(row, key) => yAccessor(row, key)}
            x={(point) => xScale(String(xAccessor(point.data))) ?? 0}
            y0={(point) => yScale(point[0])}
            y1={(point) => yScale(point[1])}
            offset="none"
            color={colorScale}
            curve={curveMonotoneX}
            className="z-area-chart__area"
          />
        )
        : visibleSeries.map((item) => {
            const color = resolveSeriesColor(colors, series.indexOf(item), item.color);
            return (
              <AreaClosed
                key={item.key}
                data={data}
                x={(row) => xScale(String(xAccessor(row))) ?? 0}
                y={(row) => yScale(yAccessor(row, item.key))}
                yScale={yScale}
                fill={color}
                fillOpacity={0.4}
                stroke={color}
                curve={curveMonotoneX}
                className="z-area-chart__area"
              />
            );
          })}
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
                    visibleSeries.map((item) => ({
                      label: item.label,
                      value: formatChartValue(yAccessor(row, item.key)),
                      color: resolveSeriesColor(colors, series.indexOf(item), item.color),
                    })),
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

export function AreaChart<T extends Record<string, unknown>>({
  data,
  series,
  xAccessor,
  yAccessor,
  variant = 'default',
  height = 320,
  width,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: AreaChartProps<T>) {
  const colors = useChartSeriesColors(series.length);
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
    <div className={cx('z-area-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <AreaChartSvg
            data={data}
            series={series}
            visibleSeries={visibleSeries}
            colors={colors}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            variant={variant}
            showGrid={showGrid}
            showTooltip={showTooltip}
            onShowTooltip={openTooltip}
            onHideTooltip={hideTooltip}
            {...dimensions}
          />
        )}
      </ChartFrame>
      {showLegend ? (
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
