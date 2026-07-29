import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './radio-group.css';

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  invalid?: boolean;
}

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(function RadioGroup(
  {
    className,
    invalid: invalidProp,
    disabled: disabledProp,
    required: requiredProp,
    ...props
  },
  ref,
) {
  const field = useFieldContext();
  const invalid = invalidProp ?? field?.invalid;
  const disabled = disabledProp ?? field?.disabled;
  const required = requiredProp ?? field?.required;

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cx('z-radio-group', className)}
      data-invalid={invalid ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      required={required}
      {...props}
    />
  );
});

RadioGroup.displayName = 'RadioGroup';

export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(function RadioGroupItem({ className, disabled: disabledProp, ...props }, ref) {
  const field = useFieldContext();
  const disabled = disabledProp ?? field?.disabled;

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cx('z-radio-group__item', 'z-focus-ring', className)}
      data-disabled={disabled ? 'true' : undefined}
      disabled={disabled}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="z-radio-group__indicator">
        <span className="z-radio-group__dot" aria-hidden="true" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';
