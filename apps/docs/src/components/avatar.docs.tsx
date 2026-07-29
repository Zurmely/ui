import { Avatar } from '@z-ui/react';
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
  importPath: '@z-ui/react/avatar',
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<avatar />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, src: 'image' }) : '<avatar />',
      render: () => doc.render({ ...defaults, src: 'image' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<avatar />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
