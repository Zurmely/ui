import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const drawerDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'drawer',
  name: 'Drawer',
  category: 'Overlays',
  summary: 'Slide-in panel for secondary content.',
  importPath: '@z-ui/react/drawer',
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<drawer />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, side: 'top' }) : '<drawer />',
      render: () => doc.render({ ...defaults, side: 'top' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<drawer />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
