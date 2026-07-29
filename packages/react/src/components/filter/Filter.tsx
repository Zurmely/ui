import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cx, type Size } from '../../shared';
import '../../shared/focus-ring.css';
import './filter.css';

type FilterType = 'single' | 'multiple';

interface FilterContextValue {
  type: FilterType;
  value: string | string[];
  disabled?: boolean;
  toggleValue: (itemValue: string) => void;
  isSelected: (itemValue: string) => boolean;
}

const FilterContext = createContext<FilterContextValue | null>(null);

function useFilterContext(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('Filter compound components must be used within Filter');
  }
  return context;
}

export interface FilterProps extends HTMLAttributes<HTMLDivElement> {
  type?: FilterType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  size?: Size;
  children: ReactNode;
}

export const Filter = forwardRef<HTMLDivElement, FilterProps>(function Filter(
  {
    className,
    type = 'single',
    value: valueProp,
    defaultValue,
    onValueChange,
    disabled,
    size = 'md',
    children,
    ...props
  },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    () => defaultValue ?? (type === 'multiple' ? [] : ''),
  );

  const value = valueProp ?? uncontrolledValue;

  const setValue = useCallback(
    (nextValue: string | string[]) => {
      if (valueProp === undefined) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [onValueChange, valueProp],
  );

  const isSelected = useCallback(
    (itemValue: string) => {
      if (type === 'multiple') {
        return Array.isArray(value) && value.includes(itemValue);
      }
      return value === itemValue;
    },
    [type, value],
  );

  const toggleValue = useCallback(
    (itemValue: string) => {
      if (disabled) {
        return;
      }
      if (type === 'multiple') {
        const current = Array.isArray(value) ? value : [];
        const next = current.includes(itemValue)
          ? current.filter((entry) => entry !== itemValue)
          : [...current, itemValue];
        setValue(next);
        return;
      }
      setValue(value === itemValue ? '' : itemValue);
    },
    [disabled, setValue, type, value],
  );

  const context = useMemo(
    () => ({
      type,
      value,
      disabled,
      toggleValue,
      isSelected,
    }),
    [disabled, isSelected, toggleValue, type, value],
  );

  return (
    <FilterContext.Provider value={context}>
      <div
        ref={ref}
        role={type === 'single' ? 'radiogroup' : 'group'}
        className={cx('z-filter', className)}
        data-size={size}
        data-disabled={disabled ? 'true' : undefined}
        {...props}
      >
        {children}
      </div>
    </FilterContext.Provider>
  );
});

export interface FilterItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
  children: ReactNode;
}

export const FilterItem = forwardRef<HTMLButtonElement, FilterItemProps>(function FilterItem(
  { className, value, children, disabled: disabledProp, onClick, ...props },
  ref,
) {
  const { disabled, isSelected, toggleValue, type } = useFilterContext();
  const selected = isSelected(value);
  const isDisabled = disabledProp ?? disabled;

  return (
    <button
      ref={ref}
      type="button"
      className={cx('z-filter__item', 'z-focus-ring', className)}
      data-selected={selected ? 'true' : undefined}
      data-disabled={isDisabled ? 'true' : undefined}
      disabled={isDisabled}
      aria-pressed={type === 'multiple' ? selected : undefined}
      aria-checked={type === 'single' ? selected : undefined}
      role={type === 'single' ? 'radio' : undefined}
      onClick={(event) => {
        toggleValue(value);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
});

Filter.displayName = 'Filter';
FilterItem.displayName = 'FilterItem';
