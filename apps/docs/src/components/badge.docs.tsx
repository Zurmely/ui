import { Badge, ListItem } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { childrenControl, sizeControl, toneControl } from './shared-controls';

interface BadgePlaygroundProps {
  tone: string;
  size: string;
  children: string;
}

export const badgeDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'badge',
  name: 'Badge',
  category: 'Display',
  summary: 'Compact label for status, count, or category.',
  importPath: '@z-ux/ui/badge',
  componentName: 'Badge',
  controls: {
    tone: toneControl(),
    size: sizeControl(),
    children: childrenControl('New'),
  },
  render: (props) => (
    <Badge
      tone={props.tone as 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'}
      size={props.size as 'sm' | 'md' | 'lg'}
    >
      {props.children as string}
    </Badge>
  ),
  whenToUsePreviews: {
    use: () => (
      <ListItem
        as="a"
        href="#"
        label="Inbox"
        trailing={<Badge>12</Badge>}
        style={{ width: '100%', maxWidth: '16rem' }}
      />
    ),
    doNotUse: () => <span>Inbox (12)</span>,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Settings row',
      description: 'Compact status label in a settings list row.',
      code: `<ListItem
  label="Workspace"
  description="Team collaboration"
  trailing={<Badge tone="info">New</Badge>}
/>`,
      render: () => (
        <ListItem
          style={{ width: '100%', maxWidth: '24rem' }}
          label="Workspace"
          description="Team collaboration"
          trailing={<Badge tone="info">New</Badge>}
        />
      ),
    },
    {
      label: 'Member role',
      description: 'Role badge on a team member list item.',
      code: `<ListItem
  label="Alex Chen"
  description="Engineering lead"
  trailing={<Badge tone="success" size="sm">Active</Badge>}
/>`,
      render: () => (
        <ListItem
          style={{ width: '100%', maxWidth: '24rem' }}
          label="Alex Chen"
          description="Engineering lead"
          trailing={<Badge tone="success" size="sm">Active</Badge>}
        />
      ),
    },
    {
      label: 'Navigation count',
      description: 'Unread count badge beside a sidebar navigation label.',
      code: `<ListItem as="a" href="/inbox" label="Inbox" trailing={<Badge>12</Badge>} />`,
      render: () => (
        <ListItem
          as="a"
          href="#"
          label="Inbox"
          trailing={<Badge>12</Badge>}
          style={{ width: '100%', maxWidth: '24rem' }}
        />
      ),
    },
  ];
  return doc;
})();
