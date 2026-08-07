import { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { localPoint } from '@visx/event';
import { curveMonotoneX } from '@visx/curve';
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
import './line-chart.css';

export interface LineChartProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T, key: string) => number;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface LineChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  visibleSeries: ChartSeries[];
  colors: string[];
  xAccessor: (row: T) => string | number | Date;
  yAccessor: (row: T, key: string) => number;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function LineChartSvg<T extends Record<string, unknown>>({
  data,
  series,
  visibleSeries,
  colors,
  xAccessor,
  yAccessor,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: LineChartSvgProps<T>) {
  const yDomain = useMemo(
    () => getNumericDomain(data, visibleSeries.length ? visibleSeries : series, yAccessor),
    [data, series, visibleSeries, yAccessor],
  );
  const xScale = usePointXScale(data, xAccessor, innerWidth);
  const yScale = useLinearYScale(yDomain, innerHeight);

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid ? <ChartGrid width={innerWidth} height={innerHeight} yScale={yScale} /> : null}
      {visibleSeries.map((item) => {
        const color = resolveSeriesColor(colors, series.indexOf(item), item.color);
        return (
          <LinePath
            key={item.key}
            data={data}
            x={(row) => xScale(String(xAccessor(row))) ?? 0}
            y={(row) => yScale(yAccessor(row, item.key))}
            stroke={color}
            strokeWidth={2}
            curve={curveMonotoneX}
            className="z-line-chart__path"
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

export function LineChart<T extends Record<string, unknown>>({
  data,
  series,
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
}: LineChartProps<T>) {
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
    <div className={cx('z-line-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <LineChartSvg
            data={data}
            series={series}
            visibleSeries={visibleSeries}
            colors={colors}
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
