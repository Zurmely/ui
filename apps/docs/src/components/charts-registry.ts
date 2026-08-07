import type { AnyComponentDoc } from '../playground/types';
import { areaChartDoc } from './area-chart.docs';
import { barChartDoc } from './bar-chart.docs';
import { boxPlotChartDoc } from './box-plot-chart.docs';
import { bubbleChartDoc } from './bubble-chart.docs';
import { candlestickChartDoc } from './candlestick-chart.docs';
import { funnelChartDoc } from './funnel-chart.docs';
import { heatmapChartDoc } from './heatmap-chart.docs';
import { histogramChartDoc } from './histogram-chart.docs';
import { lineChartDoc } from './line-chart.docs';
import { networkChartDoc } from './network-chart.docs';
import { pieChartDoc } from './pie-chart.docs';
import { radialBarChartDoc } from './radial-bar-chart.docs';
import { scatterChartDoc } from './scatter-chart.docs';
import { sparklineDoc } from './sparkline.docs';
import { streamChartDoc } from './stream-chart.docs';
import { thresholdChartDoc } from './threshold-chart.docs';
import { treemapChartDoc } from './treemap-chart.docs';
import { waterfallChartDoc } from './waterfall-chart.docs';

export const chartDocs: AnyComponentDoc[] = [
  lineChartDoc,
  areaChartDoc,
  barChartDoc,
  pieChartDoc,
  scatterChartDoc,
  sparklineDoc,
  heatmapChartDoc,
  treemapChartDoc,
  boxPlotChartDoc,
  histogramChartDoc,
  radialBarChartDoc,
  bubbleChartDoc,
  streamChartDoc,
  thresholdChartDoc,
  networkChartDoc,
  candlestickChartDoc,
  funnelChartDoc,
  waterfallChartDoc,
];

export const CHARTS_GALLERY_PATH = '/components/charts';
