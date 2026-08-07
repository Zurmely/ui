import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BoxPlotChart } from './BoxPlotChart';

const data = [
  { label: 'A', min: 10, max: 90, median: 50, firstQuartile: 30, thirdQuartile: 70 },
  { label: 'B', min: 20, max: 80, median: 45, firstQuartile: 35, thirdQuartile: 60 },
];

describe('BoxPlotChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <BoxPlotChart
          data={data}
          ariaLabel="Distribution box plots"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Distribution box plots"]')).toBeTruthy();
  });
});
