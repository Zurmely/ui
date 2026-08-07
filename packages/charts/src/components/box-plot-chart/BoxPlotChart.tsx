import { useMemo } from 'react';
import { Group } from '@visx/group';
import { BoxPlot } from '@visx/stats';
import { scaleBand } from '@visx/scale';
import { ChartAxis } from '../../primitives/ChartAxis';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartGrid } from '../../primitives/ChartGrid';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { formatChartValue } from '../../shared/format';
import { useLinearYScale } from '../../shared/scales';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './box-plot-chart.css';

export interface BoxPlotDatum {
  label: string;
  min: number;
  max: number;
  median: number;
  firstQuartile: number;
  thirdQuartile: number;
}

export interface BoxPlotChartProps {
  data: BoxPlotDatum[];
  height?: number;
  width?: number;
  showGrid?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface BoxPlotChartSvgProps {
  data: BoxPlotDatum[];
  colors: string[];
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showGrid: boolean;
}

function BoxPlotChartSvg({
  data,
  colors,
  innerWidth,
  innerHeight,
  margin,
  showGrid,
}: BoxPlotChartSvgProps) {
  const labels = data.map((item) => item.label);

  const yDomain = useMemo(() => {
    const minValue = Math.min(...data.map((item) => item.min));
    const maxValue = Math.max(...data.map((item) => item.max));
    return [minValue, maxValue] as [number, number];
  }, [data]);

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        domain: labels,
        range: [0, innerWidth],
        padding: 0.3,
      }),
    [labels, innerWidth],
  );

  const yScale = useLinearYScale(yDomain, innerHeight);
  const boxWidth = Math.min(xScale.bandwidth(), 40);

  return (
    <Group top={margin.top} left={margin.left}>
      {showGrid ? <ChartGrid width={innerWidth} height={innerHeight} yScale={yScale} /> : null}
      {data.map((datum, index) => {
        const x = (xScale(datum.label) ?? 0) + (xScale.bandwidth() - boxWidth) / 2;
        const color = resolveSeriesColor(colors, index);
        return (
          <Group key={datum.label} top={0} left={x}>
            <BoxPlot
              min={datum.min}
              max={datum.max}
              median={datum.median}
              firstQuartile={datum.firstQuartile}
              thirdQuartile={datum.thirdQuartile}
              valueScale={yScale}
              boxWidth={boxWidth}
              fill={color}
              fillOpacity={0.4}
              stroke={color}
              className="z-box-plot-chart__box"
            />
          </Group>
        );
      })}
      <ChartAxis scale={xScale} position="bottom" top={innerHeight} />
      <ChartAxis
        scale={yScale}
        position="left"
        tickFormat={(value) => formatChartValue(Number(value))}
      />
    </Group>
  );
}

export function BoxPlotChart({
  data,
  height = 320,
  width,
  showGrid = true,
  ariaLabel,
  className,
  loading = false,
}: BoxPlotChartProps) {
  const colors = useChartSeriesColors(data.length);

  return (
    <div className={cx('z-box-plot-chart', className)}>
      <ChartFrame
        data={data as unknown as Record<string, unknown>[]}
        height={height}
        width={width}
        ariaLabel={ariaLabel}
        loading={loading}
      >
        {(dimensions) => (
          <BoxPlotChartSvg
            data={data}
            colors={colors}
            showGrid={showGrid}
            {...dimensions}
          />
        )}
      </ChartFrame>
    </div>
  );
}
