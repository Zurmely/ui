import {
  Button,
  Megamenu,
  MegamenuContent,
  MegamenuItem,
  MegamenuTrigger,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const menuDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'menu',
    name: 'Menu',
    category: 'Overlays',
    summary: 'Action menu on a trigger. Use selected on MenuItem for the current choice.',
    importPath: '@z-ux/ui/menu',
    componentName: 'Menu',
    controls: {},
    render: () => (
      <Menu>
        <MenuTrigger asChild>
          <Button variant="secondary">Account</Button>
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
    <Button variant="secondary">Account</Button>
  </MenuTrigger>
  <MenuContent>
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
  </MenuContent>
</Menu>`,
    whenToUsePreviews: {
      use: () => (
        <Menu defaultOpen>
          <MenuTrigger asChild>
            <Button variant="secondary">Account</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuSeparator />
            <MenuItem>Log out</MenuItem>
          </MenuContent>
        </Menu>
      ),
      doNotUse: () => (
        <Megamenu defaultOpen>
          <MegamenuTrigger asChild>
            <Button variant="secondary">Products</Button>
          </MegamenuTrigger>
          <MegamenuContent>
            <MegamenuItem href="#">Analytics</MegamenuItem>
            <MegamenuItem href="#">Automation</MegamenuItem>
            <MegamenuItem href="#">Integrations</MegamenuItem>
          </MegamenuContent>
        </Megamenu>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Account menu',
      description: 'Dropdown for profile and settings actions.',
      code: `<Menu>
  <MenuTrigger asChild><Button variant="secondary">Account</Button></MenuTrigger>
  <MenuContent>
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuSeparator />
    <MenuItem>Log out</MenuItem>
  </MenuContent>
</Menu>`,
      render: () => (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="secondary">Account</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuSeparator />
            <MenuItem>Log out</MenuItem>
          </MenuContent>
        </Menu>
      ),
    },
    {
      label: 'Row actions',
      description: 'Context menu for a table or list row.',
      code: `<Menu>
  <MenuTrigger asChild><Button variant="ghost" size="sm">Actions</Button></MenuTrigger>
  <MenuContent>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Delete</MenuItem>
  </MenuContent>
</Menu>`,
      render: () => (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuContent>
        </Menu>
      ),
    },
    {
      label: 'Sort menu',
      description: 'Menu for changing list sort order.',
      code: `<Menu>
  <MenuTrigger asChild><Button variant="secondary">Sort by</Button></MenuTrigger>
  <MenuContent>
    <MenuItem>Newest</MenuItem>
    <MenuItem>Oldest</MenuItem>
    <MenuItem>Name</MenuItem>
  </MenuContent>
</Menu>`,
      render: () => (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="secondary">Sort by</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Newest</MenuItem>
            <MenuItem>Oldest</MenuItem>
            <MenuItem>Name</MenuItem>
          </MenuContent>
        </Menu>
      ),
    },
  ];
  return doc;
})();
