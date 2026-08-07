import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScatterChart } from './ScatterChart';

const data = [
  { x: 10, y: 20 },
  { x: 30, y: 45 },
  { x: 50, y: 35 },
];

describe('ScatterChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <ScatterChart
          data={data}
          xAccessor={(row) => row.x}
          yAccessor={(row) => row.y}
          ariaLabel="Value correlation"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Value correlation"]')).toBeTruthy();
  });
});
