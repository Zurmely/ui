import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { cx, FieldProvider, useFieldContext } from '../../shared';
import './field.css';

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children: ReactNode;
}

export function Field({
  id,
  disabled,
  invalid,
  required,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <FieldProvider id={id} disabled={disabled} invalid={invalid} required={required}>
      <div
        className={cx('z-field', className)}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={invalid ? 'true' : undefined}
        {...props}
      >
        {children}
      </div>
    </FieldProvider>
  );
}

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export function FieldLabel({ className, children, ...props }: FieldLabelProps) {
  const field = useFieldContext();

  return (
    <label
      id={field?.labelId}
      htmlFor={field?.id}
      className={cx('z-field__label', className)}
      {...props}
    >
      {children}
    </label>
  );
}

export interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function FieldDescription({ className, children, ...props }: FieldDescriptionProps) {
  const field = useFieldContext();

  if (!children) {
    return null;
  }

  return (
    <p id={field?.descriptionId} className={cx('z-field__description', className)} {...props}>
      {children}
    </p>
  );
}

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function FieldError({ className, children, ...props }: FieldErrorProps) {
  const field = useFieldContext();

  if (!children) {
    return null;
  }

  return (
    <p
      id={field?.errorId}
      role="alert"
      className={cx('z-field__error', className)}
      {...props}
    >
      {children}
    </p>
  );
}

Field.displayName = 'Field';
FieldLabel.displayName = 'FieldLabel';
FieldDescription.displayName = 'FieldDescription';
FieldError.displayName = 'FieldError';
