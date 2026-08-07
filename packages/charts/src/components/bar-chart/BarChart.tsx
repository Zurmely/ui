import { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { BarGroup, BarStack, BarGroupHorizontal, BarStackHorizontal } from '@visx/shape';
import { scaleBand } from '@visx/scale';
import { localPoint } from '@visx/event';
import { max } from '@visx/vendor/d3-array';
import { ChartAxis } from '../../primitives/ChartAxis';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartGrid } from '../../primitives/ChartGrid';
import { ChartLegend } from '../../primitives/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { getNumericDomain, useLinearYScale } from '../../shared/scales';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { BarChartVariant, ChartMargin, ChartOrientation, ChartSeries } from '../../shared/types';
import './bar-chart.css';

export interface BarChartProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T, key: string) => number;
  variant?: BarChartVariant;
  orientation?: ChartOrientation;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface BarChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  visibleSeries: ChartSeries[];
  colors: string[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T, key: string) => number;
  variant: BarChartVariant;
  orientation: ChartOrientation;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function BarChartSvg<T extends Record<string, unknown>>({
  data,
  series,
  visibleSeries,
  colors,
  xAccessor,
  yAccessor,
  variant,
  orientation,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: BarChartSvgProps<T>) {
  const keys = visibleSeries.map((item) => item.key);
  const isHorizontal = orientation === 'horizontal';

  const categoryDomain = useMemo(() => data.map((row) => String(xAccessor(row))), [data, xAccessor]);

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

  const categoryScale = useMemo(
    () =>
      scaleBand<string>({
        domain: categoryDomain,
        range: isHorizontal ? [0, innerHeight] : [0, innerWidth],
        padding: 0.2,
      }),
    [categoryDomain, innerWidth, innerHeight, isHorizontal],
  );

  const seriesScale = useMemo(
    () =>
      scaleBand<string>({
        domain: keys,
        range: [0, categoryScale.bandwidth()],
        padding: 0.1,
      }),
    [keys, categoryScale],
  );

  const valueScale = useLinearYScale(yDomain, isHorizontal ? innerWidth : innerHeight);

  const colorScale = (key: string) => {
    const index = series.findIndex((item) => item.key === key);
    const item = series[index];
    return resolveSeriesColor(colors, index, item?.color);
  };

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid
        ? isHorizontal
          ? <ChartGrid width={innerWidth} height={innerHeight} xScale={valueScale} />
          : <ChartGrid width={innerWidth} height={innerHeight} yScale={valueScale} />
        : null}
      {isHorizontal
        ? variant === 'stacked'
          ? (
            <BarStackHorizontal
              data={data}
              keys={keys}
              y={(row) => String(xAccessor(row))}
              yScale={categoryScale}
              xScale={valueScale}
              color={colorScale}
              className="z-bar-chart__bar"
            />
          )
          : (
            <BarGroupHorizontal
              data={data}
              keys={keys}
              width={innerWidth}
              y0={(row) => String(xAccessor(row))}
              y0Scale={categoryScale}
              y1Scale={seriesScale}
              xScale={valueScale}
              color={colorScale}
              className="z-bar-chart__bar"
            />
          )
        : variant === 'stacked'
          ? (
            <BarStack
              data={data}
              keys={keys}
              x={(row) => String(xAccessor(row))}
              xScale={categoryScale}
              yScale={valueScale}
              color={colorScale}
              className="z-bar-chart__bar"
            />
          )
          : (
            <BarGroup
              data={data}
              keys={keys}
              height={innerHeight}
              x0={(row) => String(xAccessor(row))}
              x0Scale={categoryScale}
              x1Scale={seriesScale}
              yScale={valueScale}
              color={colorScale}
              className="z-bar-chart__bar"
            />
          )}
      {showTooltip
        ? data.map((row, rowIndex) => {
            const category = String(xAccessor(row));
            const bandStart = categoryScale(category) ?? 0;
            const bandSize = categoryScale.bandwidth();
            return (
              <rect
                key={rowIndex}
                x={isHorizontal ? 0 : bandStart}
                y={isHorizontal ? bandStart : 0}
                width={isHorizontal ? innerWidth : bandSize}
                height={isHorizontal ? bandSize : innerHeight}
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
      {isHorizontal
        ? (
          <>
            <ChartAxis scale={categoryScale} position="left" />
            <ChartAxis
              scale={valueScale}
              position="bottom"
              top={innerHeight}
              tickFormat={(value) => formatChartValue(Number(value))}
            />
          </>
        )
        : (
          <>
            <ChartAxis scale={categoryScale} position="bottom" top={innerHeight} />
            <ChartAxis
              scale={valueScale}
              position="left"
              tickFormat={(value) => formatChartValue(Number(value))}
            />
          </>
        )}
    </Group>
  );
}

export function BarChart<T extends Record<string, unknown>>({
  data,
  series,
  xAccessor,
  yAccessor,
  variant = 'grouped',
  orientation = 'vertical',
  height = 320,
  width,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: BarChartProps<T>) {
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
    <div className={cx('z-bar-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <BarChartSvg
            data={data}
            series={series}
            visibleSeries={visibleSeries}
            colors={colors}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            variant={variant}
            orientation={orientation}
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
