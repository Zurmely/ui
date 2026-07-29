import { Skeleton } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const skeletonDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'skeleton',
  name: 'Skeleton',
  category: 'Display',
  summary: 'Placeholder loading state.',
  importPath: '@z-ui/react/skeleton',
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
      options: ['none', 'body', 'title', 'caption'],
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
      text={props.text === 'none' ? undefined : (props.text as 'body' | 'title' | 'caption')}
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<skeleton />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, radius: 'control-compact', text: 'body', width: 201 }) : '<skeleton />',
      render: () => doc.render({ ...defaults, radius: 'control-compact', text: 'body', width: 201 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<skeleton />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
