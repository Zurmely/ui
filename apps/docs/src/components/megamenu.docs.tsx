import {
  Button,
  Megamenu,
  MegamenuContent,
  MegamenuItem,
  MegamenuTrigger,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Stack,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

function sectionLabel(text: string) {
  return (
    <span
      style={{
        fontWeight: 'var(--z-text-label-weight)',
        fontSize: 'var(--z-text-label-size)',
        color: 'var(--z-color-text-secondary)',
      }}
    >
      {text}
    </span>
  );
}

function productCategoriesMegamenu({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <Megamenu defaultOpen={defaultOpen}>
      <MegamenuTrigger asChild>
        <Button variant="secondary">Products</Button>
      </MegamenuTrigger>
      <MegamenuContent>
        <Stack gap="sm">
          {sectionLabel('Platform')}
          <MegamenuItem href="#" selected>Analytics</MegamenuItem>
          <MegamenuItem href="#">Automation</MegamenuItem>
          <MegamenuItem href="#">Integrations</MegamenuItem>
        </Stack>
        <Stack gap="sm">
          {sectionLabel('Solutions')}
          <MegamenuItem href="#">Enterprise</MegamenuItem>
          <MegamenuItem href="#">Startups</MegamenuItem>
          <MegamenuItem href="#">Agencies</MegamenuItem>
        </Stack>
      </MegamenuContent>
    </Megamenu>
  );
}

export const megamenuDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'megamenu',
    name: 'Megamenu',
    category: 'Navigation',
    summary:
      'Wide navigation panel on Popover. MegamenuItem is a plain anchor. Use selected for the current destination.',
    importPath: '@z-ux/ui',
    componentName: 'Megamenu',
    controls: {},
    render: () => productCategoriesMegamenu({}),
    code: () => `<Megamenu>
  <MegamenuTrigger asChild>
    <Button variant="secondary">Products</Button>
  </MegamenuTrigger>
  <MegamenuContent>
    <Stack gap="sm">
      <span>Platform</span>
      <MegamenuItem href="#">Analytics</MegamenuItem>
      <MegamenuItem href="#">Automation</MegamenuItem>
    </Stack>
    <Stack gap="sm">
      <span>Solutions</span>
      <MegamenuItem href="#">Enterprise</MegamenuItem>
      <MegamenuItem href="#">Startups</MegamenuItem>
    </Stack>
  </MegamenuContent>
</Megamenu>`,
    whenToUsePreviews: {
      use: () => productCategoriesMegamenu({ defaultOpen: true }),
      doNotUse: () => (
        <Menu defaultOpen>
          <MenuTrigger asChild>
            <Button variant="secondary">Account</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Log out</MenuItem>
          </MenuContent>
        </Menu>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Product categories',
      description: 'Multi-column panel grouped by product area.',
      code: `<Megamenu>
  <MegamenuTrigger asChild><Button variant="secondary">Products</Button></MegamenuTrigger>
  <MegamenuContent>
    <Stack gap="sm">
      <span>Platform</span>
      <MegamenuItem href="#">Analytics</MegamenuItem>
      <MegamenuItem href="#">Automation</MegamenuItem>
    </Stack>
    <Stack gap="sm">
      <span>Solutions</span>
      <MegamenuItem href="#">Enterprise</MegamenuItem>
      <MegamenuItem href="#">Startups</MegamenuItem>
    </Stack>
  </MegamenuContent>
</Megamenu>`,
      render: () => productCategoriesMegamenu({}),
    },
    {
      label: 'Solutions menu',
      description: 'Megamenu for solution verticals on a marketing site.',
      code: `<Megamenu>
  <MegamenuTrigger asChild><Button variant="ghost">Solutions</Button></MegamenuTrigger>
  <MegamenuContent>
    <Stack gap="sm">
      <span>By team</span>
      <MegamenuItem href="#">Enterprise</MegamenuItem>
      <MegamenuItem href="#">Startups</MegamenuItem>
    </Stack>
    <Stack gap="sm">
      <span>By industry</span>
      <MegamenuItem href="#">Healthcare</MegamenuItem>
      <MegamenuItem href="#">Finance</MegamenuItem>
    </Stack>
  </MegamenuContent>
</Megamenu>`,
      render: () => (
        <Megamenu>
          <MegamenuTrigger asChild>
            <Button variant="ghost">Solutions</Button>
          </MegamenuTrigger>
          <MegamenuContent>
            <Stack gap="sm">
              {sectionLabel('By team')}
              <MegamenuItem href="#">Enterprise</MegamenuItem>
              <MegamenuItem href="#">Startups</MegamenuItem>
              <MegamenuItem href="#">Agencies</MegamenuItem>
            </Stack>
            <Stack gap="sm">
              {sectionLabel('By industry')}
              <MegamenuItem href="#">Healthcare</MegamenuItem>
              <MegamenuItem href="#">Finance</MegamenuItem>
              <MegamenuItem href="#">Retail</MegamenuItem>
            </Stack>
          </MegamenuContent>
        </Megamenu>
      ),
    },
    {
      label: 'Resources hub',
      description: 'Grouped links to docs, blog, and support.',
      code: `<Megamenu>
  <MegamenuTrigger asChild><Button variant="secondary">Resources</Button></MegamenuTrigger>
  <MegamenuContent>
    <Stack gap="sm">
      <span>Learn</span>
      <MegamenuItem href="#">Documentation</MegamenuItem>
      <MegamenuItem href="#">Blog</MegamenuItem>
    </Stack>
    <Stack gap="sm">
      <span>Support</span>
      <MegamenuItem href="#">Help center</MegamenuItem>
      <MegamenuItem href="#">Contact</MegamenuItem>
    </Stack>
  </MegamenuContent>
</Megamenu>`,
      render: () => (
        <Megamenu>
          <MegamenuTrigger asChild>
            <Button variant="secondary">Resources</Button>
          </MegamenuTrigger>
          <MegamenuContent>
            <Stack gap="sm">
              {sectionLabel('Learn')}
              <MegamenuItem href="#">Documentation</MegamenuItem>
              <MegamenuItem href="#">Blog</MegamenuItem>
              <MegamenuItem href="#">Changelog</MegamenuItem>
            </Stack>
            <Stack gap="sm">
              {sectionLabel('Support')}
              <MegamenuItem href="#">Help center</MegamenuItem>
              <MegamenuItem href="#">Contact</MegamenuItem>
              <MegamenuItem href="#">Status</MegamenuItem>
            </Stack>
          </MegamenuContent>
        </Megamenu>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
