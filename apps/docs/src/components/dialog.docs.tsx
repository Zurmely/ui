import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const dialogDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'dialog',
  name: 'Dialog',
  category: 'Overlays',
  summary: 'Modal overlay for focused tasks and confirmations.',
  importPath: '@z-ui/react/dialog',
  componentName: 'Dialog',
  controls: {
    title: textControl('title', 'Edit profile'),
    description: textControl('description', 'Make changes to your profile here.'),
  },
  render: (props) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{props.title as string}</DialogTitle>
        <DialogDescription>{props.description as string}</DialogDescription>
      </DialogContent>
    </Dialog>
  ),
  code: (props) => `<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>${props.title}</DialogTitle>
    <DialogDescription>${props.description}</DialogDescription>
  </DialogContent>
</Dialog>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<dialog />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<dialog />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<dialog />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Destructive confirm',
      description: 'Confirm before deleting a resource.',
      code: '<Dialog>...</Dialog>',
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="danger">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>This cannot be undone.</DialogDescription>
          </DialogContent>
        </Dialog>
      ),
    },
  ];
  return doc;
})();
