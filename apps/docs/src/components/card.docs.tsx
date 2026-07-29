import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const cardDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'card',
  name: 'Card',
  category: 'Layout',
  summary: 'Container for grouped content with header, body, and footer.',
  importPath: '@z-ui/react/card',
  componentName: 'Card',
  controls: {
    title: textControl('title', 'Card title'),
    description: textControl('description', 'Card description goes here.'),
  },
  render: (props) => (
    <Card style={{ width: '100%', maxWidth: '24rem' }}>
      <CardHeader>
        <CardTitle>{props.title as string}</CardTitle>
        <CardDescription>{props.description as string}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area for additional details.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
  code: (props) => `<Card>
  <CardHeader>
    <CardTitle>${props.title}</CardTitle>
    <CardDescription>${props.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content area.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<card />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<card />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<card />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
