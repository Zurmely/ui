import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../../shared';
import './steps.css';

export type StepState = 'upcoming' | 'current' | 'completed';

interface StepsContextValue {
  currentStep: number;
}

const StepsContext = createContext<StepsContextValue>({ currentStep: 1 });

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  currentStep?: number;
  label?: string;
}

export const Steps = forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { currentStep = 1, label = 'Progress', className, children, ...props },
  ref,
) {
  return (
    <StepsContext.Provider value={{ currentStep }}>
      <ol
        ref={ref}
        aria-label={label}
        className={cx('z-steps', className)}
        {...props}
      >
        {children}
      </ol>
    </StepsContext.Provider>
  );
});
Steps.displayName = 'Steps';

export interface StepProps extends LiHTMLAttributes<HTMLLIElement> {
  step?: number;
}

function resolveStepState(step: number, currentStep: number): StepState {
  if (step < currentStep) {
    return 'completed';
  }
  if (step === currentStep) {
    return 'current';
  }
  return 'upcoming';
}

export const Step = forwardRef<HTMLLIElement, StepProps>(function Step(
  { step = 1, className, children, ...props },
  ref,
) {
  const { currentStep } = useContext(StepsContext);
  const state = resolveStepState(step, currentStep);

  return (
    <li
      ref={ref}
      className={cx('z-steps__step', className)}
      data-state={state}
      aria-current={state === 'current' ? 'step' : undefined}
      {...props}
    >
      {children}
    </li>
  );
});
Step.displayName = 'Step';

export interface StepIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  step?: number;
  icon?: ReactNode;
}

export const StepIndicator = forwardRef<HTMLSpanElement, StepIndicatorProps>(
  function StepIndicator({ step = 1, icon, className, children, ...props }, ref) {
    const { currentStep } = useContext(StepsContext);
    const state = resolveStepState(step, currentStep);

    let marker: ReactNode;
    if (icon) {
      marker = (
        <span className="z-steps__indicator-icon" aria-hidden="true">
          {icon}
        </span>
      );
    } else if (state === 'completed') {
      marker = '✓';
    } else {
      marker = children ?? step;
    }

    return (
      <span
        ref={ref}
        className={cx('z-steps__indicator', className)}
        data-state={state}
        aria-hidden="true"
        {...props}
      >
        {marker}
      </span>
    );
  },
);
StepIndicator.displayName = 'StepIndicator';

export const StepTitle = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function StepTitle({ className, ...props }, ref) {
    return <span ref={ref} className={cx('z-steps__title', className)} {...props} />;
  },
);
StepTitle.displayName = 'StepTitle';

export const StepDescription = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function StepDescription({ className, ...props }, ref) {
    return <span ref={ref} className={cx('z-steps__description', className)} {...props} />;
  },
);
StepDescription.displayName = 'StepDescription';
