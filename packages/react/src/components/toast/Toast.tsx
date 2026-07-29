import * as ToastPrimitive from '@radix-ui/react-toast';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './toast.css';

export const ToastProvider = ToastPrimitive.Provider;

export const Toast = forwardRef<
  ElementRef<typeof ToastPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(function Toast({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Root ref={ref} className={cx('z-toast', className)} {...props} />
  );
});
Toast.displayName = 'Toast';

export const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cx('z-toast__viewport', className)}
      {...props}
    />
  );
});
ToastViewport.displayName = 'ToastViewport';

export const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitive.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(function ToastTitle({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Title ref={ref} className={cx('z-toast__title', className)} {...props} />
  );
});
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitive.Description>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cx('z-toast__description', className)}
      {...props}
    />
  );
});
ToastDescription.displayName = 'ToastDescription';

export const ToastAction = forwardRef<
  ElementRef<typeof ToastPrimitive.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(function ToastAction({ className, altText, ...props }, ref) {
  return (
    <ToastPrimitive.Action
      ref={ref}
      className={cx('z-toast__action', 'z-focus-ring', className)}
      altText={altText}
      {...props}
    />
  );
});
ToastAction.displayName = 'ToastAction';

export const ToastClose = forwardRef<
  ElementRef<typeof ToastPrimitive.Close>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(function ToastClose({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      className={cx('z-toast__close', 'z-focus-ring', className)}
      aria-label="Dismiss"
      {...props}
    />
  );
});
ToastClose.displayName = 'ToastClose';
