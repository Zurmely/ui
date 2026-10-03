import { Link, Tabs, TabsContent, TabsList, TabsTrigger } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const tabsDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Overlays',
    summary:
      'In-page panels switched from a tab list. Pair every TabsTrigger with a matching TabsContent.',
    importPath: '@z-ux/ui/tabs',
    componentName: 'Tabs',
    controls: {
      defaultValue: {
        type: 'select',
        label: 'default tab',
        options: ['account', 'password'],
        defaultValue: 'account',
      },
    },
    render: (props) => (
      <Tabs defaultValue={props.defaultValue as string} style={{ width: '100%', maxWidth: '24rem' }}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    ),
    code: (props) => `<Tabs defaultValue="${props.defaultValue}">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>`,
    whenToUsePreviews: {
      use: () => (
        <Tabs defaultValue="account" style={{ width: '100%', maxWidth: '24rem' }}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings</TabsContent>
          <TabsContent value="password">Password settings</TabsContent>
        </Tabs>
      ),
      doNotUse: () => (
        <nav style={{ display: 'flex', gap: 'var(--z-spacing-gap-component)' }}>
          <Link href="#">Home</Link>
          <Link href="#">Projects</Link>
          <Link href="#">Settings</Link>
        </nav>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Account settings',
      description: 'Switch between account and password panels.',
      code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>`,
      render: () => (
        <Tabs defaultValue="account" style={{ width: '100%', maxWidth: '24rem' }}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings</TabsContent>
          <TabsContent value="password">Password settings</TabsContent>
        </Tabs>
      ),
    },
    {
      label: 'Dashboard views',
      description: 'Tabs for switching chart time ranges.',
      code: `<Tabs defaultValue="week">
  <TabsList>
    <TabsTrigger value="week">Week</TabsTrigger>
    <TabsTrigger value="month">Month</TabsTrigger>
    <TabsTrigger value="year">Year</TabsTrigger>
  </TabsList>
  <TabsContent value="week">Weekly traffic</TabsContent>
  <TabsContent value="month">Monthly traffic</TabsContent>
  <TabsContent value="year">Yearly traffic</TabsContent>
</Tabs>`,
      render: () => (
        <Tabs defaultValue="week" style={{ width: '100%', maxWidth: '24rem' }}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <TabsContent value="week">Weekly traffic</TabsContent>
          <TabsContent value="month">Monthly traffic</TabsContent>
          <TabsContent value="year">Yearly traffic</TabsContent>
        </Tabs>
      ),
    },
    {
      label: 'Documentation',
      description: 'Tabs for API reference sections.',
      code: `<Tabs defaultValue="usage">
  <TabsList>
    <TabsTrigger value="usage">Usage</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
  </TabsList>
  <TabsContent value="usage">How to use this component.</TabsContent>
  <TabsContent value="api">Props and types.</TabsContent>
</Tabs>`,
      render: () => (
        <Tabs defaultValue="usage" style={{ width: '100%', maxWidth: '24rem' }}>
          <TabsList>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="usage">How to use this component.</TabsContent>
          <TabsContent value="api">Props and types.</TabsContent>
        </Tabs>
      ),
    },
  ];
  return doc;
})();
