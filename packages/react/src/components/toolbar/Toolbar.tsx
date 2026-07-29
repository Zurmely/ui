import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import type { Badge } from '../badge/Badge';
import type { Button } from '../button/Button';
import type { Filter } from '../filter/Filter';
import type { IconButton } from '../icon-button/IconButton';
import type { Select } from '../select/Select';
import type { Separator } from '../separator/Separator';
import type { TextField } from '../text-field/TextField';
import { cx, type SlotOf, validateSlot } from '../../shared';
import './toolbar.css';

const TOOLBAR_ITEMS = [
  'Button',
  'IconButton',
  'Separator',
  'Filter',
  'TextField',
  'Select',
  'Badge',
] as const;

type ToolbarItemSlot =
  | SlotOf<typeof Button>
  | SlotOf<typeof IconButton>
  | SlotOf<typeof Separator>
  | SlotOf<typeof Filter>
  | SlotOf<typeof TextField>
  | SlotOf<typeof Select>
  | SlotOf<typeof Badge>;

export type ToolbarOrientation = 'horizontal' | 'vertical';

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  orientation?: ToolbarOrientation;
  leading?: ToolbarItemSlot | ToolbarItemSlot[];
  trailing?: ToolbarItemSlot | ToolbarItemSlot[];
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled'));
}

function syncTabIndex(container: HTMLElement, activeElement: HTMLElement | undefined): void {
  const focusable = getFocusableElements(container);

  focusable.forEach((element) => {
    element.tabIndex = element === activeElement ? 0 : -1;
  });
}

function validateToolbarRegion(
  node: ReactNode,
  slot: 'leading' | 'children' | 'trailing',
): void {
  validateSlot(node, {
    component: 'Toolbar',
    slot,
    allowed: TOOLBAR_ITEMS,
  });
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  {
    label,
    orientation = 'horizontal',
    leading,
    trailing,
    className,
    children,
    onKeyDown,
    onFocus,
    ...props
  },
  ref,
) {
  const internalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

  validateToolbarRegion(leading, 'leading');
  validateToolbarRegion(children, 'children');
  validateToolbarRegion(trailing, 'trailing');

  const seedTabIndex = useCallback(() => {
    const container = internalRef.current;
    if (!container) {
      return;
    }

    const focusable = getFocusableElements(container);
    focusable.forEach((element, index) => {
      element.tabIndex = index === 0 ? 0 : -1;
    });
  }, []);

  useEffect(() => {
    seedTabIndex();
  }, [leading, children, trailing, seedTabIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) {
      return;
    }

    const focusable = getFocusableElements(event.currentTarget);
    const currentIndex = focusable.findIndex((node) => node === document.activeElement);
    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;
    const isHorizontal = orientation === 'horizontal';

    if (
      (isHorizontal && event.key === 'ArrowRight') ||
      (!isHorizontal && event.key === 'ArrowDown')
    ) {
      nextIndex = (currentIndex + 1) % focusable.length;
    } else if (
      (isHorizontal && event.key === 'ArrowLeft') ||
      (!isHorizontal && event.key === 'ArrowUp')
    ) {
      nextIndex = (currentIndex - 1 + focusable.length) % focusable.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = focusable.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextElement = focusable[nextIndex];
    nextElement?.focus();
    syncTabIndex(event.currentTarget, nextElement);
  };

  return (
    <div
      ref={internalRef}
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
      className={cx('z-toolbar', className)}
      data-orientation={orientation}
      {...props}
      onKeyDownCapture={handleKeyDown}
      onFocus={(event) => {
        onFocus?.(event);
        if (event.target !== event.currentTarget) {
          syncTabIndex(event.currentTarget, event.target as HTMLElement);
        }
      }}
    >
      {leading ? <div className="z-toolbar__leading">{leading}</div> : null}
      {children ? <div className="z-toolbar__content">{children}</div> : null}
      {trailing ? <div className="z-toolbar__trailing">{trailing}</div> : null}
    </div>
  );
});

Toolbar.displayName = 'Toolbar';

export type { ToolbarItemSlot };
