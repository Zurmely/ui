import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './megamenu.css';

export const Megamenu = PopoverPrimitive.Root;

export const MegamenuTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(function MegamenuTrigger({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      className={cx('z-megamenu__trigger', 'z-focus-ring', className)}
      {...props}
    />
  );
});
MegamenuTrigger.displayName = 'MegamenuTrigger';

export const MegamenuContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(function MegamenuContent({ className, align = 'start', sideOffset = 8, ...props }, ref) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cx('z-megamenu__content', className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
MegamenuContent.displayName = 'MegamenuContent';

export interface MegamenuItemProps extends ComponentPropsWithoutRef<'a'> {
  selected?: boolean;
}

export const MegamenuItem = forwardRef<HTMLAnchorElement, MegamenuItemProps>(function MegamenuItem(
  { className, selected, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx('z-megamenu__item', 'z-focus-ring', className)}
      data-selected={selected ? 'true' : undefined}
      {...props}
    />
  );
});
MegamenuItem.displayName = 'MegamenuItem';
