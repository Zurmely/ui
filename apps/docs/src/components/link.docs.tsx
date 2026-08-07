import { Button, Link } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, childrenControl } from './shared-controls';

export const linkDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'link',
  name: 'Link',
  category: 'Actions',
  summary: 'Styled anchor for navigation.',
  importPath: '@z-ux/ui/link',
  componentName: 'Link',
  controls: {
    children: childrenControl('Learn more'),
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <p>
      Open the{' '}
      <Link href="#" disabled={props.disabled as boolean}>
        {props.children as string}
      </Link>
      {' '}page for full documentation.
    </p>
  ),
  whenToUsePreviews: {
    use: () => (
      <p>
        Read the{' '}
        <Link href="#">API reference</Link>
        {' '}for integration details.
      </p>
    ),
    doNotUse: () => <Button variant="ghost" size="sm">API reference</Button>,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Inline link',
      description: 'Text link within a paragraph.',
      code: '<Link href="#">Learn more</Link>',
      render: () => <Link href="#">Learn more</Link>,
    },
    {
      label: 'Navigation link',
      description: 'Standalone link in a header or footer.',
      code: '<Link href="/docs">Documentation</Link>',
      render: () => <Link href="/docs">Documentation</Link>,
    },
    {
      label: 'Disabled link',
      description: 'Unavailable destination while permissions are loading.',
      code: '<Link href="#" disabled>Admin settings</Link>',
      render: () => <Link href="#" disabled>Admin settings</Link>,
    },
  ];
  return doc;
})();
