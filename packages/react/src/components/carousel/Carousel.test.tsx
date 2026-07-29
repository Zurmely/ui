import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';

describe('Carousel', () => {
  it('renders carousel region with slides', () => {
    renderWithTheme(
      <Carousel aria-label="Featured items">
        <CarouselContent>
          <CarouselItem>Slide one</CarouselItem>
          <CarouselItem>Slide two</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    expect(screen.getByRole('region', { name: 'Featured items' })).toHaveAttribute(
      'aria-roledescription',
      'carousel',
    );
    expect(screen.getAllByRole('group')).toHaveLength(2);
    expect(screen.getByText('Slide one')).toBeInTheDocument();
  });

  it('applies z-carousel classes and orientation', () => {
    renderWithTheme(
      <Carousel orientation="vertical" aria-label="Updates">
        <CarouselContent>
          <CarouselItem>Item</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    expect(screen.getByRole('region')).toHaveClass('z-carousel');
    expect(screen.getByRole('region')).toHaveAttribute('data-orientation', 'vertical');
    expect(screen.getByRole('group')).toHaveClass('z-carousel__item');
  });

  it('renders navigation controls with accessible labels', () => {
    renderWithTheme(
      <Carousel aria-label="Gallery">
        <CarouselPrevious />
        <CarouselContent>
          <CarouselItem>Photo</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );

    expect(screen.getByRole('button', { name: 'Previous slide' })).toHaveClass(
      'z-carousel__control',
      'z-focus-ring',
    );
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
  });

  it('scrolls with keyboard navigation', async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();

    const { container } = renderWithTheme(
      <Carousel aria-label="Gallery">
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const content = container.querySelector('.z-carousel__content');
    if (!content) {
      throw new Error('Carousel content not found');
    }

    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollLeft', { value: 0, writable: true, configurable: true });
    content.scrollTo = scrollTo;

    await user.click(content);
    await user.keyboard('{ArrowRight}');
    expect(scrollTo).toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Carousel aria-label="Featured">
        <CarouselPrevious />
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );
    await checkA11y(container);
  });
});
