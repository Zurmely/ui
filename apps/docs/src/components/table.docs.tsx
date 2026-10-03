import {
  Badge,
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { textControl } from './shared-controls';

export const tableDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'table',
    name: 'Table',
    category: 'Data',
    summary:
      'Semantic table parts in a horizontally scrollable wrapper. ref attaches to the table, not the scroll wrapper.',
    importPath: '@z-ux/ui/table',
    componentName: 'Table',
    controls: {
      caption: textControl('caption', 'Recent invoices'),
    },
    render: (props) => (
      <Table>
        <TableCaption>{props.caption as string}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>
              <Badge tone="success" size="sm">
                Paid
              </Badge>
            </TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV002</TableCell>
            <TableCell>
              <Badge tone="warning" size="sm">
                Pending
              </Badge>
            </TableCell>
            <TableCell>$150.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    code: (props) => `<Table>
  <TableCaption>${props.caption}</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    whenToUsePreviews: {
      use: () => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>
                <Badge tone="success" size="sm">
                  Paid
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      doNotUse: () => (
        <div style={{ width: '100%', maxWidth: '14rem', fontSize: 'var(--z-text-caption-size)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--z-spacing-inset-compact)' }}>
            <span>Invoice</span>
            <span>Paid</span>
          </div>
        </div>
      ),
    },
  };
  doc.examples = [
    {
      label: 'Invoice list',
      description: 'Basic data table with caption and columns.',
      code: `<Table>
  <TableCaption>Recent invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      render: () => (
        <Table>
          <TableCaption>Recent invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>
                <Badge tone="success" size="sm">
                  Paid
                </Badge>
              </TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV002</TableCell>
              <TableCell>
                <Badge tone="warning" size="sm">
                  Pending
                </Badge>
              </TableCell>
              <TableCell>$150.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      fullWidth: true,
    },
    {
      label: 'User directory',
      description: 'Table listing team members and roles.',
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Jane Doe</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      render: () => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jane Doe</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Alex Chen</TableCell>
              <TableCell>Editor</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
    },
    {
      label: 'Status table',
      description: 'Table rows with status badges.',
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead />
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Invoice INV001</TableCell>
      <TableCell><Badge tone="success" size="sm">Paid</Badge></TableCell>
      <TableCell>
        <Menu>
          <MenuTrigger asChild>
            <Button variant="ghost" size="sm">Actions</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>View</MenuItem>
            <MenuItem>Download</MenuItem>
          </MenuContent>
        </Menu>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      render: () => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Invoice INV001</TableCell>
              <TableCell>
                <Badge tone="success" size="sm">
                  Paid
                </Badge>
              </TableCell>
              <TableCell>
                <Menu>
                  <MenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Actions
                    </Button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem>View</MenuItem>
                    <MenuItem>Download</MenuItem>
                  </MenuContent>
                </Menu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      fullWidth: true,
    },
    {
      label: 'Totals footer',
      description: 'TableFooter for a totals row. TableHead defaults to scope="col".',
      code: `<Table>
  <TableCaption>Invoices this month</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell>$400.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
      render: () => (
        <Table>
          <TableCaption>Invoices this month</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV002</TableCell>
              <TableCell>$150.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>$400.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
