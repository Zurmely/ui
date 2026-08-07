import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BarChart } from './BarChart';

const data = [
  { month: 'Jan', revenue: 120, costs: 80 },
  { month: 'Feb', revenue: 180, costs: 90 },
  { month: 'Mar', revenue: 150, costs: 85 },
];

describe('BarChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <BarChart
          data={data}
          series={[
            { key: 'revenue', label: 'Revenue' },
            { key: 'costs', label: 'Costs' },
          ]}
          xAccessor={(row) => row.month}
          yAccessor={(row, key) => Number(row[key])}
          ariaLabel="Monthly revenue bars"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Monthly revenue bars"]')).toBeTruthy();
  });
});
