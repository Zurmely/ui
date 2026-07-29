import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, type Tone } from '../../shared';
import './alert.css';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: Tone;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = 'neutral', title, description, action, className, children, ...props },
  ref,
) {
  const body = description ?? children;

  return (
    <div
      ref={ref}
      role="alert"
      className={cx('z-alert', className)}
      data-tone={tone}
      {...props}
    >
      {title ? <div className="z-alert__title">{title}</div> : null}
      {body ? <div className="z-alert__description">{body}</div> : null}
      {action ? <div className="z-alert__action">{action}</div> : null}
    </div>
  );
});

Alert.displayName = 'Alert';
