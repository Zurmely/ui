import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Timeline, TimelineItem } from './Timeline';

describe('Timeline', () => {
  it('renders timeline items', () => {
    renderWithTheme(
      <Timeline>
        <TimelineItem title="Started" date="Jan 1" description="Project kickoff" />
        <TimelineItem title="Shipped" date="Mar 1" description="Version 1.0" />
      </Timeline>,
    );

    expect(screen.getByText('Started')).toBeInTheDocument();
    expect(screen.getByText('Project kickoff')).toBeInTheDocument();
    expect(screen.getByText('Shipped')).toBeInTheDocument();
  });

  it('applies orientation and classes', () => {
    const { container } = renderWithTheme(
      <Timeline orientation="horizontal">
        <TimelineItem title="Step one" />
      </Timeline>,
    );

    expect(container.querySelector('.z-timeline')).toHaveAttribute('data-orientation', 'horizontal');
    expect(container.querySelector('.z-timeline__item')).toBeInTheDocument();
    expect(container.querySelector('.z-timeline__dot')).toBeInTheDocument();
  });

  it('supports custom children content', () => {
    renderWithTheme(
      <Timeline>
        <TimelineItem title="Custom">
          <p>Extra content</p>
        </TimelineItem>
      </Timeline>,
    );

    expect(screen.getByText('Extra content')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Timeline aria-label="Release history">
        <TimelineItem title="Alpha" date="Q1" description="Internal preview" />
        <TimelineItem title="Beta" date="Q2" description="Public beta" />
      </Timeline>,
    );
    await checkA11y(container);
  });
});
