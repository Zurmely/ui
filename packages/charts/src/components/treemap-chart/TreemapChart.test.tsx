import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TreemapChart } from './TreemapChart';

const data = {
  name: 'root',
  children: [
    { name: 'A', value: 40 },
    { name: 'B', value: 30 },
    { name: 'C', value: 30 },
  ],
};

describe('TreemapChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <TreemapChart
          data={data}
          ariaLabel="Category treemap"
          width={400}
        />
      </div>,
    );

    expect(container.querySelector('[aria-label="Category treemap"]')).toBeTruthy();
  });
});
