import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RadialBarChart } from './RadialBarChart';

const data = [
  { category: 'A', value: 40 },
  { category: 'B', value: 60 },
  { category: 'C', value: 30 },
];

describe('RadialBarChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <RadialBarChart
          data={data}
          series={[{ key: 'value', label: 'Value' }]}
          labelAccessor={(row) => row.category}
          valueAccessor={(row, key) => Number(row[key])}
          ariaLabel="Radial category values"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Radial category values"]')).toBeTruthy();
  });
});
