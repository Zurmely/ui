import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const accordionDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'accordion',
  name: 'Accordion',
  category: 'Overlays',
  summary: 'Vertically stacked expandable sections.',
  importPath: '@z-ui/react/accordion',
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<accordion />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, type: 'multiple', collapsible: false }) : '<accordion />',
      render: () => doc.render({ ...defaults, type: 'multiple', collapsible: false }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<accordion />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
