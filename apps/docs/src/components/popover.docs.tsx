import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  TextField,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const popoverDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'popover',
    name: 'Popover',
    category: 'Overlays',
    summary: 'Floating content anchored to a trigger.',
    importPath: '@z-ux/ui/popover',
    componentName: 'Popover',
    controls: {
      content: textControl('content', 'Shipping is free on orders over $50.'),
    },
    render: (props) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            ?
          </Button>
        </PopoverTrigger>
        <PopoverContent>{props.content as string}</PopoverContent>
      </Popover>
    ),
    code: (props) => `<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="sm">?</Button>
  </PopoverTrigger>
  <PopoverContent>${props.content}</PopoverContent>
</Popover>`,
    whenToUsePreviews: {
      use: () => (
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              ?
            </Button>
          </PopoverTrigger>
          <PopoverContent>Shipping is free on orders over $50.</PopoverContent>
        </Popover>
      ),
      doNotUse: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm">
              Settings
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Account settings</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ),
    },
  };
  doc.examples = [
    {
      label: 'Help hint',
      description: 'Short contextual help anchored to a trigger.',
      code: `<Popover>
  <PopoverTrigger asChild><Button variant="ghost" size="sm">?</Button></PopoverTrigger>
  <PopoverContent>Shipping is free on orders over $50.</PopoverContent>
</Popover>`,
      render: () => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              ?
            </Button>
          </PopoverTrigger>
          <PopoverContent>Shipping is free on orders over $50.</PopoverContent>
        </Popover>
      ),
    },
    {
      label: 'Date picker anchor',
      description: 'Popover for picking a date beside an input.',
      code: `<Popover>
  <PopoverTrigger asChild>
    <Field style={{ width: '100%', maxWidth: '14rem' }}>
      <FieldLabel>Delivery date</FieldLabel>
      <TextField placeholder="Select date" disabled />
    </Field>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar />
  </PopoverContent>
</Popover>`,
      render: () => (
        <Popover>
          <PopoverTrigger asChild>
            <Field style={{ width: '100%', maxWidth: '14rem' }}>
              <FieldLabel>Delivery date</FieldLabel>
              <TextField placeholder="Select date" disabled />
            </Field>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar />
          </PopoverContent>
        </Popover>
      ),
    },
    {
      label: 'Share options',
      description: 'Popover with quick share actions.',
      code: `<Popover>
  <PopoverTrigger asChild><Button variant="primary">Share</Button></PopoverTrigger>
  <PopoverContent>
    <Stack gap="sm">
      <Button variant="secondary" size="sm">Copy link</Button>
      <Button variant="ghost" size="sm">Invite teammates</Button>
    </Stack>
  </PopoverContent>
</Popover>`,
      render: () => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Share</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Stack gap="sm">
              <Button variant="secondary" size="sm">
                Copy link
              </Button>
              <Button variant="ghost" size="sm">
                Invite teammates
              </Button>
            </Stack>
          </PopoverContent>
        </Popover>
      ),
    },
  ];
  return doc;
})();
