import { Slot } from '@radix-ui/react-slot';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  cx,
  FieldProvider,
  getDisabledHostProps,
  mergeDisabledClickHandler,
  validateNoNestedInteractive,
  type Size,
} from '../../shared';
import '../../shared/focus-ring.css';
import './list-item.css';

export type ListItemElement = 'li' | 'div' | 'a' | 'button';
export type ListItemAlign = 'start' | 'center';
export type ListItemVariant = 'plain' | 'contained' | 'compact';

export interface ListItemRegionsProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  control?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  labelId?: string;
  descriptionId?: string;
  children?: ReactNode;
}

export function ListItemRegions({
  leading,
  trailing,
  control,
  label,
  description,
  labelId,
  descriptionId,
  children,
}: ListItemRegionsProps) {
  const labelContent =
    label != null ? (
      labelId ? (
        <span id={labelId}>{label}</span>
      ) : (
        label
      )
    ) : null;

  const descriptionContent =
    description != null ? (
      descriptionId ? (
        <span id={descriptionId}>{description}</span>
      ) : (
        description
      )
    ) : null;

  const trailingContent =
    control || trailing ? (
      <>
        {control ? <div className="z-list-item__control">{control}</div> : null}
        {trailing}
      </>
    ) : null;

  return (
    <>
      {leading ? <div className="z-list-item__leading">{leading}</div> : null}
      <div className="z-list-item__content">
        {labelContent ? <div className="z-list-item__label">{labelContent}</div> : null}
        {descriptionContent ? (
          <div className="z-list-item__description">{descriptionContent}</div>
        ) : null}
        {children}
      </div>
      {trailingContent ? <div className="z-list-item__trailing">{trailingContent}</div> : null}
    </>
  );
}

ListItemRegions.displayName = 'ListItemRegions';

export type ListItemIconProps = HTMLAttributes<HTMLSpanElement>;

export const ListItemIcon = forwardRef<HTMLSpanElement, ListItemIconProps>(function ListItemIcon(
  { className, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cx('z-list-item__icon', className)} aria-hidden="true" {...props}>
      {children}
    </span>
  );
});

ListItemIcon.displayName = 'ListItemIcon';

const CONTROL_LABELLING: Record<string, { labelled: boolean; described: boolean }> = {
  Switch: { labelled: true, described: true },
  Checkbox: { labelled: true, described: true },
  RadioGroup: { labelled: true, described: true },
  Button: { labelled: false, described: true },
  IconButton: { labelled: false, described: true },
};

function getControlDisplayName(control: ReactElement): string | undefined {
  const elementType = control.type;

  if (typeof elementType === 'function' || typeof elementType === 'object') {
    const typed = elementType as { displayName?: string; name?: string };
    return typed.displayName ?? typed.name;
  }

  return undefined;
}

function enhanceControl(
  control: ReactElement,
  options: {
    labelId: string;
    descriptionId?: string;
    labelling: { labelled: boolean; described: boolean };
  },
): ReactElement {
  const controlProps = control.props as {
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
  };
  const ariaProps: Record<string, string | undefined> = {};

  if (options.labelling.labelled && controlProps['aria-labelledby'] == null) {
    ariaProps['aria-labelledby'] = options.labelId;
  }

  if (
    options.labelling.described &&
    options.descriptionId &&
    controlProps['aria-describedby'] == null
  ) {
    ariaProps['aria-describedby'] = options.descriptionId;
  }

  return cloneElement(control, ariaProps);
}

type ListItemBaseProps = {
  leading?: ReactNode;
  trailing?: ReactNode;
  control?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  size?: Size;
  align?: ListItemAlign;
  variant?: ListItemVariant;
  interactive?: boolean;
  selected?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  asChild?: boolean;
};

type ListItemDivProps = ListItemBaseProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof ListItemBaseProps> & {
    as?: 'div';
  };

type ListItemLiProps = ListItemBaseProps &
  Omit<LiHTMLAttributes<HTMLLIElement>, keyof ListItemBaseProps> & {
    as: 'li';
  };

type ListItemAnchorProps = ListItemBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ListItemBaseProps> & {
    as: 'a';
  };

type ListItemButtonProps = ListItemBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ListItemBaseProps> & {
    as: 'button';
  };

export type ListItemProps =
  | ListItemDivProps
  | ListItemLiProps
  | ListItemAnchorProps
  | ListItemButtonProps;

function isRowInteractive(
  as: ListItemElement,
  interactive: boolean | undefined,
  asChild: boolean,
): boolean {
  if (interactive != null) {
    return interactive;
  }

  return as === 'a' || as === 'button' || asChild;
}

export const ListItem = forwardRef<HTMLElement, ListItemProps>(function ListItem(
  {
    as = 'div',
    asChild = false,
    leading,
    trailing,
    control,
    label,
    description,
    size = 'md',
    align = 'center',
    variant = 'plain',
    interactive,
    selected = false,
    disabled = false,
    invalid,
    required,
    className,
    children,
    'aria-current': ariaCurrentProp,
    onClick,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const fieldId = generatedId;
  const labelId = control != null ? `${fieldId}-label` : undefined;
  const descriptionId = control != null && description != null ? `${fieldId}-description` : undefined;

  const rowInteractive = isRowInteractive(as, interactive, asChild);

  if (rowInteractive) {
    validateNoNestedInteractive(trailing, {
      component: 'ListItem',
      slot: 'trailing',
    });
    validateNoNestedInteractive(control, {
      component: 'ListItem',
      slot: 'control',
    });
  }

  let enhancedControl = control;
  if (control != null && isValidElement(control)) {
    const displayName = getControlDisplayName(control);
    const labelling =
      displayName && displayName in CONTROL_LABELLING
        ? CONTROL_LABELLING[displayName]
        : { labelled: false, described: false };

    enhancedControl = enhanceControl(control, {
      labelId: labelId!,
      descriptionId,
      labelling,
    });
  }

  const ariaCurrent =
    ariaCurrentProp ?? (selected && as === 'a' ? 'page' : undefined);

  const disabledHostProps = as !== 'button' ? getDisabledHostProps(disabled, onClick) : {};
  const mergedOnClick = mergeDisabledClickHandler(disabled, onClick);

  const rootClassName = cx(
    'z-list-item',
    rowInteractive && (as === 'a' || as === 'button' || asChild) ? 'z-focus-ring' : null,
    className,
  );

  const regions = (
    <ListItemRegions
      leading={leading}
      trailing={trailing}
      control={enhancedControl}
      label={label}
      description={description}
      labelId={labelId}
      descriptionId={descriptionId}
    >
      {children}
    </ListItemRegions>
  );

  const commonProps = {
    className: rootClassName,
    'data-size': size,
    'data-align': align,
    'data-variant': variant,
    'data-interactive': rowInteractive ? 'true' : undefined,
    'data-selected': selected ? 'true' : undefined,
    'data-disabled': disabled ? 'true' : undefined,
    'data-invalid': invalid ? 'true' : undefined,
    'data-control': control != null ? 'true' : undefined,
    'aria-current': ariaCurrent,
    onClick: mergedOnClick,
    ...(as === 'button' && !asChild
      ? { disabled, type: (props as ButtonHTMLAttributes<HTMLButtonElement>).type }
      : disabledHostProps),
    ...props,
  };

  const needsFieldProvider = control != null || disabled || invalid || required;

  let item: ReactNode;

  if (asChild) {
    item = (
      <Slot ref={ref as never} {...(commonProps as Record<string, unknown>)}>
        {regions}
      </Slot>
    );
  } else {
    switch (as) {
      case 'li':
        item = (
          <li ref={ref as never} {...(commonProps as LiHTMLAttributes<HTMLLIElement>)}>
            {regions}
          </li>
        );
        break;
      case 'a':
        item = (
          <a ref={ref as never} {...(commonProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
            {regions}
          </a>
        );
        break;
      case 'button':
        item = (
          <button ref={ref as never} {...(commonProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {regions}
          </button>
        );
        break;
      default:
        item = (
          <div ref={ref as never} {...(commonProps as HTMLAttributes<HTMLDivElement>)}>
            {regions}
          </div>
        );
    }
  }

  if (needsFieldProvider) {
    return (
      <FieldProvider id={fieldId} disabled={disabled} invalid={invalid} required={required}>
        {item}
      </FieldProvider>
    );
  }

  return item;
});

ListItem.displayName = 'ListItem';
