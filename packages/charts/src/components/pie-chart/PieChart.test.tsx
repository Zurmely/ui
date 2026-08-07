import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieChart } from './PieChart';

const data = [
  { label: 'A', value: 30 },
  { label: 'B', value: 50 },
  { label: 'C', value: 20 },
];

describe('PieChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <PieChart
          data={data}
          labelAccessor={(row) => row.label}
          valueAccessor={(row) => row.value}
          ariaLabel="Category distribution"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Category distribution"]')).toBeTruthy();
  });
});
