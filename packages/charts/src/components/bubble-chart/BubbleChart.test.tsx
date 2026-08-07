import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BubbleChart } from './BubbleChart';

const data = [
  { x: 10, y: 20, size: 5 },
  { x: 30, y: 45, size: 15 },
  { x: 50, y: 35, size: 10 },
];

describe('BubbleChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <BubbleChart
          data={data}
          xAccessor={(row) => row.x}
          yAccessor={(row) => row.y}
          sizeAccessor={(row) => row.size}
          ariaLabel="Bubble correlation"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Bubble correlation"]')).toBeTruthy();
  });
});
