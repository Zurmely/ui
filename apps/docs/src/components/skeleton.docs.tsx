import {
  Skeleton,
  Spinner,
  Stack,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const skeletonDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'skeleton',
  name: 'Skeleton',
  category: 'Display',
  summary:
      'Decorative shimmer by default (aria-hidden). Set aria-label for a polite status, or size with a text role.',
  importPath: '@z-ux/ui/skeleton',
  componentName: 'Skeleton',
  controls: {
    radius: {
      type: 'select',
      label: 'radius',
      options: ['control', 'control-compact', 'surface', 'container', 'pill', 'circle'],
      defaultValue: 'control',
    },
    text: {
      type: 'select',
      label: 'text',
      options: ['none', 'body', 'title', 'caption', 'label', 'control', 'h1', 'h2'],
      defaultValue: 'none',
    },
    width: { type: 'number', label: 'width', defaultValue: 200, min: 50, max: 400 },
  },
  render: (props) => (
    <Skeleton
      radius={
        props.radius as
          | 'control'
          | 'control-compact'
          | 'surface'
          | 'container'
          | 'pill'
          | 'circle'
      }
      text={
        props.text === 'none'
          ? undefined
          : (props.text as 'body' | 'title' | 'caption' | 'label' | 'control' | 'h1' | 'h2')
      }
      width={props.width as number}
    />
  ),
  code: (props) => {
    const parts = [
      props.radius !== 'control' ? `radius="${props.radius}"` : null,
      props.text !== 'none' ? `text="${props.text}"` : null,
      `width={${props.width}}`,
    ].filter(Boolean);
    return `<Skeleton ${parts.join(' ')} />`;
  },
  whenToUsePreviews: {
    use: () => <Skeleton text="body" width={200} />,
    doNotUse: () => <Spinner aria-label="Loading" />,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Text placeholder',
      description: 'Loading placeholder for body copy.',
      code: '<Skeleton text="body" width={240} />',
      render: () => <Skeleton text="body" width={240} />,
    },
    {
      label: 'Avatar loading',
      description: 'Circular skeleton while profile data loads.',
      code: '<Skeleton radius="circle" width={40} height={40} />',
      render: () => <Skeleton radius="circle" width={40} height={40} />,
    },
    {
      label: 'Named status',
      description: 'aria-label promotes the skeleton to role="status" with aria-busy.',
      code: '<Skeleton text="title" width={180} aria-label="Loading article" />',
      render: () => <Skeleton text="title" width={180} aria-label="Loading article" />,
    },
    {
      label: 'Card loading',
      description: 'Skeleton layout matching a content card.',
      code: `<Stack gap="sm">
  <Skeleton text="title" width={180} />
  <Skeleton text="body" width={280} />
  <Skeleton radius="control" width={120} height={32} />
</Stack>`,
      render: () => (
        <Stack gap="sm" style={{ width: '100%', maxWidth: '20rem' }}>
          <Skeleton text="title" width={180} />
          <Skeleton text="body" width={280} />
          <Skeleton radius="control" width={120} height={32} />
        </Stack>
      ),
    },
  ];
  return doc;
})();
