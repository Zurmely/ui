import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThresholdChart } from './ThresholdChart';

const data = [
  { month: 'Jan', value: 80 },
  { month: 'Feb', value: 120 },
  { month: 'Mar', value: 95 },
];

describe('ThresholdChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <ThresholdChart
          data={data}
          xAccessor={(row) => row.month}
          yAccessor={(row) => row.value}
          threshold={100}
          ariaLabel="Value threshold"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Value threshold"]')).toBeTruthy();
  });
});
