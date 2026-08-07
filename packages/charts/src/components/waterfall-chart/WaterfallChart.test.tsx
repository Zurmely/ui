import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WaterfallChart } from './WaterfallChart';

const data = [
  { label: 'Start', value: 100, total: true },
  { label: 'Revenue', value: 50 },
  { label: 'Costs', value: -20 },
  { label: 'End', value: 130, total: true },
];

describe('WaterfallChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <WaterfallChart
          data={data}
          labelAccessor={(row) => row.label}
          valueAccessor={(row) => row.value}
          isTotalAccessor={(row) => Boolean(row.total)}
          ariaLabel="Profit waterfall"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Profit waterfall"]')).toBeTruthy();
  });
});
