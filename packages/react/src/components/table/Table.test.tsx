import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

describe('Table', () => {
  it('renders semantic table structure', () => {
    renderWithTheme(
      <Table>
        <TableCaption>Team roster</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alex</TableCell>
            <TableCell>Design</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>2 members</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(screen.getByRole('table', { name: 'Team roster' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('cell', { name: 'Alex' })).toBeInTheDocument();
  });

  it('applies z-table classes', () => {
    renderWithTheme(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole('table')).toHaveClass('z-table');
    expect(screen.getByRole('columnheader')).toHaveClass('z-table__head');
    expect(screen.getByRole('cell')).toHaveClass('z-table__cell');
  });

  it('wraps the table for horizontal scrolling', () => {
    const { container } = renderWithTheme(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(container.querySelector('.z-table__wrapper')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table>
        <TableCaption>Inventory</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Qty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A-1</TableCell>
            <TableCell>12</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await checkA11y(container);
  });
});
