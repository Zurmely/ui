import {
  Avatar,
  Stack,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { sizeControl, textControl } from './shared-controls';

interface AvatarPlaygroundProps {
  size: string;
  fallback: string;
  src: string;
}

export const avatarDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'avatar',
  name: 'Avatar',
  category: 'Display',
  summary: 'Displays a user image with fallback initials.',
  importPath: '@z-ux/ui/avatar',
  componentName: 'Avatar',
  controls: {
    size: sizeControl(),
    fallback: textControl('fallback', 'JD'),
    src: {
      type: 'select',
      label: 'src',
      options: ['none', 'image'],
      defaultValue: 'none',
    },
  },
  render: (props) => (
    <Avatar
      size={props.size as 'sm' | 'md' | 'lg'}
      fallback={props.fallback as string}
      src={
        props.src === 'image'
          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop'
          : undefined
      }
      alt="User avatar"
    />
  ),
  code: (props) => {
    const parts = [
      props.size !== 'md' ? `size="${props.size}"` : null,
      `fallback="${props.fallback}"`,
      props.src === 'image'
        ? 'src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop"'
        : null,
      'alt="User avatar"',
    ].filter(Boolean);
    return `<Avatar ${parts.join(' ')} />`;
  },
  whenToUsePreviews: {
    use: () => (
      <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
        <Avatar fallback="MR" alt="Morgan Reed" />
        <span>Morgan Reed</span>
      </Stack>
    ),
    doNotUse: () => <span>MR</span>,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Initials fallback',
      description: 'Show user initials when no image is available.',
      code: '<Avatar fallback="JD" alt="Jane Doe" />',
      render: () => <Avatar fallback="JD" alt="Jane Doe" />,
    },
    {
      label: 'Large profile',
      description: 'Larger avatar for profile headers and account settings.',
      code: '<Avatar size="lg" fallback="AC" alt="Alex Chen" />',
      render: () => <Avatar size="lg" fallback="AC" alt="Alex Chen" />,
    },
    {
      label: 'Team member row',
      description: 'Avatar paired with a name in a member list.',
      code: `<Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
  <Avatar fallback="MR" alt="Morgan Reed" />
  <span>Morgan Reed</span>
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Avatar fallback="MR" alt="Morgan Reed" />
          <span>Morgan Reed</span>
        </Stack>
      ),
    },
  ];
  return doc;
})();
