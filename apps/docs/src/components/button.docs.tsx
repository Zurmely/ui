import { Button, Link, Stack } from '@z-ux/ui';
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
  importPath: '@z-ux/ui/button',
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
  code: (props) => {
    const parts = [
      props.variant !== 'primary' ? `variant="${props.variant}"` : null,
      props.size !== 'md' ? `size="${props.size}"` : null,
      props.isLoading ? 'isLoading' : null,
      props.disabled ? 'disabled' : null,
      props.icon && props.icon !== 'none' ? 'icon={/* icon */}' : null,
    ].filter(Boolean);
    return `<Button ${parts.join(' ')}>${props.children}</Button>`;
  },
  whenToUsePreviews: {
    use: () => <Button variant="primary">Save changes</Button>,
    doNotUse: () => <Link href="/settings">Save changes</Link>,
  },
  examples: [
    {
      label: 'Save action',
      description: 'Primary button for committing the main form action, such as saving profile changes.',
      code: '<Button variant="primary">Save changes</Button>',
      render: () => <Button variant="primary">Save changes</Button>,
    },
    {
      label: 'Loading',
      description: 'Secondary button with a loading spinner while an async save operation completes.',
      code: '<Button variant="secondary" isLoading>Save draft</Button>',
      render: () => (
        <Button variant="secondary" isLoading>
          Save draft
        </Button>
      ),
    },
    {
      label: 'Danger',
      description: 'High-emphasis destructive styling for irreversible actions such as deleting a resource.',
      code: '<Button variant="danger">Delete project</Button>',
      render: () => <Button variant="danger">Delete project</Button>,
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
