import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import {
  applyTheme,
  readStoredTheme,
  THEME_STORAGE_KEY,
  writeStoredTheme,
  type ThemePreference,
} from './theme';
import './theme-controller.css';

export interface ThemeControllerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: ThemePreference;
  defaultValue?: ThemePreference;
  onChange?: (theme: ThemePreference) => void;
  /**
   * `localStorage` key used to remember the preference.
   * Pass `false` to disable persistence.
   * @default 'z-ui-theme'
   */
  storageKey?: string | false;
}

const OPTIONS: Array<{ value: ThemePreference; label: string }> = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export const ThemeController = forwardRef<HTMLDivElement, ThemeControllerProps>(
  function ThemeController(
    {
      value,
      defaultValue = 'system',
      onChange,
      storageKey = THEME_STORAGE_KEY,
      className,
      ...props
    },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState<ThemePreference>(() => {
      if (storageKey === false) {
        return defaultValue;
      }

      return readStoredTheme(storageKey) ?? defaultValue;
    });
    const selected = value ?? internalValue;

    const setTheme = useCallback(
      (next: ThemePreference) => {
        if (value === undefined) {
          setInternalValue(next);
        }
        applyTheme(next);
        if (storageKey !== false) {
          writeStoredTheme(storageKey, next);
        }
        onChange?.(next);
      },
      [onChange, storageKey, value],
    );

    useEffect(() => {
      applyTheme(selected);
    }, [selected]);

    useEffect(() => {
      if (
        selected !== 'system' ||
        typeof window === 'undefined' ||
        typeof window.matchMedia !== 'function'
      ) {
        return undefined;
      }

      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');

      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }, [selected]);

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Theme"
        className={cx('z-theme-controller', className)}
        {...props}
      >
        {OPTIONS.map((option) => (
          <ThemeControllerOption
            key={option.value}
            value={option.value}
            label={option.label}
            checked={selected === option.value}
            onSelect={() => setTheme(option.value)}
          />
        ))}
      </div>
    );
  },
);

ThemeController.displayName = 'ThemeController';

interface ThemeControllerOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: ThemePreference;
  label: string;
  checked: boolean;
  onSelect: () => void;
}

const ThemeControllerOption = forwardRef<HTMLButtonElement, ThemeControllerOptionProps>(
  function ThemeControllerOption({ value, label, checked, onSelect, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        className={cx('z-theme-controller__option', 'z-focus-ring', className)}
        data-value={value}
        data-selected={checked ? 'true' : undefined}
        onClick={onSelect}
        {...props}
      >
        {label}
      </button>
    );
  },
);

ThemeControllerOption.displayName = 'ThemeControllerOption';
