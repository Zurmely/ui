import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './checkbox.css';

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  invalid?: boolean;
}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(function Checkbox(
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
    <CheckboxPrimitive.Root
      ref={ref}
      className={cx('z-checkbox', 'z-focus-ring', className)}
      data-invalid={invalid ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      disabled={disabled}
      required={required}
      aria-invalid={invalid || undefined}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="z-checkbox__indicator">
        <svg
          className="z-checkbox__icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 8l3.5 3.5L13 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = 'Checkbox';
