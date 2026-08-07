import { Button, Link, Navbar, NavbarContent, NavbarItem, NavbarLogo, Tabs, TabsContent, TabsList, TabsTrigger } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const navbarDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'navbar',
    name: 'Navbar',
    category: 'Navigation',
    summary: 'Top navigation bar with logo and links.',
    importPath: '@z-ux/ui',
    componentName: 'Navbar',
    controls: {
      brand: textControl('brand', 'Z-UI'),
    },
    render: (props) => (
      <Navbar style={{ width: '100%' }}>
        <NavbarLogo>{props.brand as string}</NavbarLogo>
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
    code: (props) => `<Navbar>
  <NavbarLogo>${props.brand}</NavbarLogo>
  <NavbarContent>
    <NavbarItem><Link href="#">Docs</Link></NavbarItem>
  </NavbarContent>
</Navbar>`,
    whenToUsePreviews: {
      use: () => (
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
      doNotUse: () => (
        <Tabs defaultValue="account" style={{ width: '100%' }}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings</TabsContent>
          <TabsContent value="password">Password settings</TabsContent>
        </Tabs>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'App header',
      description: 'Top bar with logo and primary navigation links.',
      code: `<Navbar>
  <NavbarLogo>Z-UI</NavbarLogo>
  <NavbarContent>
    <NavbarItem><Link href="#">Docs</Link></NavbarItem>
    <NavbarItem><Link href="#">Components</Link></NavbarItem>
  </NavbarContent>
</Navbar>`,
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
      fullWidth: true,
    },
    {
      label: 'Marketing nav',
      description: 'Navbar for a landing page with product links and a CTA.',
      code: `<Navbar>
  <NavbarLogo>Acme</NavbarLogo>
  <NavbarContent>
    <NavbarItem><Link href="#">Pricing</Link></NavbarItem>
    <NavbarItem><Link href="#">About</Link></NavbarItem>
    <NavbarItem><Button variant="primary" size="sm">Get started</Button></NavbarItem>
  </NavbarContent>
</Navbar>`,
      render: () => (
        <Navbar style={{ width: '100%' }}>
          <NavbarLogo>Acme</NavbarLogo>
          <NavbarContent>
            <NavbarItem>
              <Link href="#">Pricing</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#">About</Link>
            </NavbarItem>
            <NavbarItem>
              <Button variant="primary" size="sm">
                Get started
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      ),
      fullWidth: true,
    },
    {
      label: 'Docs site',
      description: 'Navigation for a documentation site with foundations and components.',
      code: `<Navbar>
  <NavbarLogo>Design System</NavbarLogo>
  <NavbarContent>
    <NavbarItem><Link href="#">Foundations</Link></NavbarItem>
    <NavbarItem><Link href="#">Patterns</Link></NavbarItem>
    <NavbarItem><Button variant="secondary" size="sm">Sign in</Button></NavbarItem>
  </NavbarContent>
</Navbar>`,
      render: () => (
        <Navbar style={{ width: '100%' }}>
          <NavbarLogo>Design System</NavbarLogo>
          <NavbarContent>
            <NavbarItem>
              <Link href="#">Foundations</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#">Patterns</Link>
            </NavbarItem>
            <NavbarItem>
              <Button variant="secondary" size="sm">
                Sign in
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
