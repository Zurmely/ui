import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const paginationDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'pagination',
  name: 'Pagination',
  category: 'Navigation',
  summary: 'Navigate between pages of content.',
  importPath: '@z-ui/react',
  componentName: 'Pagination',
  controls: {
    page: { type: 'number', label: 'current page', defaultValue: 2, min: 1, max: 10 },
  },
  render: (props) => (
    <Pagination>
      <PaginationItem>
        <PaginationLink href="#" aria-label="Previous page">
          ‹
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" aria-current="page">
          {props.page as number}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" aria-label="Next page">
          ›
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  ),
  code: (props) => `<Pagination>
  <PaginationItem>
    <PaginationLink href="#" aria-current="page">${props.page}</PaginationLink>
  </PaginationItem>
</Pagination>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<pagination />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, page: 3 }) : '<pagination />',
      render: () => doc.render({ ...defaults, page: 3 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<pagination />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
