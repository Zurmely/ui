import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './otp-input.css';

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

function sanitizeDigits(value: string, length: number): string {
  return value.replace(/\D/g, '').slice(0, length);
}

export interface OTPInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  id?: string;
  'aria-describedby'?: string;
}

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(function OTPInput(
  {
    className,
    length = 6,
    value: valueProp,
    defaultValue = '',
    onChange,
    disabled: disabledProp,
    invalid: invalidProp,
    required: requiredProp,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref,
) {
  const field = useFieldContext();
  const generatedId = useId();
  const inputId = id ?? field?.id ?? generatedId;
  const isDisabled = disabledProp ?? field?.disabled;
  const isInvalid = invalidProp ?? field?.invalid;
  const isRequired = requiredProp ?? field?.required;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = sanitizeDigits(valueProp ?? uncontrolledValue, length);

  const setValue = useCallback(
    (nextValue: string) => {
      const sanitized = sanitizeDigits(nextValue, length);
      if (valueProp === undefined) {
        setUncontrolledValue(sanitized);
      }
      onChange?.(sanitized);
    },
    [length, onChange, valueProp],
  );

  const focusIndex = (index: number) => {
    const input = inputRefs.current[index];
    input?.focus();
    input?.select();
  };

  const handleChange = (index: number, digit: string) => {
    const chars = value.padEnd(length, ' ').split('');
    chars[index] = digit;
    const next = sanitizeDigits(chars.join('').trimEnd(), length);
    setValue(next);
    if (digit && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      focusIndex(index - 1);
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusIndex(index - 1);
    }
    if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = sanitizeDigits(event.clipboardData.getData('text'), length);
    setValue(pasted);
    focusIndex(Math.min(pasted.length, length - 1));
  };

  return (
    <div
      ref={ref}
      className={cx('z-otp-input', className)}
      data-disabled={isDisabled ? 'true' : undefined}
      data-invalid={isInvalid ? 'true' : undefined}
      role="group"
      aria-labelledby={field?.labelId}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            inputRefs.current[index] = node;
          }}
          id={index === 0 ? inputId : `${inputId}-${index}`}
          className={cx('z-otp-input__digit', 'z-focus-ring')}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={value[index] ?? ''}
          disabled={isDisabled}
          required={isRequired && index === 0}
          aria-label={index > 0 || !field?.labelId ? `Digit ${index + 1} of ${length}` : undefined}
          aria-labelledby={field?.labelId && index === 0 ? field.labelId : undefined}
          aria-invalid={isInvalid || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={
            index === 0 ? getAriaDescribedBy(ariaDescribedBy, field, isInvalid) : undefined
          }
          onChange={(event) => handleChange(index, sanitizeDigits(event.target.value, 1))}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
});

OTPInput.displayName = 'OTPInput';
