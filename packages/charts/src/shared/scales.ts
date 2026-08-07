import { useMemo } from 'react';
import { max, min } from '@visx/vendor/d3-array';
import { scaleBand, scaleLinear, scalePoint, scaleTime } from '@visx/scale';
import type { ChartSeries } from './types';

export function isDateLike(value: unknown): value is Date | string | number {
  if (value instanceof Date) return true;
  if (typeof value === 'string' && !Number.isNaN(Date.parse(value))) return true;
  return false;
}

export function getNumericDomain<T extends Record<string, unknown>>(
  data: T[],
  series: ChartSeries[],
  yAccessor: (row: T, key: string) => number,
): [number, number] {
  const values = data.flatMap((row) =>
    series.map((item) => yAccessor(row, item.key)).filter((value) => Number.isFinite(value)),
  );
  const minValue = min(values) ?? 0;
  const maxValue = max(values) ?? 0;
  return minValue === maxValue ? [0, maxValue || 1] : [minValue, maxValue];
}

export function useBandXScale<T extends Record<string, unknown>>(
  data: T[],
  xAccessor: (row: T) => string | number | Date,
  innerWidth: number,
) {
  return useMemo(() => {
    const domain = data.map((row) => String(xAccessor(row)));
    return scaleBand<string>({
      domain,
      range: [0, innerWidth],
      padding: 0.3,
    });
  }, [data, innerWidth, xAccessor]);
}

export function usePointXScale<T extends Record<string, unknown>>(
  data: T[],
  xAccessor: (row: T) => string | number | Date,
  innerWidth: number,
) {
  return useMemo(() => {
    const domain = data.map((row) => String(xAccessor(row)));
    return scalePoint<string>({
      domain,
      range: [0, innerWidth],
      padding: 0.5,
    });
  }, [data, innerWidth, xAccessor]);
}

export function useTimeXScale<T extends Record<string, unknown>>(
  data: T[],
  xAccessor: (row: T) => string | number | Date,
  innerWidth: number,
) {
  return useMemo(() => {
    const dates = data.map((row) => new Date(xAccessor(row)));
    return scaleTime({
      domain: [min(dates) ?? new Date(), max(dates) ?? new Date()],
      range: [0, innerWidth],
    });
  }, [data, innerWidth, xAccessor]);
}

export function useLinearYScale(domain: [number, number], innerHeight: number) {
  return useMemo(
    () =>
      scaleLinear({
        domain,
        range: [innerHeight, 0],
        nice: true,
      }),
    [domain, innerHeight],
  );
}
