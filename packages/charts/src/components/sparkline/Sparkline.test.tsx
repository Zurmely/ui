import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Sparkline } from './Sparkline';

const data = [
  { day: '1', value: 10 },
  { day: '2', value: 25 },
  { day: '3', value: 18 },
];

describe('Sparkline', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <Sparkline
          data={data}
          series={[{ key: 'value', label: 'Value' }]}
          xAccessor={(row) => row.day}
          yAccessor={(row, key) => Number(row[key])}
          ariaLabel="Daily trend"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Daily trend"]')).toBeTruthy();
  });
});
