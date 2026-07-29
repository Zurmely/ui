import { Separator } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const separatorDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'separator',
  name: 'Separator',
  category: 'Display',
  summary: 'Visual divider between content sections.',
  importPath: '@z-ui/react/separator',
  componentName: 'Separator',
  controls: {
    orientation: {
      type: 'select',
      label: 'orientation',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
  },
  render: (props) => (
    <div
      style={{
        display: 'flex',
        flexDirection: props.orientation === 'vertical' ? 'row' : 'column',
        gap: '1rem',
        alignItems: 'center',
        width: props.orientation === 'vertical' ? 'auto' : '100%',
        height: props.orientation === 'vertical' ? '4rem' : 'auto',
      }}
    >
      <span>Above</span>
      <Separator orientation={props.orientation as 'horizontal' | 'vertical'} />
      <span>Below</span>
    </div>
  ),
  code: (props) => `<Separator orientation="${props.orientation}" />`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<separator />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, orientation: 'vertical' }) : '<separator />',
      render: () => doc.render({ ...defaults, orientation: 'vertical' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<separator />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
