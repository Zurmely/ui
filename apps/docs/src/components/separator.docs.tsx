import {
  Separator,
  Stack,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const separatorDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'separator',
  name: 'Separator',
  category: 'Display',
  summary:
      'Horizontal or vertical rule. Default role is separator. Use role="none" when the rule is decorative.',
  importPath: '@z-ux/ui/separator',
  componentName: 'Separator',
  controls: {
    orientation: {
      type: 'select',
      label: 'orientation',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
  },
  render: (props) =>
    props.orientation === 'vertical' ? (
      <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
        <span>General</span>
        <Separator orientation="vertical" />
        <span>Account</span>
      </Stack>
    ) : (
      <Stack gap="sm" style={{ width: '100%' }}>
        <span>Profile settings</span>
        <Separator orientation="horizontal" />
        <span>Notification preferences</span>
      </Stack>
    ),
  code: (props) => `<Separator orientation="${props.orientation}" />`,
  whenToUsePreviews: {
    use: () => (
      <Stack gap="sm" style={{ width: '100%' }}>
        <span>Profile settings</span>
        <Separator />
        <span>Notification preferences</span>
      </Stack>
    ),
    doNotUse: () => (
      <Stack gap="sm" style={{ width: '100%' }}>
        <span>Profile settings</span>
        <span style={{ borderTop: '1px solid var(--z-color-border-default)' }} />
        <span>Notification preferences</span>
      </Stack>
    ),
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Section divider',
      description: 'Horizontal rule between content blocks.',
      code: '<Separator />',
      render: () => <Separator />,
    },
    {
      label: 'Toolbar divider',
      description: 'Vertical separator between action groups.',
      code: '<Separator orientation="vertical" />',
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <span>Edit</span>
          <Separator orientation="vertical" />
          <span>Share</span>
        </Stack>
      ),
    },
    {
      label: 'Sidebar sections',
      description: 'Divide navigation groups in a sidebar.',
      code: '<Separator />',
      render: () => (
        <Stack gap="sm" style={{ width: '100%', maxWidth: '12rem' }}>
          <span>General</span>
          <Separator />
          <span>Account</span>
        </Stack>
      ),
    },
  ];
  return doc;
})();
