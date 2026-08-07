import { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { Arc } from '@visx/shape';
import { scaleBand } from '@visx/scale';
import { localPoint } from '@visx/event';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartLegend } from '../../primitives/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { ChartMargin, ChartSeries } from '../../shared/types';
import './radial-bar-chart.css';

export interface RadialBarChartProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  labelAccessor: (row: T) => string;
  valueAccessor: (row: T, key: string) => number;
  height?: number;
  width?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface RadialBarChartSvgProps<T extends Record<string, unknown>> {
  data: T[];
  series: ChartSeries[];
  visibleSeries: ChartSeries[];
  colors: string[];
  labelAccessor: (row: T) => string;
  valueAccessor: (row: T, key: string) => number;
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function RadialBarChartSvg<T extends Record<string, unknown>>({
  data,
  series,
  visibleSeries,
  colors,
  labelAccessor,
  valueAccessor,
  innerWidth,
  innerHeight,
  margin,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: RadialBarChartSvgProps<T>) {
  const labels = useMemo(() => data.map(labelAccessor), [data, labelAccessor]);
  const keys = visibleSeries.map((item) => item.key);

  const maxValue = useMemo(() => {
    const values = data.flatMap((row) =>
      keys.map((key) => valueAccessor(row, key)),
    );
    return Math.max(...values, 1);
  }, [data, keys, valueAccessor]);

  const outerRadius = Math.min(innerWidth, innerHeight) / 2;
  const innerRadius = outerRadius * 0.4;
  const bandWidth = (outerRadius - innerRadius) / Math.max(keys.length, 1);

  const angleScale = useMemo(
    () =>
      scaleBand<string>({
        domain: labels.map(String),
        range: [0, Math.PI * 2],
        padding: 0.2,
      }),
    [labels],
  );

  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  return (
    <Group top={margin.top + centerY} left={margin.left + centerX}>
      {data.flatMap((row, rowIndex) => {
        const label = String(labelAccessor(row));
        const startAngle = angleScale(label) ?? 0;
        const endAngle = startAngle + angleScale.bandwidth();
        return keys.map((key, keyIndex) => {
          const seriesItem = visibleSeries.find((item) => item.key === key);
          const seriesIndex = series.indexOf(seriesItem!);
          const color = resolveSeriesColor(colors, seriesIndex, seriesItem?.color);
          const value = valueAccessor(row, key);
          const barOuter = innerRadius + bandWidth * (keyIndex + 1) * (value / maxValue);
          return (
            <Arc
              key={`${rowIndex}-${key}`}
              innerRadius={innerRadius + bandWidth * keyIndex}
              outerRadius={barOuter}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={color}
              className="z-radial-bar-chart__bar"
              onMouseMove={(event) => {
                if (!showTooltip) return;
                const point = localPoint(event);
                if (!point) return;
                onShowTooltip(
                  point.y + margin.top + centerY,
                  point.x + margin.left + centerX,
                  [{
                    label: `${label} — ${seriesItem?.label ?? key}`,
                    value: formatChartValue(value),
                    color,
                  }],
                );
              }}
              onMouseLeave={onHideTooltip}
            />
          );
        });
      })}
    </Group>
  );
}

export function RadialBarChart<T extends Record<string, unknown>>({
  data,
  series,
  labelAccessor,
  valueAccessor,
  height = 320,
  width,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: RadialBarChartProps<T>) {
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
    <div className={cx('z-radial-bar-chart', className)}>
      <ChartFrame data={data} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <RadialBarChartSvg
            data={data}
            series={series}
            visibleSeries={visibleSeries}
            colors={colors}
            labelAccessor={labelAccessor}
            valueAccessor={valueAccessor}
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
