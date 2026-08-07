import {
  Button,
  Stack,
  TextField,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { sizeControl } from './shared-controls';

export const stackDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'stack',
  name: 'Stack',
  category: 'Layout',
  summary: 'Flex layout with consistent gap spacing.',
  importPath: '@z-ux/ui/stack',
  componentName: 'Stack',
  controls: {
    direction: {
      type: 'select',
      label: 'direction',
      options: ['horizontal', 'vertical'],
      defaultValue: 'vertical',
    },
    gap: sizeControl(),
  },
  render: (props) => (
    <Stack
      direction={props.direction as 'horizontal' | 'vertical'}
      gap={props.gap as 'sm' | 'md' | 'lg'}
    >
      <Button variant="secondary">First</Button>
      <Button variant="secondary">Second</Button>
      <Button variant="secondary">Third</Button>
    </Stack>
  ),
  code: (props) => `<Stack direction="${props.direction}" gap="${props.gap}">
  <Button variant="secondary">First</Button>
  <Button variant="secondary">Second</Button>
</Stack>`,
    whenToUsePreviews: {
      use: () => (
        <Stack gap="md" style={{ width: '100%', maxWidth: '20rem' }}>
          <TextField aria-label="Name" placeholder="Name" />
          <TextField aria-label="Email" placeholder="Email" />
        </Stack>
      ),
      doNotUse: () => (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--z-spacing-inline-component)',
            width: '100%',
            maxWidth: '20rem',
          }}
        >
          <TextField aria-label="Name" placeholder="Name" />
          <TextField aria-label="Email" placeholder="Email" />
        </div>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Vertical form',
      description: 'Stack form fields with consistent vertical spacing.',
      code: `<Stack gap="md">
  <TextField aria-label="Name" placeholder="Name" />
  <TextField aria-label="Email" placeholder="Email" />
</Stack>`,
      render: () => (
        <Stack gap="md" style={{ width: '100%', maxWidth: '20rem' }}>
          <TextField aria-label="Name" placeholder="Name" />
          <TextField aria-label="Email" placeholder="Email" />
        </Stack>
      ),
    },
    {
      label: 'Button row',
      description: 'Horizontal stack for dialog or form footer actions.',
      code: `<Stack direction="horizontal" gap="sm" style={{ justifyContent: 'flex-end' }}>
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Save</Button>
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save</Button>
        </Stack>
      ),
      fullWidth: true,
    },
    {
      label: 'Card actions',
      description: 'Vertical stack of secondary actions in a panel.',
      code: `<Stack gap="sm">
  <Button variant="secondary">Export</Button>
  <Button variant="ghost">Archive</Button>
</Stack>`,
      render: () => (
        <Stack gap="sm" style={{ width: '100%', maxWidth: '12rem' }}>
          <Button variant="secondary">Export</Button>
          <Button variant="ghost">Archive</Button>
        </Stack>
      ),
    },
  ];
  return doc;
})();
