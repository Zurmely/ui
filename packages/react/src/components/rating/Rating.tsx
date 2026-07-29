import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './rating.css';

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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="z-rating__icon" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.8.94-5.5-4-3.9 5.53-.8L10 1.5z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  id?: string;
  'aria-describedby'?: string;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    className,
    value: valueProp,
    defaultValue = 0,
    onValueChange,
    max = 5,
    readOnly = false,
    disabled: disabledProp,
    invalid: invalidProp,
    required: requiredProp,
    id,
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const field = useFieldContext();
  const generatedId = useId();
  const groupId = id ?? field?.id ?? generatedId;
  const isDisabled = disabledProp ?? field?.disabled;
  const isInvalid = invalidProp ?? field?.invalid;
  const isRequired = requiredProp ?? field?.required;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focusedStar, setFocusedStar] = useState(() => (defaultValue > 0 ? defaultValue : 1));
  const starRefs = useRef(new Map<number, HTMLButtonElement>());
  const value = valueProp ?? uncontrolledValue;
  const displayValue = hoverValue ?? value;

  useEffect(() => {
    starRefs.current.get(focusedStar)?.focus();
  }, [focusedStar]);

  const setValue = useCallback(
    (nextValue: number) => {
      if (valueProp === undefined) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
      setFocusedStar(nextValue);
    },
    [onValueChange, valueProp],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (readOnly || isDisabled) {
        return;
      }

      let nextStar: number | undefined;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          nextStar = Math.min(max, (focusedStar || 1) + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          nextStar = Math.max(1, (focusedStar || 1) - 1);
          break;
        case 'Home':
          nextStar = 1;
          break;
        case 'End':
          nextStar = max;
          break;
        default:
          return;
      }

      event.preventDefault();
      setFocusedStar(nextStar);
      setValue(nextStar);
    },
    [focusedStar, isDisabled, max, readOnly, setValue],
  );

  const describedBy = getAriaDescribedBy(ariaDescribedBy, field, isInvalid);

  return (
    <div
      ref={ref}
      id={groupId}
      className={cx('z-rating', className)}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-readonly={readOnly || undefined}
      aria-required={!readOnly && isRequired ? true : undefined}
      aria-invalid={isInvalid || undefined}
      aria-describedby={describedBy}
      aria-labelledby={!readOnly ? field?.labelId : undefined}
      aria-label={readOnly ? `Rating: ${value} out of ${max}` : ariaLabel}
      data-disabled={isDisabled ? 'true' : undefined}
      data-invalid={isInvalid ? 'true' : undefined}
      data-readonly={readOnly ? 'true' : undefined}
      onMouseLeave={() => setHoverValue(null)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const filled = starValue <= displayValue;

        if (readOnly) {
          return (
            <span
              key={starValue}
              className={cx('z-rating__star', filled && 'z-rating__star--filled')}
              data-filled={filled ? 'true' : undefined}
            >
              <StarIcon filled={filled} />
            </span>
          );
        }

        return (
          <RatingStarButton
            key={starValue}
            name={`${groupId}-star`}
            value={starValue}
            filled={filled}
            disabled={isDisabled}
            checked={value === starValue}
            tabIndex={starValue === focusedStar ? 0 : -1}
            onSelect={() => setValue(starValue)}
            onHover={() => setHoverValue(starValue)}
            onFocus={() => setFocusedStar(starValue)}
            buttonRef={(node) => {
              if (node) {
                starRefs.current.set(starValue, node);
              } else {
                starRefs.current.delete(starValue);
              }
            }}
          />
        );
      })}
    </div>
  );
});

interface RatingStarButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  name: string;
  value: number;
  filled: boolean;
  checked: boolean;
  onSelect: () => void;
  onHover: () => void;
  buttonRef?: (node: HTMLButtonElement | null) => void;
}

function RatingStarButton({
  name,
  value,
  filled,
  disabled,
  checked,
  onSelect,
  onHover,
  buttonRef,
  ...props
}: RatingStarButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      role="radio"
      name={name}
      value={value}
      className={cx('z-rating__star', 'z-focus-ring', filled && 'z-rating__star--filled')}
      data-filled={filled ? 'true' : undefined}
      aria-checked={checked}
      aria-label={`${value} star${value === 1 ? '' : 's'}`}
      disabled={disabled}
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      {...props}
    >
      <StarIcon filled={filled} />
    </button>
  );
}

Rating.displayName = 'Rating';
