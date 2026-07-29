import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumbs,
  BreadcrumbSeparator,
} from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const breadcrumbsDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'breadcrumbs',
  name: 'Breadcrumbs',
  category: 'Navigation',
  summary: 'Shows the current page location within a hierarchy.',
  importPath: '@z-ui/react',
  componentName: 'Breadcrumbs',
  controls: {},
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#" aria-current="page">
          Breadcrumbs
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
  code: () => `<Breadcrumbs>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="#" aria-current="page">Breadcrumbs</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumbs>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<breadcrumbs />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<breadcrumbs />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<breadcrumbs />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
