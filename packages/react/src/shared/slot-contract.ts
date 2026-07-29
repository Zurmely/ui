import {
  Children,
  isValidElement,
  type ComponentProps,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from 'react';

export type SlotOf<T extends ElementType> = ReactElement<ComponentProps<T>, T>;

const warnedKeys = new Set<string>();

const INTERACTIVE_DISPLAY_NAMES = new Set([
  'Button',
  'IconButton',
  'Switch',
  'Checkbox',
  'Select',
  'SelectTrigger',
  'Filter',
  'FilterItem',
  'TextField',
  'RadioGroup',
  'RadioGroupItem',
]);

function isDevEnvironment(): boolean {
  const nodeProcess = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process;
  return typeof nodeProcess !== 'undefined' && nodeProcess.env?.NODE_ENV !== 'production';
}

function getElementDisplayName(element: ReactElement): string | undefined {
  const elementType = element.type;

  if (typeof elementType === 'string') {
    return elementType;
  }

  if (typeof elementType === 'function' || typeof elementType === 'object') {
    const typed = elementType as { displayName?: string; name?: string };
    return typed.displayName ?? typed.name;
  }

  return undefined;
}

function warnOnce(key: string, message: string): void {
  if (!isDevEnvironment() || warnedKeys.has(key)) {
    return;
  }

  warnedKeys.add(key);
  console.warn(message);
}

function collectElements(node: ReactNode): ReactElement[] {
  if (node == null || typeof node === 'boolean') {
    return [];
  }

  if (isValidElement(node)) {
    return [node];
  }

  if (Array.isArray(node)) {
    return node.flatMap((child) => collectElements(child));
  }

  return [];
}

export interface ValidateSlotOptions {
  component: string;
  slot: string;
  allowed: readonly string[];
}

export function validateSlot(node: ReactNode, options: ValidateSlotOptions): void {
  if (!isDevEnvironment()) {
    return;
  }

  const elements = collectElements(node);

  for (const element of elements) {
    const displayName = getElementDisplayName(element);

    if (!displayName || options.allowed.includes(displayName)) {
      continue;
    }

    const key = `${options.component}:${options.slot}:${displayName}`;
    warnOnce(
      key,
      `[${options.component}] Slot "${options.slot}" received <${displayName}>. Allowed: ${options.allowed.join(', ')}.`,
    );
  }
}

export interface ValidateNoNestedInteractiveOptions {
  component: string;
  slot: string;
}

export function validateNoNestedInteractive(
  node: ReactNode,
  options: ValidateNoNestedInteractiveOptions,
): void {
  if (!isDevEnvironment()) {
    return;
  }

  const elements = collectElements(node);

  for (const element of elements) {
    const displayName = getElementDisplayName(element);

    if (!displayName || !INTERACTIVE_DISPLAY_NAMES.has(displayName)) {
      continue;
    }

    const key = `${options.component}:${options.slot}:nested-interactive:${displayName}`;
    warnOnce(
      key,
      `[${options.component}] Slot "${options.slot}" contains interactive <${displayName}> inside an interactive row. Move the control outside the row or use a non-interactive trailing slot.`,
    );
  }
}

export function flattenSlotChildren(node: ReactNode): ReactElement[] {
  return Children.toArray(node).filter(isValidElement) as ReactElement[];
}
