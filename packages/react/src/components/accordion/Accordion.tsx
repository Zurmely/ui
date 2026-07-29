import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './accordion.css';

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return <AccordionPrimitive.Item ref={ref} className={cx('z-accordion__item', className)} {...props} />;
});
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="z-accordion__header">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cx('z-accordion__trigger', 'z-focus-ring', className)}
        {...props}
      >
        {children}
        <span className="z-accordion__icon" aria-hidden="true" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cx('z-accordion__content', className)}
      {...props}
    >
      <div className="z-accordion__content-inner">{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = 'AccordionContent';
