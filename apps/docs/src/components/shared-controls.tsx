import type { ControlDef } from '../playground/types';

export const sizeControl = (defaultValue: 'sm' | 'md' | 'lg' = 'md'): ControlDef => ({
  type: 'select',
  label: 'size',
  options: ['sm', 'md', 'lg'],
  defaultValue,
});

export const actionVariantControl = (
  defaultValue: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary',
): ControlDef => ({
  type: 'select',
  label: 'variant',
  options: ['primary', 'secondary', 'ghost', 'danger'],
  defaultValue,
});

export const toneControl = (
  defaultValue: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'neutral',
): ControlDef => ({
  type: 'select',
  label: 'tone',
  options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
  defaultValue,
});

export const booleanControl = (label: string, defaultValue = false): ControlDef => ({
  type: 'boolean',
  label,
  defaultValue,
});

export const textControl = (label: string, defaultValue: string): ControlDef => ({
  type: 'text',
  label,
  defaultValue,
});

export const childrenControl = (defaultValue: string): ControlDef => ({
  type: 'text',
  label: 'children',
  defaultValue,
});

export const disabledControl: ControlDef = booleanControl('disabled', false);

export const iconSlotControl: ControlDef = {
  type: 'slot',
  label: 'icon',
  options: {
    none: undefined,
    star: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.27l-3.52 1.85.67-3.92L2.3 5.64l3.94-.57L8 1.5z" />
      </svg>
    ),
  },
  defaultValue: 'none',
};

export function resolveSlot(
  control: Extract<ControlDef, { type: 'slot' }>,
  key: string,
): React.ReactNode {
  return control.options[key];
}

export const plusIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const searchIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
