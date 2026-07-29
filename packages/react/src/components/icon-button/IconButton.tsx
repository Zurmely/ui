import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx, mergeDisabledChild, type ActionVariant, type Size } from '../../shared';
import '../../shared/focus-ring.css';
import './icon-button.css';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: ActionVariant;
  size?: Size;
  isLoading?: boolean;
  asChild?: boolean;
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    asChild = false,
    className,
    disabled,
    children,
    type = 'button',
    'aria-label': ariaLabel,
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
      className={cx('z-icon-button', 'z-focus-ring', className)}
      data-variant={variant}
      data-size={size}
      data-loading={isLoading ? 'true' : undefined}
      data-disabled={isDisabled ? 'true' : undefined}
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={isDisabled ? true : undefined}
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      tabIndex={asChild ? undefined : isDisabled ? -1 : tabIndex}
      onClick={asChild ? undefined : onClick}
      {...props}
    >
      {asChild ? (
        mergeDisabledChild(children, isDisabled)
      ) : isLoading ? (
        <span className="z-icon-button__spinner" aria-hidden="true">
          …
        </span>
      ) : (
        <span className="z-icon-button__icon" aria-hidden="true">
          {children}
        </span>
      )}
    </Comp>
  );
});

IconButton.displayName = 'IconButton';
