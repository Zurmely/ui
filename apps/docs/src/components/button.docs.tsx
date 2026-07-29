import { Button, Stack } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import {
  actionVariantControl,
  booleanControl,
  childrenControl,
  disabledControl,
  iconSlotControl,
  resolveSlot,
  sizeControl,
} from './shared-controls';

interface ButtonPlaygroundProps {
  variant: string;
  size: string;
  isLoading: boolean;
  disabled: boolean;
  children: string;
  icon: string;
}

export const buttonDoc: ComponentDoc = {
  slug: 'button',
  name: 'Button',
  category: 'Actions',
  summary: 'Triggers actions and form submissions with consistent semantic color treatment.',
  importPath: '@z-ui/react/button',
  componentName: 'Button',
  controls: {
    variant: actionVariantControl(),
    size: sizeControl(),
    isLoading: booleanControl('isLoading', false),
    disabled: disabledControl,
    children: childrenControl('Save changes'),
    icon: iconSlotControl,
  },
  render: (props) => (
    <Button
      variant={props.variant as 'primary' | 'secondary' | 'ghost' | 'danger'}
      size={props.size as 'sm' | 'md' | 'lg'}
      isLoading={props.isLoading as boolean}
      disabled={props.disabled as boolean}
      icon={resolveSlot(iconSlotControl as import('../playground/types').SlotControlDef, props.icon as string)}
    >
      {props.children as string}
    </Button>
  ),
  examples: [
    {
      label: 'Primary',
      description: 'Default primary action.',
      code: '<Button variant="primary">Save</Button>',
      render: () => <Button variant="primary">Save</Button>,
    },
    {
      label: 'Loading',
      description: 'Secondary button in a loading state.',
      code: '<Button variant="secondary" isLoading>Loading</Button>',
      render: () => (
        <Button variant="secondary" isLoading>
          Loading
        </Button>
      ),
    },
    {
      label: 'Danger',
      description: 'Destructive action styling.',
      code: '<Button variant="danger">Delete</Button>',
      render: () => <Button variant="danger">Delete</Button>,
    },
    {
      label: 'Form footer',
      description: 'Primary, secondary, and ghost actions in a form footer.',
      code: `<Stack direction="horizontal" gap="sm" style={{ justifyContent: 'flex-end' }}>
  <Button variant="ghost">Cancel</Button>
  <Button variant="secondary">Save draft</Button>
  <Button variant="primary">Publish</Button>
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="secondary">Save draft</Button>
          <Button variant="primary">Publish</Button>
        </Stack>
      ),
      fullWidth: true,
    },
  ],
};
