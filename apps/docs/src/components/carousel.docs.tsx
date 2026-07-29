import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const carouselDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'carousel',
  name: 'Carousel',
  category: 'Data',
  summary: 'Scrollable content with previous and next controls.',
  importPath: '@z-ui/react/carousel',
  componentName: 'Carousel',
  controls: {
    orientation: {
      type: 'select',
      label: 'orientation',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
  },
  render: (props) => (
    <Carousel
      orientation={props.orientation as 'horizontal' | 'vertical'}
      style={{ width: '100%', maxWidth: '20rem' }}
    >
      <CarouselContent>
        {[1, 2, 3].map((n) => (
          <CarouselItem key={n}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '8rem',
                background: 'var(--z-color-background-muted)',
                borderRadius: 'var(--z-radius-surface)',
              }}
            >
              Slide {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  code: (props) => `<Carousel orientation="${props.orientation}">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<carousel />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, orientation: 'vertical' }) : '<carousel />',
      render: () => doc.render({ ...defaults, orientation: 'vertical' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<carousel />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
