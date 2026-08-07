import type { ReactNode } from 'react';

export type ControlType = 'select' | 'boolean' | 'text' | 'number' | 'slot';

export interface BaseControlDef {
  label: string;
  description?: string;
}

export interface SelectControlDef extends BaseControlDef {
  type: 'select';
  options: readonly string[];
  defaultValue: string;
}

export interface BooleanControlDef extends BaseControlDef {
  type: 'boolean';
  defaultValue: boolean;
}

export interface TextControlDef extends BaseControlDef {
  type: 'text';
  defaultValue: string;
}

export interface NumberControlDef extends BaseControlDef {
  type: 'number';
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface SlotControlDef extends BaseControlDef {
  type: 'slot';
  options: Record<string, ReactNode>;
  defaultValue: string;
}

export type ControlDef =
  | SelectControlDef
  | BooleanControlDef
  | TextControlDef
  | NumberControlDef
  | SlotControlDef;

export interface Example {
  label: string;
  description?: string;
  code: string;
  render: () => ReactNode;
  fullWidth?: boolean;
}

export interface WhenToUsePreviews {
  use: () => ReactNode;
  doNotUse: () => ReactNode;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  category: string;
  summary: string;
  importPath: string;
  componentName: string;
  controls: Record<string, ControlDef>;
  render: (props: Record<string, unknown>) => ReactNode;
  code?: (props: Record<string, unknown>) => string;
  examples?: Example[];
  whenToUsePreviews?: WhenToUsePreviews;
}

export type AnyComponentDoc = ComponentDoc;

export function getDefaultProps(controls: Record<string, ControlDef>): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  for (const [key, control] of Object.entries(controls)) {
    if (control.type === 'slot') {
      props[key] = control.defaultValue;
    } else {
      props[key] = control.defaultValue;
    }
  }
  return props;
}
