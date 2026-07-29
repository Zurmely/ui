import { Tabs, TabsContent, TabsList, TabsTrigger } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const tabsDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'tabs',
  name: 'Tabs',
  category: 'Overlays',
  summary: 'Tabbed content panels.',
  importPath: '@z-ui/react/tabs',
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<tabs />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, defaultValue: 'password' }) : '<tabs />',
      render: () => doc.render({ ...defaults, defaultValue: 'password' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<tabs />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
