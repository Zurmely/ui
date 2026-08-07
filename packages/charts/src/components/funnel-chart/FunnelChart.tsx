import { useMemo } from 'react';
import { Group } from '@visx/group';
import { max } from '@visx/vendor/d3-array';
import { localPoint } from '@visx/event';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartLegend } from '../../primitives/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './funnel-chart.css';

export interface FunnelChartProps<T extends Record<string, unknown>> {
  data: T[];
  labelAccessor: (row: T) => string;
  valueAccessor: (row: T) => number;
  height?: number;
  width?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface FunnelSegment {
  key: string;
  label: string;
  value: number;
  topWidth: number;
  bottomWidth: number;
  y: number;
  height: number;
  color: string;
}

interface FunnelChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  labelAccessor: (row: T) => string;
  valueAccessor: (row: T) => number;
  colors: string[];
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function buildTrapezoidPoints(
  centerX: number,
  topWidth: number,
  bottomWidth: number,
  y: number,
  height: number,
): string {
  const topLeft = centerX - topWidth / 2;
  const topRight = centerX + topWidth / 2;
  const bottomLeft = centerX - bottomWidth / 2;
  const bottomRight = centerX + bottomWidth / 2;
  return `${topLeft},${y} ${topRight},${y} ${bottomRight},${y + height} ${bottomLeft},${y + height}`;
}

function FunnelChartSvg<T extends Record<string, unknown>>({
  data,
  labelAccessor,
  valueAccessor,
  colors,
  innerWidth,
  innerHeight,
  margin,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: FunnelChartSvgProps<T>) {
  const segments = useMemo(() => {
    const values = data.map((row) => valueAccessor(row));
    const maxValue = max(values) ?? 0;
    const segmentHeight = data.length > 0 ? innerHeight / data.length : 0;
    const centerX = innerWidth / 2;

    return data.map((row, index) => {
      const value = valueAccessor(row);
      const nextValue = index < data.length - 1 ? valueAccessor(data[index + 1]) : value;
      const topWidth = maxValue > 0 ? (value / maxValue) * innerWidth : 0;
      const bottomWidth = maxValue > 0 ? (nextValue / maxValue) * innerWidth : 0;

      return {
        key: String(index),
        label: labelAccessor(row),
        value,
        topWidth,
        bottomWidth,
        y: index * segmentHeight,
        height: segmentHeight,
        color: resolveSeriesColor(colors, index),
      } satisfies FunnelSegment;
    });
  }, [colors, data, innerHeight, innerWidth, labelAccessor, valueAccessor]);

  const centerX = innerWidth / 2;

  return (
    <Group top={margin.top} left={margin.left}>
      {segments.map((segment) => (
        <g
          key={segment.key}
          className="z-funnel-chart__segment"
          onMouseMove={
            showTooltip
              ? (event) => {
                  const point = localPoint(event);
                  if (!point) return;
                  onShowTooltip(point.y + margin.top, point.x + margin.left, [
                    { label: segment.label, value: formatChartValue(segment.value), color: segment.color },
                  ]);
                }
              : undefined
          }
          onMouseLeave={showTooltip ? onHideTooltip : undefined}
        >
          <polygon
            points={buildTrapezoidPoints(centerX, segment.topWidth, segment.bottomWidth, segment.y, segment.height)}
            fill={segment.color}
            className="z-funnel-chart__shape"
          />
          <text
            x={centerX}
            y={segment.y + segment.height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="z-funnel-chart__label"
          >
            {segment.label}
          </text>
        </g>
      ))}
    </Group>
  );
}

export function FunnelChart<T extends Record<string, unknown>>({
  data,
  labelAccessor,
  valueAccessor,
  height = 320,
  width,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: FunnelChartProps<T>) {
  const colors = useChartSeriesColors(data.length);
  const { tooltip, showTooltip: openTooltip, hideTooltip } = useChartTooltipState();
  const legendItems = data.map((row, index) => ({
    key: String(index),
    label: labelAccessor(row),
    color: resolveSeriesColor(colors, index),
  }));

  return (
    <div className={cx('z-funnel-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <FunnelChartSvg
            data={data}
            labelAccessor={labelAccessor}
            valueAccessor={valueAccessor}
            colors={colors}
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
