import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from './Pagination';

describe('Pagination', () => {
  it('renders prev/next links and current page', () => {
    renderWithTheme(
      <Pagination>
        <PaginationItem>
          <PaginationLink href="/page/1" aria-label="Previous page">
            Prev
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/5" current>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/6" aria-label="Next page">
            Next
          </PaginationLink>
        </PaginationItem>
      </Pagination>,
    );

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Previous page' })).toHaveAttribute('href', '/page/1');
    expect(screen.getByRole('link', { name: '5' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('…')).toHaveClass('z-pagination__ellipsis');
  });

  it('applies z-pagination classes', () => {
    renderWithTheme(
      <Pagination>
        <PaginationItem>
          <PaginationLink href="/page/1">1</PaginationLink>
        </PaginationItem>
      </Pagination>,
    );

    expect(screen.getByRole('navigation')).toHaveClass('z-pagination');
    expect(screen.getByRole('link')).toHaveClass('z-pagination__link');
  });

  it('supports disabled pagination links', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <Pagination>
        <PaginationItem>
          <PaginationLink href="/page/1" disabled onClick={onClick}>
            Prev
          </PaginationLink>
        </PaginationItem>
      </Pagination>,
    );

    const link = screen.getByText('Prev');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Pagination>
        <PaginationItem>
          <PaginationLink href="/page/1" aria-label="Previous page">
            Prev
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/2" current>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/3" aria-label="Next page">
            Next
          </PaginationLink>
        </PaginationItem>
      </Pagination>,
    );
    await checkA11y(container);
  });
});
