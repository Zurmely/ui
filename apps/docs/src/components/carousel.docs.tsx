import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

const slideStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '8rem',
  background: 'var(--z-color-background-muted)',
  borderRadius: 'var(--z-radius-surface)',
} as const;

const slideLabels = ['Free shipping', '2-year warranty', 'Easy returns'];

function CarouselSlides({ count = 3 }: { count?: number }) {
  return (
    <>
      {slideLabels.slice(0, count).map((label) => (
        <CarouselItem key={label}>
          <div style={slideStyle}>{label}</div>
        </CarouselItem>
      ))}
    </>
  );
}

export const carouselDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'carousel',
    name: 'Carousel',
    category: 'Data',
    summary: 'Scrollable content with previous and next controls.',
    importPath: '@z-ux/ui/carousel',
    componentName: 'Carousel',
    controls: {
      orientation: {
        type: 'select',
        label: 'orientation',
        options: ['horizontal', 'vertical'],
        defaultValue: 'horizontal',
      },
      ariaLabel: textControl('aria-label', 'Product highlights'),
    },
    render: (props) => (
      <Carousel
        orientation={props.orientation as 'horizontal' | 'vertical'}
        aria-label={props.ariaLabel as string}
        style={
          props.orientation === 'vertical'
            ? { height: '10rem', width: '100%', maxWidth: '16rem' }
            : { width: '100%', maxWidth: '24rem' }
        }
      >
        <CarouselContent>
          <CarouselSlides />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
    code: (props) => `<Carousel orientation="${props.orientation}" aria-label="${props.ariaLabel}">
  <CarouselContent>
    <CarouselItem>Free shipping</CarouselItem>
    <CarouselItem>2-year warranty</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    whenToUsePreviews: {
      use: () => (
        <Carousel aria-label="Product highlights" style={{ width: '100%', maxWidth: '20rem' }}>
          <CarouselContent>
            <CarouselSlides count={2} />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ),
      doNotUse: () => (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--z-spacing-inline-component)',
            width: '100%',
            maxWidth: '20rem',
          }}
        >
          <div style={slideStyle}>Free shipping</div>
          <div style={slideStyle}>2-year warranty</div>
        </div>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Image gallery',
      description: 'Horizontal carousel for browsing featured images.',
      code: `<Carousel aria-label="Featured images">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      render: () => (
        <Carousel aria-label="Featured images" style={{ width: '100%', maxWidth: '24rem' }}>
          <CarouselContent>
            <CarouselItem>
              <div style={slideStyle}>Slide 1</div>
            </CarouselItem>
            <CarouselItem>
              <div style={slideStyle}>Slide 2</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ),
    },
    {
      label: 'Product highlights',
      description: 'Showcase product features one at a time.',
      code: `<Carousel aria-label="Product highlights">
  <CarouselContent>
    <CarouselItem>Free shipping</CarouselItem>
    <CarouselItem>2-year warranty</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      render: () => (
        <Carousel aria-label="Product highlights" style={{ width: '100%', maxWidth: '24rem' }}>
          <CarouselContent>
            <CarouselSlides count={2} />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ),
    },
    {
      label: 'Vertical stack',
      description: 'Vertical orientation for narrow side panels.',
      code: '<Carousel orientation="vertical" aria-label="Featured items">...</Carousel>',
      render: () => (
        <Carousel
          orientation="vertical"
          aria-label="Featured items"
          style={{ height: '10rem', width: '100%', maxWidth: '16rem' }}
        >
          <CarouselContent>
            <CarouselItem>
              <div style={slideStyle}>First</div>
            </CarouselItem>
            <CarouselItem>
              <div style={slideStyle}>Second</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ),
    },
  ];
  return doc;
})();
