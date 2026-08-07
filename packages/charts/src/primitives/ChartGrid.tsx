import { GridColumns, GridRows } from '@visx/grid';
import type { AxisScale } from '@visx/axis';
import { useChartTheme } from './useChartTheme';

export interface ChartGridProps {
  width: number;
  height: number;
  xScale?: AxisScale;
  yScale?: AxisScale;
  numTicksRows?: number;
  numTicksColumns?: number;
}

export function ChartGrid({
  width,
  height,
  xScale,
  yScale,
  numTicksRows = 5,
  numTicksColumns,
}: ChartGridProps) {
  const theme = useChartTheme();

  return (
    <>
      {yScale ? (
        <GridRows
          width={width}
          height={height}
          scale={yScale}
          numTicks={numTicksRows}
          stroke={theme.grid}
          strokeOpacity={0.6}
        />
      ) : null}
      {xScale ? (
        <GridColumns
          width={width}
          height={height}
          scale={xScale}
          numTicks={numTicksColumns}
          stroke={theme.grid}
          strokeOpacity={0.6}
        />
      ) : null}
    </>
  );
}
