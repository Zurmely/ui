import { Badge } from '@z-ui/react';
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
  importPath: '@z-ui/react/badge',
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<badge />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<badge />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<badge />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
