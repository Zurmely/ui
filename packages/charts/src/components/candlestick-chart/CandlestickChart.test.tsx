import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CandlestickChart } from './CandlestickChart';

const data = [
  { date: '2024-01-01', open: 100, high: 110, low: 95, close: 105 },
  { date: '2024-01-02', open: 105, high: 108, low: 98, close: 99 },
];

describe('CandlestickChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <CandlestickChart
          data={data}
          xAccessor={(row) => row.date}
          openAccessor={(row) => row.open}
          highAccessor={(row) => row.high}
          lowAccessor={(row) => row.low}
          closeAccessor={(row) => row.close}
          ariaLabel="Price OHLC"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Price OHLC"]')).toBeTruthy();
  });
});
