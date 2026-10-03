import { Field, FieldLabel, RangeSlider, Stack, TextField } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const rangeSliderDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'range-slider',
    name: 'RangeSlider',
    category: 'Forms',
    summary:
      'Single-thumb numeric slider by default. Set range to render two thumbs for a min/max interval.',
    importPath: '@z-ux/ui/range-slider',
    componentName: 'RangeSlider',
    controls: {
      min: { type: 'number', label: 'min', defaultValue: 0, min: 0, max: 100 },
      max: { type: 'number', label: 'max', defaultValue: 100, min: 0, max: 100 },
      range: booleanControl('range', true),
      disabled: booleanControl('disabled', false),
    },
    render: (props) => {
      const range = props.range as boolean;
      return (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>{range ? 'Price range' : 'Volume'}</FieldLabel>
          <RangeSlider
            key={range ? 'range' : 'single'}
            min={props.min as number}
            max={props.max as number}
            range={range}
            defaultValue={range ? [20, 80] : 40}
            disabled={props.disabled as boolean}
            aria-label={range ? 'Price range' : 'Volume'}
          />
        </Field>
      );
    },
    code: (props) => {
      const range = props.range as boolean;
      const value = range ? 'defaultValue={[20, 80]}' : 'defaultValue={40}';
      return `<Field>
  <FieldLabel>${range ? 'Price range' : 'Volume'}</FieldLabel>
  <RangeSlider min={${props.min}} max={${props.max}}${range ? ' range' : ''} ${value} />
</Field>`;
    },
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Price range</FieldLabel>
          <RangeSlider range min={0} max={500} defaultValue={[50, 200]} aria-label="Price range" />
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
      label: 'Single value',
      description: 'One thumb for volume, brightness, or another single numeric preference.',
      code: `<Field>
  <FieldLabel>Volume</FieldLabel>
  <RangeSlider min={0} max={100} defaultValue={40} />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Volume</FieldLabel>
          <RangeSlider min={0} max={100} defaultValue={40} aria-label="Volume" />
        </Field>
      ),
    },
    {
      label: 'Price range',
      description: 'Two thumbs. range is required — an array value alone stays single-thumb.',
      code: `<Field>
  <FieldLabel>Price range</FieldLabel>
  <RangeSlider range min={0} max={500} defaultValue={[50, 200]} onValueChange={setPrice} />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Price range</FieldLabel>
          <RangeSlider range min={0} max={500} defaultValue={[50, 200]} aria-label="Price range" />
        </Field>
      ),
    },
    {
      label: 'Filters unavailable',
      description: 'Disabled dual-thumb slider while filters are unavailable.',
      code: `<Field>
  <FieldLabel>Price range</FieldLabel>
  <RangeSlider range disabled min={0} max={100} defaultValue={[25, 75]} />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Price range</FieldLabel>
          <RangeSlider range disabled min={0} max={100} defaultValue={[25, 75]} aria-label="Price range" />
        </Field>
      ),
    },
  ];
  return doc;
})();
