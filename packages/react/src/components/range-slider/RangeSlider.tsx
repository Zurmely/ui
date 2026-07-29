import {
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './range-slider.css';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
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

type RangeValue = number | [number, number];

function normalizeRangeValue(value: RangeValue, min: number, max: number): [number, number] {
  if (Array.isArray(value)) {
    const low = clamp(value[0], min, max);
    const high = clamp(value[1], min, max);
    return low <= high ? [low, high] : [high, low];
  }
  const single = clamp(value, min, max);
  return [min, single];
}

export interface RangeSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  value?: RangeValue;
  defaultValue?: RangeValue;
  onValueChange?: (value: RangeValue) => void;
  range?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  id?: string;
  'aria-describedby'?: string;
}

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(function RangeSlider(
  {
    className,
    min = 0,
    max = 100,
    step = 1,
    value: valueProp,
    defaultValue = min,
    onValueChange,
    range = false,
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

  const [uncontrolledValue, setUncontrolledValue] = useState<RangeValue>(defaultValue);
  const value = valueProp ?? uncontrolledValue;

  const setValue = useCallback(
    (nextValue: RangeValue) => {
      if (valueProp === undefined) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [onValueChange, valueProp],
  );

  const describedBy = getAriaDescribedBy(ariaDescribedBy, field, isInvalid);

  if (!range) {
    const singleValue = clamp(typeof value === 'number' ? value : value[1], min, max);

    return (
      <div
        ref={ref}
        className={cx('z-range-slider', className)}
        data-disabled={isDisabled ? 'true' : undefined}
        data-invalid={isInvalid ? 'true' : undefined}
        data-range="false"
        {...props}
      >
        <input
          id={inputId}
          className={cx('z-range-slider__input', 'z-focus-ring')}
          type="range"
          min={min}
          max={max}
          step={step}
          value={singleValue}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={isInvalid || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={describedBy}
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </div>
    );
  }

  const [low, high] = normalizeRangeValue(value, min, max);
  const percentLow = ((low - min) / (max - min)) * 100;
  const percentHigh = ((high - min) / (max - min)) * 100;

  const updateThumb = (thumb: 'low' | 'high', next: number) => {
    const clamped = clamp(next, min, max);
    if (thumb === 'low') {
      setValue([Math.min(clamped, high), high]);
      return;
    }
    setValue([low, Math.max(clamped, low)]);
  };

  const handleThumbKeyDown = (thumb: 'low' | 'high', event: KeyboardEvent<HTMLButtonElement>) => {
    const current = thumb === 'low' ? low : high;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      updateThumb(thumb, current + step);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      updateThumb(thumb, current - step);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      updateThumb(thumb, min);
    }
    if (event.key === 'End') {
      event.preventDefault();
      updateThumb(thumb, max);
    }
  };

  const label = useMemo(
    () => `Range from ${low} to ${high}`,
    [high, low],
  );

  return (
    <div
      ref={ref}
      className={cx('z-range-slider', className)}
      data-disabled={isDisabled ? 'true' : undefined}
      data-invalid={isInvalid ? 'true' : undefined}
      data-range="true"
      role="group"
      aria-label={label}
      aria-describedby={describedBy}
      {...props}
    >
      <div className="z-range-slider__track">
        <div
          className="z-range-slider__range"
          style={{ left: `${percentLow}%`, right: `${100 - percentHigh}%` }}
        />
        <button
          id={inputId}
          type="button"
          className={cx('z-range-slider__thumb', 'z-focus-ring')}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={high}
          aria-valuenow={low}
          aria-label="Minimum value"
          disabled={isDisabled}
          aria-invalid={isInvalid || undefined}
          style={{ left: `${percentLow}%` }}
          onKeyDown={(event) => handleThumbKeyDown('low', event)}
          onClick={() => updateThumb('low', low)}
        />
        <button
          type="button"
          className={cx('z-range-slider__thumb', 'z-focus-ring')}
          role="slider"
          aria-valuemin={low}
          aria-valuemax={max}
          aria-valuenow={high}
          aria-label="Maximum value"
          disabled={isDisabled}
          aria-invalid={isInvalid || undefined}
          style={{ left: `${percentHigh}%` }}
          onKeyDown={(event) => handleThumbKeyDown('high', event)}
          onClick={() => updateThumb('high', high)}
        />
      </div>
    </div>
  );
});

RangeSlider.displayName = 'RangeSlider';
