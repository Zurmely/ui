import { Link } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, childrenControl } from './shared-controls';

export const linkDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'link',
  name: 'Link',
  category: 'Actions',
  summary: 'Styled anchor for navigation.',
  importPath: '@z-ui/react/link',
  componentName: 'Link',
  controls: {
    children: childrenControl('Learn more'),
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <Link href="#" disabled={props.disabled as boolean}>
      {props.children as string}
    </Link>
  ),
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<link />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<link />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<link />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
