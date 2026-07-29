import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cx } from '../../shared';
import '../../shared/focus-ring.css';
import './menu.css';

export const Menu = MenuPrimitive.Root;

export const MenuTrigger = forwardRef<
  ElementRef<typeof MenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>
>(function MenuTrigger({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      className={cx('z-menu__trigger', 'z-focus-ring', className)}
      {...props}
    />
  );
});
MenuTrigger.displayName = 'MenuTrigger';

export const MenuContent = forwardRef<
  ElementRef<typeof MenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(function MenuContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cx('z-menu__content', className)}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
});
MenuContent.displayName = 'MenuContent';

export interface MenuItemProps extends ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  selected?: boolean;
}

export const MenuItem = forwardRef<ElementRef<typeof MenuPrimitive.Item>, MenuItemProps>(
  function MenuItem({ className, selected, ...props }, ref) {
    return (
      <MenuPrimitive.Item
        ref={ref}
        className={cx('z-menu__item', 'z-focus-ring', className)}
        data-selected={selected ? 'true' : undefined}
        {...props}
      />
    );
  },
);
MenuItem.displayName = 'MenuItem';

export const MenuSeparator = forwardRef<
  ElementRef<typeof MenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(function MenuSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator ref={ref} className={cx('z-menu__separator', className)} {...props} />
  );
});
MenuSeparator.displayName = 'MenuSeparator';
