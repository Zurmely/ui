import { Megamenu, MegamenuContent, MegamenuItem, MegamenuTrigger } from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const megamenuDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'megamenu',
  name: 'Megamenu',
  category: 'Navigation',
  summary: 'Large dropdown navigation panel.',
  importPath: '@z-ui/react',
  componentName: 'Megamenu',
  controls: {},
  render: () => (
    <Megamenu>
      <MegamenuTrigger asChild>
        <Button variant="secondary">Products</Button>
      </MegamenuTrigger>
      <MegamenuContent>
        <MegamenuItem href="#">Analytics</MegamenuItem>
        <MegamenuItem href="#">Automation</MegamenuItem>
        <MegamenuItem href="#">Integrations</MegamenuItem>
      </MegamenuContent>
    </Megamenu>
  ),
  code: () => `<Megamenu>
  <MegamenuTrigger asChild>
    <Button variant="secondary">Products</Button>
  </MegamenuTrigger>
  <MegamenuContent>
    <MegamenuItem href="#">Analytics</MegamenuItem>
  </MegamenuContent>
</Megamenu>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<megamenu />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<megamenu />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<megamenu />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
