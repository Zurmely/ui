import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const accordionDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Overlays',
    summary: 'Vertically stacked expandable sections.',
    importPath: '@z-ux/ui/accordion',
    componentName: 'Accordion',
    controls: {
      type: {
        type: 'select',
        label: 'type',
        options: ['single', 'multiple'],
        defaultValue: 'single',
      },
      collapsible: { type: 'boolean', label: 'collapsible', defaultValue: true },
    },
    render: (props) =>
      props.type === 'multiple' ? (
        <Accordion
          type="multiple"
          defaultValue={['item-1']}
          style={{ width: '100%', maxWidth: '24rem' }}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It uses semantic Z-UI tokens.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Accordion
          type="single"
          collapsible={props.collapsible as boolean}
          defaultValue="item-1"
          style={{ width: '100%', maxWidth: '24rem' }}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It uses semantic Z-UI tokens.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    code: (props) => `<Accordion type="${props.type}"${props.collapsible ? ' collapsible' : ''} defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    whenToUsePreviews: {
      use: () => (
        <Accordion type="single" collapsible defaultValue="item-1" style={{ width: '100%', maxWidth: '24rem' }}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It follows the WAI-ARIA accordion pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It uses semantic Z-UI tokens.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
      doNotUse: () => (
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'FAQ section',
      description: 'Single collapsible panel for frequently asked questions.',
      code: `<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows the WAI-ARIA accordion pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      render: () => (
        <Accordion type="single" collapsible defaultValue="item-1" style={{ width: '100%', maxWidth: '24rem' }}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It follows the WAI-ARIA accordion pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It uses semantic Z-UI tokens.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      label: 'Multiple sections',
      description: 'Allow more than one section to stay open at a time.',
      code: `<Accordion type="multiple" defaultValue={['billing', 'shipping']}>
  <AccordionItem value="billing">...</AccordionItem>
  <AccordionItem value="shipping">...</AccordionItem>
</Accordion>`,
      render: () => (
        <Accordion type="multiple" defaultValue={['billing', 'shipping']} style={{ width: '100%', maxWidth: '24rem' }}>
          <AccordionItem value="billing">
            <AccordionTrigger>Billing</AccordionTrigger>
            <AccordionContent>Update payment method and invoices.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionContent>Manage delivery addresses.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      label: 'Settings group',
      description: 'Group related settings in an expandable panel on a preferences page.',
      code: `<Accordion type="single" collapsible>
  <AccordionItem value="notifications">
    <AccordionTrigger>Notifications</AccordionTrigger>
    <AccordionContent>Email and push alert preferences.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      render: () => (
        <Accordion type="single" collapsible style={{ width: '100%', maxWidth: '24rem' }}>
          <AccordionItem value="notifications">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>Email and push alert preferences.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="privacy">
            <AccordionTrigger>Privacy</AccordionTrigger>
            <AccordionContent>Control data sharing and visibility.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
