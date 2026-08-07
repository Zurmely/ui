import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const dialogDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'dialog',
    name: 'Dialog',
    category: 'Overlays',
    summary: 'Modal overlay for focused tasks and confirmations.',
    importPath: '@z-ux/ui/dialog',
    componentName: 'Dialog',
    controls: {
      title: textControl('title', 'Edit profile'),
      description: textControl('description', 'Make changes to your profile here.'),
    },
    render: (props) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Edit profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{props.title as string}</DialogTitle>
          <DialogDescription>{props.description as string}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="primary">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: (props) => `<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>${props.title}</DialogTitle>
    <DialogDescription>${props.description}</DialogDescription>
    <DialogFooter>
      <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
      <Button variant="primary">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    whenToUsePreviews: {
      use: () => (
        <Dialog defaultOpen>
          <DialogTrigger asChild>
            <Button variant="secondary">Edit profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button variant="primary">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
      doNotUse: () => (
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              ?
            </Button>
          </PopoverTrigger>
          <PopoverContent>Shipping is free on orders over $50.</PopoverContent>
        </Popover>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Edit profile',
      description: 'Modal for focused edits without leaving the page.',
      code: `<Dialog>
  <DialogTrigger asChild><Button variant="secondary">Edit profile</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Edit profile</DialogTitle>
    <DialogDescription>Make changes to your profile here.</DialogDescription>
    <DialogFooter>
      <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
      <Button variant="primary">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Edit profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button variant="primary">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      label: 'Share link',
      description: 'Short task dialog with a single action.',
      code: `<Dialog>
  <DialogTrigger asChild><Button variant="primary">Share</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Share document</DialogTitle>
    <DialogDescription>Anyone with the link can view.</DialogDescription>
    <DialogFooter>
      <Button variant="primary">Copy link</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Share</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Share document</DialogTitle>
            <DialogDescription>Anyone with the link can view.</DialogDescription>
            <DialogFooter>
              <Button variant="primary">Copy link</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      label: 'Destructive confirm',
      description: 'Confirm before deleting a resource.',
      code: `<Dialog>
  <DialogTrigger asChild><Button variant="danger">Delete</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Delete project?</DialogTitle>
    <DialogDescription>This cannot be undone.</DialogDescription>
    <DialogFooter>
      <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
      <Button variant="danger">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="danger">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>This cannot be undone.</DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button variant="danger">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
  ];
  return doc;
})();
