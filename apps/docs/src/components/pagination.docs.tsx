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
          <PaginationLink href="#" current>
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
    summary:
      'Previous, next, page numbers, and ellipsis. Set current on PaginationLink for the active page.',
    importPath: '@z-ux/ui',
    componentName: 'Pagination',
    controls: {
      page: { type: 'number', label: 'current page', defaultValue: 2, min: 1, max: 10 },
    },
    render: (props) => {
      const page = props.page as number;
      return (
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Previous page" disabled={page <= 1}>
              ‹
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" current={page === 1}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" current={page === 2}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" current={page === 3}>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" current={page >= 10}>
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Next page" disabled={page >= 10}>
              ›
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      );
    },
    code: (props) => {
      const page = props.page as number;
      return `<Pagination>
  <PaginationItem>
    <PaginationLink href="#" aria-label="Previous page"${page <= 1 ? ' disabled' : ''}>‹</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#"${page === 1 ? ' current' : ''}>1</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#"${page === 2 ? ' current' : ''}>2</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#"${page === 3 ? ' current' : ''}>3</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" aria-label="Next page"${page >= 10 ? ' disabled' : ''}>›</PaginationLink>
  </PaginationItem>
</Pagination>`;
    },
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
      description: 'Pagination below a data table. current marks the active page.',
      code: `<Stack gap="md">
  <Table>...</Table>
  <Pagination>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" current>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
  </Pagination>
</Stack>`,
      render: () => miniTableWithPagination(),
    },
    {
      label: 'First page',
      description: 'Disable Previous on page 1 so users cannot go before the start.',
      code: `<Pagination>
  <PaginationItem>
    <PaginationLink href="#" aria-label="Previous page" disabled>‹</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" current>1</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">2</PaginationLink>
  </PaginationItem>
</Pagination>`,
      render: () => (
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Previous page" disabled>
              ‹
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" current>
              1
            </PaginationLink>
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
      description: 'Disable Next on the last page. Use PaginationEllipsis for skipped ranges.',
      code: `<Pagination>
  <PaginationItem>
    <PaginationLink href="#" aria-label="Previous page">‹</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">9</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" current>10</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" aria-label="Next page" disabled>›</PaginationLink>
  </PaginationItem>
</Pagination>`,
      render: () => (
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Previous page">
              ‹
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" current>
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Next page" disabled>
              ›
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      ),
    },
  ];
  return doc;
})();
