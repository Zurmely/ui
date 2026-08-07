import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HistogramChart } from './HistogramChart';

const data = [
  { value: 12 },
  { value: 15 },
  { value: 18 },
  { value: 22 },
  { value: 25 },
];

describe('HistogramChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <HistogramChart
          data={data}
          valueAccessor={(row) => row.value}
          ariaLabel="Value distribution"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Value distribution"]')).toBeTruthy();
  });
});
