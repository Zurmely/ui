import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './popover.css';

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(function PopoverTrigger({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      className={cx('z-popover__trigger', 'z-focus-ring', className)}
      {...props}
    />
  );
});
PopoverTrigger.displayName = 'PopoverTrigger';

export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(function PopoverContent({ className, align = 'center', sideOffset = 4, ...props }, ref) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cx('z-popover__content', className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = 'PopoverContent';
