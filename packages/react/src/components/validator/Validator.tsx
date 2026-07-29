import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cx, FieldProvider, useFieldContext } from '../../shared';
import './validator.css';

export type ValidatorResult = string | undefined | null | false;

export type ValidateFn<T> = (value: T) => ValidatorResult | Promise<ValidatorResult>;

interface ValidatorContextValue {
  error?: string;
  invalid: boolean;
  validating: boolean;
  touch: () => void;
}

const ValidatorContext = createContext<ValidatorContextValue | null>(null);

export function useValidatorContext(): ValidatorContextValue | null {
  return useContext(ValidatorContext);
}

export interface ValidatorProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: T;
  validate?: ValidateFn<T>;
  validateOn?: 'change' | 'blur' | 'submit';
  touched?: boolean;
  defaultTouched?: boolean;
  onTouchedChange?: (touched: boolean) => void;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
}

export function Validator<T>({
  className,
  value,
  validate,
  validateOn = 'change',
  touched: touchedProp,
  defaultTouched = false,
  onTouchedChange,
  id,
  disabled,
  required,
  children,
  ...props
}: ValidatorProps<T>) {
  const parentField = useFieldContext();
  const [uncontrolledTouched, setUncontrolledTouched] = useState(defaultTouched);
  const [error, setError] = useState<string | undefined>();
  const [validating, setValidating] = useState(false);

  const touched = touchedProp ?? uncontrolledTouched;
  const setTouched = useCallback(
    (nextTouched: boolean) => {
      if (touchedProp === undefined) {
        setUncontrolledTouched(nextTouched);
      }
      onTouchedChange?.(nextTouched);
    },
    [onTouchedChange, touchedProp],
  );

  const runValidation = useCallback(async () => {
    if (!validate) {
      setError(undefined);
      return;
    }
    setValidating(true);
    try {
      const result = await validate(value);
      setError(result ? String(result) : undefined);
    } finally {
      setValidating(false);
    }
  }, [validate, value]);

  useEffect(() => {
    if (validateOn === 'change' && (touched || validateOn === 'change')) {
      void runValidation();
    }
  }, [runValidation, touched, validateOn, value]);

  const touch = useCallback(() => {
    setTouched(true);
    if (validateOn === 'blur' || validateOn === 'submit') {
      void runValidation();
    }
  }, [runValidation, setTouched, validateOn]);

  const invalid = Boolean(error);
  const context = useMemo(
    () => ({
      error,
      invalid,
      validating,
      touch,
    }),
    [error, invalid, touch, validating],
  );

  return (
    <FieldProvider
      id={id ?? parentField?.id}
      disabled={disabled ?? parentField?.disabled}
      invalid={invalid || parentField?.invalid}
      required={required ?? parentField?.required}
    >
      <ValidatorContext.Provider value={context}>
        <div
          className={cx('z-validator', className)}
          data-invalid={invalid ? 'true' : undefined}
          data-validating={validating ? 'true' : undefined}
          onBlurCapture={() => {
            if (validateOn === 'blur') {
              touch();
            }
          }}
          {...props}
        >
          {children}
        </div>
      </ValidatorContext.Provider>
    </FieldProvider>
  );
}

export interface ValidatorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export function ValidatorMessage({ className, children, ...props }: ValidatorMessageProps) {
  const validator = useValidatorContext();
  const field = useFieldContext();
  const message = children ?? validator?.error;

  if (!message) {
    return null;
  }

  return (
    <p
      id={field?.errorId}
      role="alert"
      className={cx('z-validator__message', className)}
      {...props}
    >
      {message}
    </p>
  );
}

Validator.displayName = 'Validator';
ValidatorMessage.displayName = 'ValidatorMessage';
