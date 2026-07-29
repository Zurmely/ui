import * as SelectPrimitive from '@radix-ui/react-select';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './select.css';

export type SelectProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

export const Select = function Select({
  disabled: disabledProp,
  required: requiredProp,
  ...props
}: SelectProps) {
  const field = useFieldContext();
  const disabled = disabledProp ?? field?.disabled;
  const required = requiredProp ?? field?.required;

  return (
    <SelectPrimitive.Root disabled={disabled} required={required} {...props} />
  );
};

Select.displayName = 'Select';

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  invalid?: boolean;
}

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(function SelectTrigger(
  { className, invalid: invalidProp, disabled: disabledProp, children, ...props },
  ref,
) {
  const field = useFieldContext();
  const invalid = invalidProp ?? field?.invalid;
  const disabled = disabledProp ?? field?.disabled;

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cx('z-select__trigger', 'z-focus-ring', className)}
      data-invalid={invalid ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="z-select__icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

export type SelectValueProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

export function SelectValue({ className, ...props }: SelectValueProps) {
  return <SelectPrimitive.Value className={cx('z-select__value', className)} {...props} />;
}

SelectValue.displayName = 'SelectValue';

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(function SelectContent({ className, children, position = 'popper', ...props }, ref) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cx('z-select__content', className)}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className="z-select__viewport">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

SelectContent.displayName = 'SelectContent';

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

export const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item ref={ref} className={cx('z-select__item', className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="z-select__item-indicator">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8l3.5 3.5L13 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = 'SelectItem';
