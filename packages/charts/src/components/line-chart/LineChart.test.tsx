import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LineChart } from './LineChart';

const data = [
  { month: 'Jan', revenue: 120 },
  { month: 'Feb', revenue: 180 },
  { month: 'Mar', revenue: 150 },
];

describe('LineChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <LineChart
          data={data}
          series={[{ key: 'revenue', label: 'Revenue' }]}
          xAccessor={(row) => row.month}
          yAccessor={(row, key) => Number(row[key])}
          ariaLabel="Monthly revenue"
          width={400}
          responsive={false}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Monthly revenue"]')).toBeTruthy();
  });
});
