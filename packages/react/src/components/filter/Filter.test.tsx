import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Filter, FilterItem } from './Filter';

describe('Filter', () => {
  it('renders filter items', () => {
    renderWithTheme(
      <Filter aria-label="Status">
        <FilterItem value="all">All</FilterItem>
        <FilterItem value="open">Open</FilterItem>
      </Filter>,
    );
    expect(screen.getByRole('radio', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Open' })).toBeInTheDocument();
  });

  it('selects a single value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(
      <Filter aria-label="Status" onValueChange={onValueChange}>
        <FilterItem value="all">All</FilterItem>
        <FilterItem value="open">Open</FilterItem>
      </Filter>,
    );
    await user.click(screen.getByRole('radio', { name: 'Open' }));
    expect(onValueChange).toHaveBeenCalledWith('open');
    expect(screen.getByRole('radio', { name: 'Open' })).toHaveAttribute('data-selected', 'true');
  });

  it('supports multiple selection', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(
      <Filter type="multiple" aria-label="Tags" onValueChange={onValueChange}>
        <FilterItem value="design">Design</FilterItem>
        <FilterItem value="eng">Engineering</FilterItem>
      </Filter>,
    );
    await user.click(screen.getByRole('button', { name: 'Design' }));
    await user.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['design', 'eng']);
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Filter aria-label="Status">
        <FilterItem value="all">All</FilterItem>
        <FilterItem value="open">Open</FilterItem>
      </Filter>,
    );
    await checkA11y(container);
  });
});
