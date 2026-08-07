import { useMemo } from 'react';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';
import { scaleBand, scaleLinear } from '@visx/scale';
import { max } from '@visx/vendor/d3-array';
import { ChartAxis } from '../../primitives/ChartAxis';
import { ChartFrame } from '../../primitives/ChartFrame';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './heatmap-chart.css';

export interface HeatmapBin {
  bin: number;
  count: number;
}

export interface HeatmapRow {
  bin: number;
  bins: HeatmapBin[];
}

export interface HeatmapChartProps {
  data: HeatmapRow[];
  xLabels?: string[];
  yLabels?: string[];
  height?: number;
  width?: number;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface HeatmapChartSvgProps {
  data: HeatmapRow[];
  colors: string[];
  xLabels?: string[];
  yLabels?: string[];
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
}

function HeatmapChartSvg({
  data,
  colors,
  xLabels,
  yLabels,
  innerWidth,
  innerHeight,
  margin,
}: HeatmapChartSvgProps) {
  const columnCount = data[0]?.bins.length ?? 0;
  const columnData = useMemo(
    () => Array.from({ length: columnCount }, (_, index) => index),
    [columnCount],
  );

  const xDomain = useMemo(
    () => xLabels ?? columnData.map(String),
    [columnData, xLabels],
  );
  const yDomain = useMemo(
    () => yLabels ?? data.map((_, index) => String(index)),
    [data, yLabels],
  );

  const maxCount = useMemo(() => {
    const counts = data.flatMap((row) => row.bins.map((bin) => bin.count));
    return max(counts) ?? 1;
  }, [data]);

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        domain: xDomain,
        range: [0, innerWidth],
        padding: 0.05,
      }),
    [xDomain, innerWidth],
  );

  const yScale = useMemo(
    () =>
      scaleBand<string>({
        domain: yDomain,
        range: [0, innerHeight],
        padding: 0.05,
      }),
    [yDomain, innerHeight],
  );

  const colorScale = useMemo(
    () =>
      scaleLinear<string>({
        domain: [0, maxCount],
        range: [
          resolveSeriesColor(colors, 0),
          resolveSeriesColor(colors, colors.length - 1),
        ],
      }),
    [colors, maxCount],
  );

  const opacityScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, maxCount],
        range: [0.2, 1],
      }),
    [maxCount],
  );

  const binWidth = xScale.bandwidth();
  const binHeight = yScale.bandwidth();

  return (
    <Group top={margin.top} left={margin.left}>
      <HeatmapRect
        data={columnData}
        binWidth={binWidth}
        binHeight={binHeight}
        xScale={(columnIndex) => xScale(String(columnIndex)) ?? 0}
        yScale={(rowIndex) => yScale(String(rowIndex)) ?? 0}
        colorScale={colorScale}
        opacityScale={opacityScale}
        bins={(columnIndex) => data.map((row) => row.bins[columnIndex])}
        count={(bin) => bin.count}
        gap={1}
        className="z-heatmap-chart__cell"
      />
      <ChartAxis scale={xScale} position="bottom" top={innerHeight} />
      <ChartAxis scale={yScale} position="left" />
    </Group>
  );
}

export function HeatmapChart({
  data,
  xLabels,
  yLabels,
  height = 320,
  width,
  ariaLabel,
  className,
  loading = false,
}: HeatmapChartProps) {
  const colors = useChartSeriesColors(2);
  const tableData = useMemo(
    () =>
      data.flatMap((row, rowIndex) =>
        row.bins.map((bin) => ({
          row: yLabels?.[rowIndex] ?? String(rowIndex),
          column: xLabels?.[bin.bin] ?? String(bin.bin),
          value: bin.count,
        })),
      ),
    [data, xLabels, yLabels],
  );

  return (
    <div className={cx('z-heatmap-chart', className)}>
      <ChartFrame data={tableData} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <HeatmapChartSvg
            data={data}
            colors={colors}
            xLabels={xLabels}
            yLabels={yLabels}
            {...dimensions}
          />
        )}
      </ChartFrame>
    </div>
  );
}
