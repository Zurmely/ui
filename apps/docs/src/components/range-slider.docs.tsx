import { Field, FieldLabel, RangeSlider, Stack, TextField } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const rangeSliderDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'range-slider',
  name: 'RangeSlider',
  category: 'Forms',
  summary: 'Dual-thumb range slider for selecting a value interval.',
  importPath: '@z-ux/ui/range-slider',
  componentName: 'RangeSlider',
  controls: {
    min: { type: 'number', label: 'min', defaultValue: 0, min: 0, max: 100 },
    max: { type: 'number', label: 'max', defaultValue: 100, min: 0, max: 100 },
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <Field style={{ width: '100%', maxWidth: '20rem' }}>
      <FieldLabel>Price range</FieldLabel>
      <RangeSlider
        min={props.min as number}
        max={props.max as number}
        defaultValue={[20, 80]}
        disabled={props.disabled as boolean}
        aria-label="Price range"
      />
    </Field>
  ),
  code: (props) => `<Field>
  <FieldLabel>Price range</FieldLabel>
  <RangeSlider min={${props.min}} max={${props.max}} defaultValue={[20, 80]} aria-label="Price range" />
</Field>`,
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Price range</FieldLabel>
          <RangeSlider min={0} max={500} defaultValue={[50, 200]} aria-label="Price range" />
        </Field>
      ),
      doNotUse: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <TextField type="number" aria-label="Min price" placeholder="Min" style={{ width: '5rem' }} />
          <span>–</span>
          <TextField type="number" aria-label="Max price" placeholder="Max" style={{ width: '5rem' }} />
        </Stack>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Price range',
      description: 'Filter products by minimum and maximum price.',
      code: `<Field>
  <FieldLabel>Price range</FieldLabel>
  <RangeSlider min={0} max={500} defaultValue={[50, 200]} aria-label="Price range" />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Price range</FieldLabel>
          <RangeSlider min={0} max={500} defaultValue={[50, 200]} aria-label="Price range" />
        </Field>
      ),
    },
    {
      label: 'Volume control',
      description: 'Dual-handle slider for min and max volume.',
      code: `<Field>
  <FieldLabel>Volume</FieldLabel>
  <RangeSlider min={0} max={100} defaultValue={[20, 80]} aria-label="Volume" />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Volume</FieldLabel>
          <RangeSlider min={0} max={100} defaultValue={[20, 80]} aria-label="Volume" />
        </Field>
      ),
    },
    {
      label: 'Filters unavailable',
      description: 'Inactive range while filters are unavailable.',
      code: `<Field>
  <FieldLabel>Price range</FieldLabel>
  <RangeSlider disabled min={0} max={100} defaultValue={[25, 75]} aria-label="Price range" />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Price range</FieldLabel>
          <RangeSlider disabled min={0} max={100} defaultValue={[25, 75]} aria-label="Price range" />
        </Field>
      ),
    },
  ];
  return doc;
})();
