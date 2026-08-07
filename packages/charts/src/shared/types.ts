export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartSeries {
  key: string;
  label: string;
  color?: string;
}

export interface ChartSize {
  width?: number;
  height?: number;
}

export type ChartOrientation = 'vertical' | 'horizontal';

export type BarChartVariant = 'grouped' | 'stacked';

export interface ChartDataRow {
  [key: string]: string | number | Date | null | undefined;
}

export interface TooltipDatum {
  label: string;
  value: string;
  color?: string;
}
