import { Children, cloneElement, isValidElement, type MouseEvent, type MouseEventHandler, type ReactNode } from 'react';

export interface DisabledHostProps {
  'data-disabled'?: 'true';
  'aria-disabled'?: true;
  tabIndex?: number;
  href?: undefined;
  onClick?: MouseEventHandler<HTMLElement>;
}

/**
 * Returns props that neutralize a non-button host when disabled or loading.
 * Mirrors the behavioral contract in Link.tsx and NAMING.md.
 */
export function getDisabledHostProps(
  isDisabled: boolean,
  onClick?: MouseEventHandler<HTMLElement>,
): DisabledHostProps | Record<string, never> {
  if (!isDisabled) {
    return {};
  }

  return {
    'data-disabled': 'true',
    'aria-disabled': true,
    tabIndex: -1,
    href: undefined,
    onClick: (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
  };
}

/**
 * Applies disabled-host props to a single slotted child element.
 */
export function mergeDisabledChild(children: ReactNode, isDisabled: boolean): ReactNode {
  if (!isDisabled) {
    return children;
  }

  const child = Children.only(children);

  if (!isValidElement(child)) {
    return children;
  }

  const disabledProps = getDisabledHostProps(true);

  return cloneElement(child, {
    ...disabledProps,
    onClick: disabledProps.onClick,
  } as Partial<typeof child.props>);
}

/**
 * Merges disabled-host click suppression with an optional consumer onClick.
 * When disabled, consumer onClick is not invoked.
 */
export function mergeDisabledClickHandler(
  isDisabled: boolean,
  onClick?: MouseEventHandler<HTMLElement>,
): MouseEventHandler<HTMLElement> | undefined {
  if (isDisabled) {
    return (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
  }

  return onClick;
}
