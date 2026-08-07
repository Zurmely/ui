export function formatChartValue(value: number): string {
  if (Number.isInteger(value)) {
    return value.toLocaleString();
  }
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function toDate(value: string | number | Date): Date {
  return value instanceof Date ? value : new Date(value);
}
