import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FunnelChart } from './FunnelChart';

const data = [
  { stage: 'Visitors', count: 1000 },
  { stage: 'Signups', count: 400 },
  { stage: 'Customers', count: 120 },
];

describe('FunnelChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <FunnelChart
          data={data}
          labelAccessor={(row) => row.stage}
          valueAccessor={(row) => row.count}
          ariaLabel="Conversion funnel"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Conversion funnel"]')).toBeTruthy();
  });
});
