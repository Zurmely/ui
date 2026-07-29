import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx, prefersReducedMotion } from '../../shared';
import '../../shared/focus-ring.css';
import './carousel.css';

export type CarouselOrientation = 'horizontal' | 'vertical';

interface CarouselContextValue {
  contentRef: React.RefObject<HTMLDivElement | null>;
  orientation: CarouselOrientation;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel compound components must be used within Carousel.');
  }
  return context;
}

function getScrollAxis(orientation: CarouselOrientation) {
  return orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop';
}

function getClientAxis(orientation: CarouselOrientation) {
  return orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: CarouselOrientation;
  'aria-label'?: string;
  children: ReactNode;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  { orientation = 'horizontal', className, children, 'aria-label': ariaLabel, ...props },
  ref,
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }

    const scrollPosition = node[getScrollAxis(orientation)] as number;
    const maxScroll =
      (orientation === 'horizontal' ? node.scrollWidth : node.scrollHeight) -
      node[getClientAxis(orientation)];

    setCanScrollPrev(scrollPosition > 1);
    setCanScrollNext(scrollPosition < maxScroll - 1);
  }, [orientation]);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }

    updateScrollState();
    node.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      node.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByPage = useCallback(
    (direction: -1 | 1) => {
      const node = contentRef.current;
      if (!node) {
        return;
      }

      const distance = node[getClientAxis(orientation)] * direction;
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
      const scrollOptions: ScrollToOptions =
        orientation === 'horizontal'
          ? { left: node.scrollLeft + distance, behavior }
          : { top: node.scrollTop + distance, behavior };

      node.scrollTo(scrollOptions);
    },
    [orientation],
  );

  const scrollPrev = useCallback(() => scrollByPage(-1), [scrollByPage]);
  const scrollNext = useCallback(() => scrollByPage(1), [scrollByPage]);

  return (
    <CarouselContext.Provider
      value={{ contentRef, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={cx('z-carousel', className)}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = 'Carousel';

export interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  function CarouselContent({ className, children, onKeyDown, ...props }, ref) {
    const { contentRef, orientation, scrollPrev, scrollNext } = useCarouselContext();

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    };

    return (
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        tabIndex={0}
        className={cx('z-carousel__content', className)}
        data-orientation={orientation}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div className="z-carousel__viewport">{children}</div>
      </div>
    );
  },
);
CarouselContent.displayName = 'CarouselContent';

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(
  { className, children, ...props },
  ref,
) {
  const { orientation } = useCarouselContext();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cx('z-carousel__item', className)}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  );
});
CarouselItem.displayName = 'CarouselItem';

export interface CarouselPreviousProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  function CarouselPrevious({ className, children, ...props }, ref) {
    const { scrollPrev, canScrollPrev } = useCarouselContext();

    return (
      <button
        ref={ref}
        type="button"
        className={cx('z-carousel__control', 'z-carousel__control--previous', 'z-focus-ring', className)}
        aria-label={props['aria-label'] ?? 'Previous slide'}
        disabled={!canScrollPrev || props.disabled}
        data-disabled={!canScrollPrev ? 'true' : undefined}
        onClick={(event) => {
          props.onClick?.(event);
          if (!event.defaultPrevented) {
            scrollPrev();
          }
        }}
        {...props}
      >
        <span className="z-carousel__control-icon" aria-hidden="true">
          {children ?? '‹'}
        </span>
      </button>
    );
  },
);
CarouselPrevious.displayName = 'CarouselPrevious';

export interface CarouselNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(function CarouselNext(
  { className, children, ...props },
  ref,
) {
  const { scrollNext, canScrollNext } = useCarouselContext();

  return (
    <button
      ref={ref}
      type="button"
      className={cx('z-carousel__control', 'z-carousel__control--next', 'z-focus-ring', className)}
      aria-label={props['aria-label'] ?? 'Next slide'}
      disabled={!canScrollNext || props.disabled}
      data-disabled={!canScrollNext ? 'true' : undefined}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          scrollNext();
        }
      }}
      {...props}
    >
      <span className="z-carousel__control-icon" aria-hidden="true">
        {children ?? '›'}
      </span>
    </button>
  );
});
CarouselNext.displayName = 'CarouselNext';
