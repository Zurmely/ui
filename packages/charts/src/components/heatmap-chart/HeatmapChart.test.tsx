import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeatmapChart } from './HeatmapChart';

const data = [
  { bin: 0, bins: [{ bin: 0, count: 1 }, { bin: 1, count: 3 }] },
  { bin: 1, bins: [{ bin: 0, count: 2 }, { bin: 1, count: 5 }] },
];

describe('HeatmapChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <HeatmapChart
          data={data}
          ariaLabel="Activity heatmap"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Activity heatmap"]')).toBeTruthy();
  });
});
