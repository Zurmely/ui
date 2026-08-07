import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Stack,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const drawerDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'drawer',
    name: 'Drawer',
    category: 'Overlays',
    summary: 'Slide-in panel for secondary content.',
    importPath: '@z-ux/ui/drawer',
    componentName: 'Drawer',
    controls: {
      side: {
        type: 'select',
        label: 'side',
        options: ['left', 'right', 'top', 'bottom'],
        defaultValue: 'right',
      },
      title: textControl('title', 'Drawer title'),
      description: textControl('description', 'Drawer description text.'),
    },
    render: (props) => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary">Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent side={props.side as 'left' | 'right' | 'top' | 'bottom'}>
          <DrawerHeader>
            <DrawerTitle>{props.title as string}</DrawerTitle>
            <DrawerDescription>{props.description as string}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    code: (props) => `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="secondary">Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="${props.side}">
    <DrawerHeader>
      <DrawerTitle>${props.title}</DrawerTitle>
      <DrawerDescription>${props.description}</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
    whenToUsePreviews: {
      use: () => (
        <Drawer defaultOpen>
          <DrawerTrigger asChild>
            <Button variant="secondary">Filters</Button>
          </DrawerTrigger>
          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Refine the current view.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ),
      doNotUse: () => (
        <Dialog defaultOpen>
          <DialogTrigger asChild>
            <Button variant="secondary">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>This cannot be undone.</DialogDescription>
          </DialogContent>
        </Dialog>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Right panel',
      description: 'Slide-in panel from the right for secondary tasks.',
      code: `<Drawer>
  <DrawerTrigger asChild><Button variant="secondary">Open drawer</Button></DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Filters</DrawerTitle>
      <DrawerDescription>Refine the current view.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
      render: () => (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Refine the current view.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ),
    },
    {
      label: 'Top sheet',
      description: 'Drawer from the top for mobile-friendly sheets.',
      code: '<Drawer><DrawerContent side="top">...</DrawerContent></Drawer>',
      render: () => (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary">Show details</Button>
          </DrawerTrigger>
          <DrawerContent side="top">
            <DrawerHeader>
              <DrawerTitle>Order summary</DrawerTitle>
              <DrawerDescription>Review items before checkout.</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ),
    },
    {
      label: 'Mobile navigation',
      description: 'Full-height drawer for navigation on small screens.',
      code: '<Drawer><DrawerContent side="left">...</DrawerContent></Drawer>',
      render: () => (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost">Menu</Button>
          </DrawerTrigger>
          <DrawerContent side="left">
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
            </DrawerHeader>
            <Stack gap="sm" style={{ padding: 'var(--z-spacing-inset-component)' }}>
              <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
                Home
              </Button>
              <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
                Projects
              </Button>
              <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
                Settings
              </Button>
            </Stack>
          </DrawerContent>
        </Drawer>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
