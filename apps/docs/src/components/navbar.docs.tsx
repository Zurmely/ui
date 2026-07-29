import { Navbar, NavbarLogo, NavbarContent, NavbarItem } from '@z-ui/react';
import { Link } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const navbarDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'navbar',
  name: 'Navbar',
  category: 'Navigation',
  summary: 'Top navigation bar with logo and links.',
  importPath: '@z-ui/react',
  componentName: 'Navbar',
  controls: {},
  render: () => (
    <Navbar style={{ width: '100%' }}>
      <NavbarLogo>Z-UI</NavbarLogo>
      <NavbarContent>
        <NavbarItem>
          <Link href="#">Docs</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Components</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  ),
  code: () => `<Navbar>
  <NavbarLogo>Z-UI</NavbarLogo>
  <NavbarContent>
    <NavbarItem><Link href="#">Docs</Link></NavbarItem>
  </NavbarContent>
</Navbar>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<navbar />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<navbar />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<navbar />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
