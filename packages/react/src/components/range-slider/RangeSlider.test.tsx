import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Field, FieldLabel } from '../field/Field';
import { RangeSlider } from './RangeSlider';

describe('RangeSlider', () => {
  it('renders a single-thumb slider', () => {
    renderWithTheme(<RangeSlider aria-label="Volume" defaultValue={40} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('updates value on change', () => {
    const onValueChange = vi.fn();
    renderWithTheme(
      <RangeSlider aria-label="Volume" defaultValue={40} onValueChange={onValueChange} />,
    );
    const input = document.querySelector('input[type="range"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '70' } });
    expect(onValueChange).toHaveBeenCalledWith(70);
  });

  it('renders dual-thumb range mode', () => {
    renderWithTheme(<RangeSlider range defaultValue={[20, 80]} aria-label="Price" />);
    expect(screen.getByRole('slider', { name: 'Minimum value' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Maximum value' })).toBeInTheDocument();
  });

  it('integrates with field context', () => {
    renderWithTheme(
      <Field id="volume" invalid required>
        <FieldLabel>Volume</FieldLabel>
        <RangeSlider defaultValue={50} />
      </Field>,
    );
    const input = document.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input).toHaveAttribute('id', 'volume');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
  });

  it('has no axe violations for single mode', async () => {
    const { container } = renderWithTheme(
      <Field id="volume">
        <FieldLabel>Volume</FieldLabel>
        <RangeSlider defaultValue={50} />
      </Field>,
    );
    await checkA11y(container);
  });
});
