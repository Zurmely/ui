import * as SwitchPrimitive from '@radix-ui/react-switch';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './switch.css';

export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  invalid?: boolean;
}

export const Switch = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(function Switch(
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
    <SwitchPrimitive.Root
      ref={ref}
      className={cx('z-switch', 'z-focus-ring', className)}
      data-invalid={invalid ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      disabled={disabled}
      required={required}
      aria-invalid={invalid || undefined}
      {...props}
    >
      <SwitchPrimitive.Thumb className="z-switch__thumb" />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = 'Switch';
