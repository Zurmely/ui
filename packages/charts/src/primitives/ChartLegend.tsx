import { cx } from '../shared/cx';
import { resolveSeriesColor, useChartSeriesColors } from './useChartTheme';
import '../primitives/chart.css';

export interface ChartLegendItem {
  key: string;
  label: string;
  color?: string;
}

export interface ChartLegendProps {
  items: ChartLegendItem[];
  hiddenKeys?: Set<string>;
  onToggle?: (key: string) => void;
  className?: string;
}

export function ChartLegend({ items, hiddenKeys, onToggle, className }: ChartLegendProps) {
  const colors = useChartSeriesColors(items.length);

  if (items.length === 0) return null;

  return (
    <ul className={cx('z-chart-legend', className)} role="list">
      {items.map((item, index) => {
        const color = resolveSeriesColor(colors, index, item.color);
        const hidden = hiddenKeys?.has(item.key) ?? false;
        const interactive = Boolean(onToggle);

        return (
          <li key={item.key}>
            <button
              type="button"
              className={cx(
                'z-chart-legend__item',
                hidden && 'z-chart-legend__item--hidden',
                !interactive && 'z-chart-legend__item--static',
              )}
              onClick={onToggle ? () => onToggle(item.key) : undefined}
              aria-pressed={interactive ? !hidden : undefined}
              disabled={!interactive}
            >
              <span
                className="z-chart-legend__swatch"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              <span className="z-chart-legend__label">{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
