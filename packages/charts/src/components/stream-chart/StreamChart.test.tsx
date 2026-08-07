import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StreamChart } from './StreamChart';

const data = [
  { month: 'Jan', a: 10, b: 20, c: 15 },
  { month: 'Feb', a: 15, b: 25, c: 18 },
  { month: 'Mar', a: 12, b: 22, c: 20 },
];

describe('StreamChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <StreamChart
          data={data}
          series={[
            { key: 'a', label: 'A' },
            { key: 'b', label: 'B' },
            { key: 'c', label: 'C' },
          ]}
          xAccessor={(row) => row.month}
          yAccessor={(row, key) => Number(row[key])}
          ariaLabel="Monthly stream"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Monthly stream"]')).toBeTruthy();
  });
});
