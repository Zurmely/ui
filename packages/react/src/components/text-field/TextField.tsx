import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './text-field.css';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

function getAriaDescribedBy(
  ariaDescribedBy: string | undefined,
  field: ReturnType<typeof useFieldContext>,
  isInvalid: boolean | undefined,
): string | undefined {
  const ids = [
    ariaDescribedBy,
    field?.descriptionId,
    isInvalid ? field?.errorId : undefined,
  ].filter(Boolean);

  return ids.length > 0 ? ids.join(' ') : undefined;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    className,
    disabled,
    invalid,
    required,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref,
) {
  const field = useFieldContext();
  const isDisabled = disabled ?? field?.disabled;
  const isInvalid = invalid ?? field?.invalid;
  const isRequired = required ?? field?.required;

  return (
    <input
      ref={ref}
      id={id ?? field?.id}
      className={cx('z-text-field', 'z-focus-ring', className)}
      disabled={isDisabled}
      data-disabled={isDisabled ? 'true' : undefined}
      data-invalid={isInvalid ? 'true' : undefined}
      aria-invalid={isInvalid || undefined}
      aria-required={isRequired || undefined}
      required={isRequired}
      aria-describedby={getAriaDescribedBy(ariaDescribedBy, field, isInvalid)}
      {...props}
    />
  );
});

TextField.displayName = 'TextField';
