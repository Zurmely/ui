import { AxisBottom, AxisLeft, AxisRight, AxisTop } from '@visx/axis';
import type { AxisScale } from '@visx/axis';
import { useChartTheme } from './useChartTheme';

export type ChartAxisPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ChartAxisProps {
  scale: AxisScale;
  position: ChartAxisPosition;
  top?: number;
  left?: number;
  numTicks?: number;
  tickFormat?: (value: number | string | Date, index: number) => string;
  label?: string;
}

export function ChartAxis({
  scale,
  position,
  top = 0,
  left = 0,
  numTicks,
  tickFormat,
  label,
}: ChartAxisProps) {
  const theme = useChartTheme();
  const axisProps = {
    scale,
    top,
    left,
    numTicks,
    tickFormat,
    stroke: theme.axis,
    tickStroke: theme.axis,
    tickLabelProps: () => ({
      fill: theme.axisLabel,
      fontSize: 12,
      fontFamily: 'inherit',
      textAnchor: 'middle' as const,
    }),
    label,
    labelProps: {
      fill: theme.axisLabel,
      fontSize: 12,
      fontFamily: 'inherit',
      textAnchor: 'middle' as const,
    },
  };

  switch (position) {
    case 'top':
      return <AxisTop {...axisProps} />;
    case 'right':
      return <AxisRight {...axisProps} />;
    case 'left':
      return <AxisLeft {...axisProps} />;
    case 'bottom':
    default:
      return <AxisBottom {...axisProps} />;
  }
}
