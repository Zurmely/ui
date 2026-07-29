import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders radio items', () => {
    renderWithTheme(
      <RadioGroup aria-label="Plan">
        <RadioGroupItem value="free" aria-label="Free" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>,
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('forwards ref to root element', () => {
    const ref = vi.fn();
    renderWithTheme(
      <RadioGroup ref={ref} aria-label="Plan">
        <RadioGroupItem value="free" aria-label="Free" />
      </RadioGroup>,
    );
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('supports uncontrolled defaultValue', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <RadioGroup defaultValue="free" aria-label="Plan">
        <RadioGroupItem value="free" aria-label="Free" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>,
    );
    const [free, pro] = screen.getAllByRole('radio');
    expect(free).toHaveAttribute('data-state', 'checked');
    expect(pro).toHaveAttribute('data-state', 'unchecked');
    await user.click(pro);
    expect(free).toHaveAttribute('data-state', 'unchecked');
    expect(pro).toHaveAttribute('data-state', 'checked');
  });

  it('supports controlled value', () => {
    const { rerender } = renderWithTheme(
      <RadioGroup value="free" onValueChange={() => {}} aria-label="Plan">
        <RadioGroupItem value="free" aria-label="Free" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('data-state', 'checked');
    rerender(
      <div data-theme="light">
        <RadioGroup value="pro" onValueChange={() => {}} aria-label="Plan">
          <RadioGroupItem value="free" aria-label="Free" />
          <RadioGroupItem value="pro" aria-label="Pro" />
        </RadioGroup>
      </div>,
    );
    expect(screen.getAllByRole('radio')[1]).toHaveAttribute('data-state', 'checked');
  });

  it('applies invalid data attribute on group', () => {
    renderWithTheme(
      <RadioGroup invalid aria-label="Plan">
        <RadioGroupItem value="free" aria-label="Free" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup')).toHaveAttribute('data-invalid', 'true');
  });

  it('respects disabled on group', () => {
    renderWithTheme(
      <RadioGroup disabled aria-label="Plan">
        <RadioGroupItem value="free" aria-label="Free" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <RadioGroup defaultValue="free" aria-label="Plan">
        <RadioGroupItem value="free" aria-label="Free" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>,
    );
    await checkA11y(container);
  });
});
