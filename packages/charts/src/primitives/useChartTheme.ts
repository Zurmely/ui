import { useEffect, useState } from 'react';
import { CHART_SERIES_COUNT } from '../shared/constants';

function readCssVar(name: string, element?: HTMLElement | null): string {
  const target = element ?? document.documentElement;
  return getComputedStyle(target).getPropertyValue(name).trim();
}

export function useChartSeriesColors(count = CHART_SERIES_COUNT): string[] {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const read = () => {
      const next: string[] = [];
      for (let index = 1; index <= count; index += 1) {
        next.push(readCssVar(`--z-color-chart-series-${index}`));
      }
      setColors(next);
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-contrast'],
    });
    return () => observer.disconnect();
  }, [count]);

  return colors;
}

export function useChartSeriesSubtleColors(count = CHART_SERIES_COUNT): string[] {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const read = () => {
      const next: string[] = [];
      for (let index = 1; index <= count; index += 1) {
        next.push(readCssVar(`--z-color-chart-series-${index}-subtle`));
      }
      setColors(next);
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-contrast'],
    });
    return () => observer.disconnect();
  }, [count]);

  return colors;
}

export interface ChartTheme {
  grid: string;
  axis: string;
  axisLabel: string;
  reference: string;
  muted: string;
  positive: string;
  negative: string;
}

export function useChartTheme(): ChartTheme {
  const [theme, setTheme] = useState<ChartTheme>({
    grid: '',
    axis: '',
    axisLabel: '',
    reference: '',
    muted: '',
    positive: '',
    negative: '',
  });

  useEffect(() => {
    const read = () => {
      setTheme({
        grid: readCssVar('--z-color-chart-grid'),
        axis: readCssVar('--z-color-chart-axis'),
        axisLabel: readCssVar('--z-color-chart-axis-label'),
        reference: readCssVar('--z-color-chart-reference'),
        muted: readCssVar('--z-color-chart-muted'),
        positive: readCssVar('--z-color-chart-positive'),
        negative: readCssVar('--z-color-chart-negative'),
      });
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-contrast'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

export function resolveSeriesColor(
  colors: string[],
  index: number,
  override?: string,
): string {
  if (override) return override;
  return colors[index % colors.length] ?? '';
}
