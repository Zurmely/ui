import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const menuDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'menu',
  name: 'Menu',
  category: 'Overlays',
  summary: 'Dropdown menu for actions.',
  importPath: '@z-ui/react/menu',
  componentName: 'Menu',
  controls: {},
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuSeparator />
        <MenuItem>Log out</MenuItem>
      </MenuContent>
    </Menu>
  ),
  code: () => `<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary">Open menu</Button>
  </MenuTrigger>
  <MenuContent>
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
  </MenuContent>
</Menu>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<menu />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<menu />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<menu />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
