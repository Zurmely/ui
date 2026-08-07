import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NetworkChart } from './NetworkChart';

const nodes = [
  { id: 'a', label: 'Alpha', x: 0.2, y: 0.3 },
  { id: 'b', label: 'Beta', x: 0.7, y: 0.6 },
];

const links = [{ source: 'a', target: 'b' }];

describe('NetworkChart', () => {
  it('renders with accessible label', () => {
    const { container } = render(
      <div data-theme="light">
        <NetworkChart nodes={nodes} links={links} ariaLabel="Network graph" width={400} />
      </div>,
    );

    expect(container.querySelector('[aria-label="Network graph"]')).toBeTruthy();
  });
});
