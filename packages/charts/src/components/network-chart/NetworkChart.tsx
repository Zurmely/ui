import { useMemo } from 'react';
import { Graph } from '@visx/network';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { localPoint } from '@visx/event';
import { ChartFrame } from '../../primitives/ChartFrame';
import { ChartLegend } from '../../primitives/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../primitives/ChartTooltip';
import { resolveSeriesColor, useChartSeriesColors } from '../../primitives/useChartTheme';
import { useChartTooltipState } from '../../shared/useChartTooltip';
import { cx } from '../../shared/cx';
import type { ChartMargin } from '../../shared/types';
import './network-chart.css';

export interface NetworkChartNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color?: string;
}

export interface NetworkChartLink {
  source: string;
  target: string;
}

export interface NetworkChartProps {
  nodes: NetworkChartNode[];
  links: NetworkChartLink[];
  height?: number;
  width?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  ariaLabel: string;
  className?: string;
  loading?: boolean;
}

interface PositionedNode extends Omit<NetworkChartNode, 'color'> {
  scaledX: number;
  scaledY: number;
  color: string;
}

interface NetworkLinkProps {
  link: { source: PositionedNode; target: PositionedNode };
}

interface NetworkNodeProps {
  node: PositionedNode;
}

interface NetworkChartSvgProps {
  nodes: NetworkChartNode[];
  links: NetworkChartLink[];
  colors: string[];
  innerWidth: number;
  innerHeight: number;
  margin: ChartMargin;
  showTooltip: boolean;
  onShowTooltip: (top: number, left: number, rows: { label: string; value: string; color?: string }[]) => void;
  onHideTooltip: () => void;
}

function NetworkChartSvg({
  nodes,
  links,
  colors,
  innerWidth,
  innerHeight,
  margin,
  showTooltip,
  onShowTooltip,
  onHideTooltip,
}: NetworkChartSvgProps) {
  const positionedNodes = useMemo<PositionedNode[]>(() => {
    const xScale = scaleLinear({ domain: [0, 1], range: [0, innerWidth] });
    const yScale = scaleLinear({ domain: [0, 1], range: [0, innerHeight] });

    return nodes.map((node, index) => ({
      ...node,
      scaledX: xScale(node.x),
      scaledY: yScale(node.y),
      color: resolveSeriesColor(colors, index, node.color),
    }));
  }, [colors, innerHeight, innerWidth, nodes]);

  const graph = useMemo(() => {
    const nodeById = new Map(positionedNodes.map((node) => [node.id, node]));
    const resolvedLinks: { source: PositionedNode; target: PositionedNode }[] = [];

    links.forEach((link) => {
      const source = nodeById.get(link.source);
      const target = nodeById.get(link.target);
      if (source && target) {
        resolvedLinks.push({ source, target });
      }
    });

    return { nodes: positionedNodes, links: resolvedLinks };
  }, [links, positionedNodes]);

  const linkComponent = ({ link }: NetworkLinkProps) => (
    <line
      x1={link.source.scaledX}
      y1={link.source.scaledY}
      x2={link.target.scaledX}
      y2={link.target.scaledY}
      className="z-network-chart__link"
    />
  );

  const nodeComponent = ({ node }: NetworkNodeProps) => (
    <g
      className="z-network-chart__node"
      transform={`translate(${node.scaledX}, ${node.scaledY})`}
      onMouseMove={
        showTooltip
          ? (event) => {
              const point = localPoint(event);
              if (!point) return;
              onShowTooltip(point.y + margin.top, point.x + margin.left, [
                { label: node.label, value: node.id, color: node.color },
              ]);
            }
          : undefined
      }
      onMouseLeave={showTooltip ? onHideTooltip : undefined}
    >
      <circle r={8} className="z-network-chart__node-circle" fill={node.color} />
      <text y={20} textAnchor="middle" className="z-network-chart__node-label">
        {node.label}
      </text>
    </g>
  );

  return (
    <Group top={margin.top} left={margin.left}>
      <Graph graph={graph} linkComponent={linkComponent} nodeComponent={nodeComponent} />
    </Group>
  );
}

export function NetworkChart({
  nodes,
  links,
  height = 320,
  width,
  showLegend = true,
  showTooltip = true,
  ariaLabel,
  className,
  loading = false,
}: NetworkChartProps) {
  const colors = useChartSeriesColors(nodes.length);
  const { tooltip, showTooltip: openTooltip, hideTooltip } = useChartTooltipState();
  const legendItems = nodes.map((node) => ({ key: node.id, label: node.label, color: node.color }));

  return (
    <div className={cx('z-network-chart', className)}>
      <ChartFrame
        data={nodes as Array<NetworkChartNode & Record<string, unknown>>}
        height={height}
        width={width}
        ariaLabel={ariaLabel}
        loading={loading}
      >
        {(dimensions) => (
          <NetworkChartSvg
            nodes={nodes}
            links={links}
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
