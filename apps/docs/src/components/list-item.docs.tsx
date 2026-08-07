import {
  Avatar,
  Badge,
  Button,
  ListItem,
  ListItemIcon,
  Switch,
  Toolbar,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { sizeControl, textControl } from './shared-controls';

const bellIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 2a3.5 3.5 0 0 0-3.5 3.5v1.6c0 .6-.2 1.2-.6 1.7L3 10h10l-.9-1.2c-.4-.5-.6-1.1-.6-1.7V5.5A3.5 3.5 0 0 0 8 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const listItemDoc: ComponentDoc = {
  slug: 'list-item',
  name: 'ListItem',
  category: 'Layout',
  summary:
    'Unified row layout for lists, settings, navigation, and flexible compositions with open leading and trailing slots.',
  importPath: '@z-ux/ui/list-item',
  componentName: 'ListItem',
  controls: {
    label: textControl('label', 'Notifications'),
    description: textControl('description', 'Email and push alerts'),
    size: sizeControl(),
    align: {
      type: 'select',
      label: 'align',
      options: ['center', 'start'],
      defaultValue: 'center',
    },
    variant: {
      type: 'select',
      label: 'variant',
      options: ['plain', 'contained', 'compact'],
      defaultValue: 'plain',
    },
    as: {
      type: 'select',
      label: 'as',
      options: ['div', 'li', 'a', 'button'],
      defaultValue: 'div',
    },
    interactive: {
      type: 'boolean',
      label: 'interactive',
      defaultValue: false,
    },
    selected: {
      type: 'boolean',
      label: 'selected',
      defaultValue: false,
    },
  },
  render: (props) => (
    <ListItem
      style={{ width: '100%', maxWidth: '24rem' }}
      as={props.as as 'div' | 'li' | 'a' | 'button'}
      href={props.as === 'a' ? '#' : undefined}
      size={props.size as 'sm' | 'md' | 'lg'}
      align={props.align as 'start' | 'center'}
      variant={props.variant as 'plain' | 'contained' | 'compact'}
      interactive={props.interactive as boolean}
      selected={props.selected as boolean}
      leading={<ListItemIcon>{bellIcon}</ListItemIcon>}
      label={props.label as string}
      description={props.description as string}
      trailing={<Badge tone="info">New</Badge>}
    />
  ),
  code: (props) => `<ListItem
  as="${props.as}"
  variant="${props.variant}"
  size="${props.size}"
  align="${props.align}"
  interactive={${props.interactive}}
  selected={${props.selected}}
  leading={<ListItemIcon><BellIcon /></ListItemIcon>}
  label="${props.label}"
  description="${props.description}"
  trailing={<Badge tone="info">New</Badge>}
/>`,
  whenToUsePreviews: {
    use: () => (
      <ListItem
        variant="contained"
        style={{ width: '100%', maxWidth: '20rem' }}
        leading={<ListItemIcon>{bellIcon}</ListItemIcon>}
        label="Notifications"
        description="Email and push alerts"
        trailing={<Badge tone="info">New</Badge>}
      />
    ),
    doNotUse: () => (
      <Toolbar label="Notifications" style={{ width: '100%', maxWidth: '20rem' }}>
        <Button size="sm" variant="ghost">
          Settings
        </Button>
      </Toolbar>
    ),
  },
  examples: [
    {
      label: 'Contained',
      description: 'Card-style list item with icon and badge.',
      code: `<ListItem
  variant="contained"
  leading={<ListItemIcon><BellIcon /></ListItemIcon>}
  label="Notifications"
  description="Email and push alerts"
  trailing={<Badge tone="info">New</Badge>}
/>`,
      render: () => (
        <ListItem
          variant="contained"
          style={{ width: '100%', maxWidth: '24rem' }}
          leading={<ListItemIcon>{bellIcon}</ListItemIcon>}
          label="Notifications"
          description="Email and push alerts"
          trailing={<Badge tone="info">New</Badge>}
        />
      ),
    },
    {
      label: 'Compact nav',
      description: 'Compact navigation link with selected state.',
      code: `<ListItem variant="compact" as="a" href="/inbox" label="Inbox" selected />`,
      render: () => (
        <ListItem variant="compact" as="a" href="#" label="Inbox" selected style={{ width: '100%', maxWidth: '24rem' }} />
      ),
    },
    {
      label: 'List row',
      description: 'User row inside a list with avatar and role badge.',
      code: `<ul>
  <ListItem as="li" leading={<Avatar fallback="JD" alt="Jane Doe" />} label="Jane Doe" description="Product designer" trailing={<Badge tone="primary">Admin</Badge>} />
</ul>`,
      render: () => (
        <ul style={{ width: '100%', maxWidth: '24rem', margin: 0, padding: 0, listStyle: 'none' }}>
          <ListItem
            as="li"
            leading={<Avatar fallback="JD" alt="Jane Doe" />}
            label="Jane Doe"
            description="Product designer"
            trailing={<Badge tone="primary">Admin</Badge>}
          />
        </ul>
      ),
    },
    {
      label: 'Setting row',
      description: 'Settings list with a trailing switch control.',
      code: `<ListItem label="Email notifications" description="Receive updates by email" control={<Switch />} />`,
      render: () => (
        <ListItem
          style={{ width: '100%', maxWidth: '24rem' }}
          label="Email notifications"
          description="Receive updates by email"
          control={<Switch aria-label="Email notifications" />}
        />
      ),
    },
    {
      label: 'Inbox nav',
      description: 'Navigation item with unread count badge.',
      code: `<ListItem as="a" href="/inbox" label="Inbox" selected trailing={<Badge>12</Badge>} />`,
      render: () => (
        <ListItem as="a" href="#" label="Inbox" selected trailing={<Badge>12</Badge>} style={{ width: '100%', maxWidth: '24rem' }} />
      ),
    },
  ],
};
