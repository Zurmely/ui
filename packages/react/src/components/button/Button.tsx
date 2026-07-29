import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx, mergeDisabledChild, type ActionVariant, type Size } from '../../shared';
import '../../shared/focus-ring.css';
import './button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionVariant;
  size?: Size;
  isLoading?: boolean;
  asChild?: boolean;
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    asChild = false,
    icon,
    className,
    disabled,
    children,
    type = 'button',
    onClick,
    tabIndex,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : 'button';
  const isDisabled = Boolean(disabled || isLoading);

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      className={cx('z-button', 'z-focus-ring', className)}
      data-variant={variant}
      data-size={size}
      data-loading={isLoading ? 'true' : undefined}
      data-disabled={isDisabled ? 'true' : undefined}
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={isDisabled ? true : undefined}
      aria-busy={isLoading || undefined}
      tabIndex={asChild ? undefined : isDisabled ? -1 : tabIndex}
      onClick={asChild ? undefined : onClick}
      {...props}
    >
      {asChild ? (
        mergeDisabledChild(children, isDisabled)
      ) : (
        <>
          {isLoading ? (
            <span className="z-button__spinner" aria-hidden="true">
              …
            </span>
          ) : null}
          {icon ? (
            <span className="z-button__icon" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          {children}
        </>
      )}
    </Comp>
  );
});

Button.displayName = 'Button';
