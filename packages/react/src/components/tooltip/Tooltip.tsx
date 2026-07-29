import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './tooltip.css';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = forwardRef<
  ElementRef<typeof TooltipPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(function TooltipTrigger({ className, ...props }, ref) {
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      className={cx('z-tooltip__trigger', 'z-focus-ring', className)}
      {...props}
    />
  );
});
TooltipTrigger.displayName = 'TooltipTrigger';

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cx('z-tooltip__content', className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = 'TooltipContent';
