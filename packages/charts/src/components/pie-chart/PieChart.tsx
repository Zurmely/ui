import { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { localPoint } from '@visx/event';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartLegend } from '../../primitives/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './pie-chart.css';

export interface PieChartProps<T extends Record<string, unknown>> {
  data: T[];
  labelAccessor: (row: T) => string;
  valueAccessor: (row: T) => number;
  innerRadius?: number;
  height?: number;
  width?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface PieChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  colors: string[];
  labelAccessor: (row: T) => string;
  valueAccessor: (row: T) => number;
  innerRadius: number;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function PieChartSvg<T extends Record<string, unknown>>({
  data,
  colors,
  labelAccessor,
  valueAccessor,
  innerRadius,
  innerWidth,
  innerHeight,
  margin,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: PieChartSvgProps<T>) {
  const outerRadius = useMemo(
    () => Math.min(innerWidth, innerHeight) / 2,
    [innerWidth, innerHeight],
  );
  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  const legendItems = useMemo(
    () =>
      data.map((row, index) => ({
        key: String(index),
        label: labelAccessor(row),
        color: resolveSeriesColor(colors, index),
      })),
    [data, labelAccessor, colors],
  );

  return (
    <Group top={margin.top + centerY} left={margin.left + centerX}>
      <Pie
        data={data}
        pieValue={valueAccessor}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        className="z-pie-chart__slice"
      >
        {(pie) =>
          pie.arcs.map((arc, index) => {
            const color = resolveSeriesColor(colors, index);
            const row = arc.data;
            return (
              <g key={index}>
                <path
                  d={pie.path(arc) ?? undefined}
                  fill={color}
                  className="z-pie-chart__slice"
                  onMouseMove={(event) => {
                    if (!showTooltip) return;
                    const point = localPoint(event);
                    if (!point) return;
                    onShowTooltip(
                      point.y + margin.top + centerY,
                      point.x + margin.left + centerX,
                      [{
                        label: labelAccessor(row),
                        value: formatChartValue(valueAccessor(row)),
                        color,
                      }],
                    );
                  }}
                  onMouseLeave={onHideTooltip}
                />
              </g>
            );
          })
        }
      </Pie>
      <foreignObject
        x={-innerWidth}
        y={-innerHeight}
        width={innerWidth * 2}
        height={innerHeight * 2}
        style={{ pointerEvents: 'none' }}
      >
        <ul className="z-pie-chart__legend-hidden" aria-hidden="true">
          {legendItems.map((item) => (
            <li key={item.key}>{item.label}</li>
          ))}
        </ul>
      </foreignObject>
    </Group>
  );
}

export function PieChart<T extends Record<string, unknown>>({
  data,
  labelAccessor,
  valueAccessor,
  innerRadius = 0,
  height = 320,
  width,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: PieChartProps<T>) {
  const colors = useChartSeriesColors(data.length);
  const { tooltip, showTooltip: openTooltip, hideTooltip } = useChartTooltipState();

  const legendItems = useMemo(
    () =>
      data.map((row, index) => ({
        key: String(index),
        label: labelAccessor(row),
        color: resolveSeriesColor(colors, index),
      })),
    [data, labelAccessor, colors],
  );

  return (
    <div className={cx('z-pie-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <PieChartSvg
            data={data}
            colors={colors}
            labelAccessor={labelAccessor}
            valueAccessor={valueAccessor}
            innerRadius={innerRadius}
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
