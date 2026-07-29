import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

function renderSelect(props: { defaultValue?: string; value?: string; disabled?: boolean } = {}) {
  return renderWithTheme(
    <Select {...props}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Choose a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>,
  );
}

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    renderSelect();
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument();
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument();
  });

  it('forwards ref to trigger element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <Select>
        <SelectTrigger ref={ref} aria-label="Fruit">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('supports uncontrolled defaultValue', () => {
    renderSelect({ defaultValue: 'apple' });
    expect(screen.getByRole('combobox')).toHaveTextContent('Apple');
  });

  it('renders options when defaultOpen', () => {
    renderWithTheme(
      <Select defaultOpen defaultValue="apple">
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
  });

  it('supports controlled value', () => {
    const { rerender } = renderWithTheme(
      <Select value="apple" onValueChange={() => {}}>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Apple');
    rerender(
      <div data-theme="light">
        <Select value="banana" onValueChange={() => {}}>
          <SelectTrigger aria-label="Fruit">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      </div>,
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana');
  });

  it('applies invalid data attribute on trigger', () => {
    renderWithTheme(
      <Select>
        <SelectTrigger invalid aria-label="Fruit">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('data-invalid', 'true');
  });

  it('respects disabled', () => {
    renderSelect({ disabled: true });
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = renderSelect({ defaultValue: 'apple' });
    await checkA11y(container);
  });
});
