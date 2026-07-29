import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import { cx } from '../../shared';
import { subscribeMediaQuery } from '../../shared/media-query';
import '../../shared/focus-ring.css';
import {
  applyAccessibilityPreferences,
  type AccessibilityPreferences,
  type ContrastPreference,
  type LinkUnderlinePreference,
  type MotionPreference,
  type TransparencyPreference,
} from './preferences';
import './accessibility-controller.css';

export interface AccessibilityControllerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: AccessibilityPreferences;
  defaultValue?: AccessibilityPreferences;
  onChange?: (preferences: AccessibilityPreferences) => void;
}

type FlagKey = keyof Required<AccessibilityPreferences>;

interface FlagConfig<T extends string> {
  key: FlagKey;
  label: string;
  options: Array<{ value: T; label: string }>;
}

const FLAG_GROUPS: Array<
  | FlagConfig<ContrastPreference>
  | FlagConfig<MotionPreference>
  | FlagConfig<TransparencyPreference>
  | FlagConfig<LinkUnderlinePreference>
> = [
  {
    key: 'contrast',
    label: 'Contrast',
    options: [
      { value: 'system', label: 'System' },
      { value: 'standard', label: 'Standard' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    key: 'motion',
    label: 'Motion',
    options: [
      { value: 'system', label: 'System' },
      { value: 'full', label: 'Full' },
      { value: 'reduced', label: 'Reduced' },
    ],
  },
  {
    key: 'transparency',
    label: 'Transparency',
    options: [
      { value: 'system', label: 'System' },
      { value: 'full', label: 'Full' },
      { value: 'reduced', label: 'Reduced' },
    ],
  },
  {
    key: 'linkUnderline',
    label: 'Link underline',
    options: [
      { value: 'auto', label: 'Auto' },
      { value: 'always', label: 'Always' },
    ],
  },
];

const DEFAULT_VALUE: Required<AccessibilityPreferences> = {
  contrast: 'system',
  motion: 'system',
  transparency: 'system',
  linkUnderline: 'auto',
};

const SYSTEM_MEDIA_QUERIES: Partial<Record<FlagKey, string>> = {
  contrast: '(prefers-contrast: more)',
  motion: '(prefers-reduced-motion: reduce)',
  transparency: '(prefers-reduced-transparency: reduce)',
};

export const AccessibilityController = forwardRef<HTMLDivElement, AccessibilityControllerProps>(
  function AccessibilityController(
    { value, defaultValue = DEFAULT_VALUE, onChange, className, ...props },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState<Required<AccessibilityPreferences>>({
      ...DEFAULT_VALUE,
      ...defaultValue,
    });
    const selected = { ...DEFAULT_VALUE, ...internalValue, ...value };

    const setPreference = useCallback(
      <K extends FlagKey>(key: K, next: Required<AccessibilityPreferences>[K]) => {
        const nextPreferences = { ...selected, [key]: next };

        if (value === undefined) {
          setInternalValue(nextPreferences);
        }

        applyAccessibilityPreferences(nextPreferences);
        onChange?.(nextPreferences);
      },
      [onChange, selected, value],
    );

    useEffect(() => {
      applyAccessibilityPreferences(selected);
    }, [selected.contrast, selected.motion, selected.transparency, selected.linkUnderline]);

    useEffect(() => {
      const cleanups: Array<() => void> = [];

      for (const group of FLAG_GROUPS) {
        const query = SYSTEM_MEDIA_QUERIES[group.key];
        if (!query || selected[group.key] !== 'system') {
          continue;
        }

        cleanups.push(
          subscribeMediaQuery(query, () => {
            applyAccessibilityPreferences(selected);
          }),
        );
      }

      return () => {
        for (const cleanup of cleanups) {
          cleanup();
        }
      };
    }, [selected.contrast, selected.motion, selected.transparency, selected.linkUnderline]);

    return (
      <div ref={ref} className={cx('z-accessibility-controller', className)} {...props}>
        {FLAG_GROUPS.map((group) => (
          <div
            key={group.key}
            role="radiogroup"
            aria-label={group.label}
            className="z-accessibility-controller__group"
          >
            <span className="z-accessibility-controller__label">{group.label}</span>
            <div className="z-accessibility-controller__options">
              {group.options.map((option) => (
                <AccessibilityControllerOption
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  checked={selected[group.key] === option.value}
                  onSelect={() => setPreference(group.key, option.value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
);

AccessibilityController.displayName = 'AccessibilityController';

interface AccessibilityControllerOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
}

const AccessibilityControllerOption = forwardRef<
  HTMLButtonElement,
  AccessibilityControllerOptionProps
>(function AccessibilityControllerOption(
  { value, label, checked, onSelect, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={checked}
      className={cx('z-accessibility-controller__option', 'z-focus-ring', className)}
      data-value={value}
      data-selected={checked ? 'true' : undefined}
      onClick={onSelect}
      {...props}
    >
      {label}
    </button>
  );
});

AccessibilityControllerOption.displayName = 'AccessibilityControllerOption';
