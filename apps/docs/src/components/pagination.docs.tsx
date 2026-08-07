import {
  Button,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

function miniTableWithPagination() {
  return (
    <Stack gap="md" style={{ width: '100%', maxWidth: '24rem' }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alex Kim</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jamie Lee</TableCell>
            <TableCell>Editor</TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Next page">
            ›
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Stack>
  );
}

export const paginationDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    summary: 'Navigate between pages of content.',
    importPath: '@z-ux/ui',
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
    whenToUsePreviews: {
      use: () => miniTableWithPagination(),
      doNotUse: () => (
        <Button variant="secondary" size="sm">
          Load more
        </Button>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Table pages',
      description: 'Pagination below a data table.',
      code: `<Stack gap="md">
  <Table>...</Table>
  <Pagination>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" aria-current="page">2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
  </Pagination>
</Stack>`,
      render: () => miniTableWithPagination(),
    },
    {
      label: 'First page',
      description: 'Pagination at the start of a result set.',
      code: `<Pagination>
  <PaginationItem><PaginationLink href="#" aria-current="page">1</PaginationLink></PaginationItem>
  <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
</Pagination>`,
      render: () => (
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" aria-current="page">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
        </Pagination>
      ),
    },
    {
      label: 'Last page',
      description: 'Pagination near the end of a long list.',
      code: `<Pagination>
  <PaginationItem><PaginationLink href="#">9</PaginationLink></PaginationItem>
  <PaginationItem><PaginationLink href="#" aria-current="page">10</PaginationLink></PaginationItem>
</Pagination>`,
      render: () => (
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Previous page">‹</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" aria-current="page">10</PaginationLink>
          </PaginationItem>
        </Pagination>
      ),
    },
  ];
  return doc;
})();
