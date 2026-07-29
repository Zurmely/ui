import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './drawer.css';

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export const DrawerClose = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(function DrawerClose({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      className={cx('z-drawer__close', 'z-focus-ring', className)}
      {...props}
    />
  );
});
DrawerClose.displayName = 'DrawerClose';

export interface DrawerContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: DrawerSide;
}

export const DrawerContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(function DrawerContent({ className, children, side = 'right', ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="z-drawer__overlay" />
      <DialogPrimitive.Content
        ref={ref}
        className={cx('z-drawer__content', className)}
        data-side={side}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
DrawerContent.displayName = 'DrawerContent';

export const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DrawerHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cx('z-drawer__header', className)} {...props} />;
  },
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DrawerTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title ref={ref} className={cx('z-drawer__title', className)} {...props} />
  );
});
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DrawerDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cx('z-drawer__description', className)}
      {...props}
    />
  );
});
DrawerDescription.displayName = 'DrawerDescription';

export const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DrawerFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cx('z-drawer__footer', className)} {...props} />;
  },
);
DrawerFooter.displayName = 'DrawerFooter';
