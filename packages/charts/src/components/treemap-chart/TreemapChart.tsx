import { useMemo } from 'react';
import { Group } from '@visx/group';
import { Treemap, hierarchy } from '@visx/hierarchy';
import { ChartFrame } from '../../primitives/ChartFrame';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './treemap-chart.css';

export interface TreemapNode {
  name: string;
  value?: number;
  children?: TreemapNode[];
}

export interface TreemapChartProps {
  data: TreemapNode;
  height?: number;
  width?: number;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface TreemapChartSvgProps {
  root: TreemapNode;
  colors: string[];
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
}

function flattenLeaves(node: TreemapNode): TreemapNode[] {
  if (!node.children || node.children.length === 0) {
    return node.value != null ? [node] : [];
  }
  return node.children.flatMap(flattenLeaves);
}

function TreemapChartSvg({
  root,
  colors,
  innerWidth,
  innerHeight,
  margin,
}: TreemapChartSvgProps) {
  const hierarchyRoot = useMemo(
    () =>
      hierarchy(root)
        .sum((node) => node.value ?? 0)
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
    [root],
  );

  return (
    <Group top={margin.top} left={margin.left}>
      <Treemap
        root={hierarchyRoot}
        size={[innerWidth, innerHeight]}
        paddingInner={2}
        className="z-treemap-chart__node"
      >
        {(treemap) =>
          treemap
            .descendants()
            .filter((node) => node.depth > 0)
            .map((node, index) => {
              const width = node.x1 - node.x0;
              const height = node.y1 - node.y0;
              if (width <= 0 || height <= 0) return null;
              const color = resolveSeriesColor(colors, index);
              return (
                <Group key={node.data.name} top={node.y0} left={node.x0}>
                  <rect
                    width={width}
                    height={height}
                    fill={color}
                    className="z-treemap-chart__cell"
                  />
                  {width > 40 && height > 20 ? (
                    <text
                      x={4}
                      y={14}
                      className="z-treemap-chart__label"
                    >
                      {node.data.name}
                    </text>
                  ) : null}
                </Group>
              );
            })
        }
      </Treemap>
    </Group>
  );
}

export function TreemapChart({
  data,
  height = 320,
  width,
  ariaLabel,
  className,
  loading = false,
}: TreemapChartProps) {
  const colors = useChartSeriesColors(8);
  const tableData = useMemo(
    () =>
      flattenLeaves(data).map((node) => ({
        name: node.name,
        value: node.value ?? 0,
      })),
    [data],
  );

  return (
    <div className={cx('z-treemap-chart', className)}>
      <ChartFrame data={tableData} height={height} width={width} ariaLabel={ariaLabel} loading={loading}>
        {(dimensions) => (
          <TreemapChartSvg root={data} colors={colors} {...dimensions} />
        )}
      </ChartFrame>
    </div>
  );
}
