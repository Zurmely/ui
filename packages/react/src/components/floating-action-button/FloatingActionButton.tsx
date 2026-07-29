import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx, mergeDisabledChild, type ActionVariant, type Size } from '../../shared';
import '../../shared/focus-ring.css';
import './floating-action-button.css';

export interface FloatingActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: ActionVariant;
  size?: Size;
  isLoading?: boolean;
  asChild?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  function FloatingActionButton(
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
      'aria-label': ariaLabel,
      onClick,
      tabIndex,
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = Boolean(disabled || isLoading);
    const content = children ?? icon;

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cx('z-floating-action-button', 'z-focus-ring', className)}
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
          mergeDisabledChild(content, isDisabled)
        ) : isLoading ? (
          <span className="z-floating-action-button__spinner" aria-hidden="true">
            …
          </span>
        ) : (
          <span className="z-floating-action-button__icon" aria-hidden="true">
            {content}
          </span>
        )}
      </Comp>
    );
  },
);

FloatingActionButton.displayName = 'FloatingActionButton';
