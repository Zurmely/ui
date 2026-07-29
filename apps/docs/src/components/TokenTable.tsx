import {
  CodeBlock,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@z-ui/react';

export interface TokenTableRow {
  name: string;
  value: string;
}

export function TokenTable({ rows }: { rows: TokenTableRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={`${row.name}-${row.value}`}>
            <TableCell>
              <CodeBlock variant="single">{row.name}</CodeBlock>
            </TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
