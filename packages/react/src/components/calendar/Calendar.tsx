import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './calendar.css';

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
    return true;
  }
  if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
    return true;
  }
  return false;
}

function getMonthDays(month: Date): Date[] {
  const firstDay = startOfMonth(month);
  const startOffset = firstDay.getDay();
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

function getInitialFocusedDay(
  days: Date[],
  month: Date,
  selected: Date | undefined,
  minDate?: Date,
  maxDate?: Date,
): Date {
  const today = new Date();

  if (selected && days.some((day) => isSameDay(day, selected))) {
    return selected;
  }

  if (days.some((day) => isSameDay(day, today))) {
    return today;
  }

  const firstInMonth = days.find(
    (day) => isSameMonth(day, month) && !isDateDisabled(day, minDate, maxDate),
  );

  return firstInMonth ?? days[0];
}

function getWeekStart(date: Date): Date {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return start;
}

function getWeekEnd(date: Date): Date {
  const end = new Date(date);
  end.setDate(date.getDate() + (6 - date.getDay()));
  return end;
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'onSelect'> {
  selected?: Date;
  defaultSelected?: Date;
  onSelect?: (date: Date | undefined) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  invalid?: boolean;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    className,
    selected: selectedProp,
    defaultSelected,
    onSelect,
    month: monthProp,
    defaultMonth,
    onMonthChange,
    minDate,
    maxDate,
    disabled: disabledProp,
    invalid: invalidProp,
    ...props
  },
  ref,
) {
  const field = useFieldContext();
  const disabled = disabledProp ?? field?.disabled;
  const invalid = invalidProp ?? field?.invalid;

  const [uncontrolledSelected, setUncontrolledSelected] = useState<Date | undefined>(defaultSelected);
  const [uncontrolledMonth, setUncontrolledMonth] = useState<Date>(
    () => defaultMonth ?? defaultSelected ?? new Date(),
  );

  const selected = selectedProp ?? uncontrolledSelected;
  const month = monthProp ?? uncontrolledMonth;
  const days = useMemo(() => getMonthDays(month), [month]);
  const dayButtonRefs = useRef(new Map<string, HTMLButtonElement>());

  const [focusedDay, setFocusedDay] = useState<Date>(() =>
    getInitialFocusedDay(days, month, selected, minDate, maxDate),
  );

  useEffect(() => {
    if (!days.some((day) => isSameDay(day, focusedDay))) {
      setFocusedDay(getInitialFocusedDay(days, month, selected, minDate, maxDate));
    }
  }, [days, focusedDay, maxDate, minDate, month, selected]);

  useEffect(() => {
    const key = focusedDay.toISOString();
    dayButtonRefs.current.get(key)?.focus();
  }, [focusedDay]);

  const setSelected = useCallback(
    (date: Date | undefined) => {
      if (selectedProp === undefined) {
        setUncontrolledSelected(date);
      }
      onSelect?.(date);
    },
    [onSelect, selectedProp],
  );

  const setMonth = useCallback(
    (nextMonth: Date) => {
      if (monthProp === undefined) {
        setUncontrolledMonth(nextMonth);
      }
      onMonthChange?.(nextMonth);
    },
    [monthProp, onMonthChange],
  );

  const moveFocus = useCallback(
    (nextDay: Date) => {
      if (!isSameMonth(nextDay, month)) {
        setMonth(startOfMonth(nextDay));
      }
      setFocusedDay(nextDay);
    },
    [month, setMonth],
  );

  const handleGridKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTableElement>) => {
      if (disabled) {
        return;
      }

      let nextDay: Date | undefined;

      switch (event.key) {
        case 'ArrowLeft':
          nextDay = addDays(focusedDay, -1);
          break;
        case 'ArrowRight':
          nextDay = addDays(focusedDay, 1);
          break;
        case 'ArrowUp':
          nextDay = addDays(focusedDay, -7);
          break;
        case 'ArrowDown':
          nextDay = addDays(focusedDay, 7);
          break;
        case 'Home':
          nextDay = getWeekStart(focusedDay);
          break;
        case 'End':
          nextDay = getWeekEnd(focusedDay);
          break;
        case 'PageUp':
          nextDay = addMonths(focusedDay, -1);
          break;
        case 'PageDown':
          nextDay = addMonths(focusedDay, 1);
          break;
        default:
          return;
      }

      event.preventDefault();

      if (isDateDisabled(nextDay, minDate, maxDate)) {
        return;
      }

      moveFocus(nextDay);
    },
    [disabled, focusedDay, maxDate, minDate, moveFocus],
  );

  const monthLabel = new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  }).format(month);

  return (
    <div
      ref={ref}
      className={cx('z-calendar', className)}
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={invalid ? 'true' : undefined}
      {...props}
    >
      <div className="z-calendar__header">
        <CalendarNavButton
          aria-label="Previous month"
          disabled={disabled}
          onClick={() => setMonth(addMonths(month, -1))}
        >
          ‹
        </CalendarNavButton>
        <div className="z-calendar__caption" aria-live="polite">
          {monthLabel}
        </div>
        <CalendarNavButton
          aria-label="Next month"
          disabled={disabled}
          onClick={() => setMonth(addMonths(month, 1))}
        >
          ›
        </CalendarNavButton>
      </div>

      <table
        className="z-calendar__grid"
        role="grid"
        aria-label={monthLabel}
        onKeyDown={handleGridKeyDown}
      >
        <thead>
          <tr>
            {WEEKDAY_LABELS.map((label) => (
              <th key={label} scope="col" className="z-calendar__weekday" aria-label={label}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <tr key={weekIndex}>
              {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day) => {
                const outsideMonth = !isSameMonth(day, month);
                const isSelected = selected ? isSameDay(day, selected) : false;
                const isToday = isSameDay(day, new Date());
                const isDayDisabled = Boolean(disabled || isDateDisabled(day, minDate, maxDate));
                const isFocused = isSameDay(day, focusedDay);
                const dayKey = day.toISOString();

                return (
                  <td key={dayKey} role="gridcell" aria-selected={isSelected || undefined}>
                    <button
                      ref={(node) => {
                        if (node) {
                          dayButtonRefs.current.set(dayKey, node);
                        } else {
                          dayButtonRefs.current.delete(dayKey);
                        }
                      }}
                      type="button"
                      className={cx('z-calendar__day', 'z-focus-ring')}
                      data-outside-month={outsideMonth ? 'true' : undefined}
                      data-selected={isSelected ? 'true' : undefined}
                      data-today={isToday ? 'true' : undefined}
                      disabled={isDayDisabled}
                      tabIndex={isFocused && !isDayDisabled ? 0 : -1}
                      aria-label={new Intl.DateTimeFormat(undefined, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }).format(day)}
                      onClick={() => {
                        setFocusedDay(day);
                        setSelected(isSelected ? undefined : day);
                      }}
                      onFocus={() => setFocusedDay(day)}
                    >
                      {day.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

function CalendarNavButton({
  className,
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cx('z-calendar__nav', 'z-focus-ring', className)}
      disabled={disabled}
      data-disabled={disabled ? 'true' : undefined}
      {...props}
    >
      {children}
    </button>
  );
}

Calendar.displayName = 'Calendar';
