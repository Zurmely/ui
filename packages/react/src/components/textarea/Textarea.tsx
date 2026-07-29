import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './textarea.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
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
    <textarea
      ref={ref}
      id={id ?? field?.id}
      className={cx('z-textarea', 'z-focus-ring', className)}
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

Textarea.displayName = 'Textarea';
