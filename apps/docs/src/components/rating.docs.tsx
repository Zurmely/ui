import { Field, FieldLabel, Rating, TextField } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const ratingDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'rating',
  name: 'Rating',
  category: 'Forms',
  summary: 'Integer star rating. Stars fill in whole steps — 4.5 displays as 4 filled stars.',
  importPath: '@z-ux/ui/rating',
  componentName: 'Rating',
  controls: {
    value: { type: 'number', label: 'value', defaultValue: 3, min: 0, max: 5 },
    max: { type: 'number', label: 'max', defaultValue: 5, min: 1, max: 10 },
    readOnly: booleanControl('readOnly', false),
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <Rating
      value={props.value as number}
      max={props.max as number}
      readOnly={props.readOnly as boolean}
      disabled={props.disabled as boolean}
      aria-label="Rating"
    />
  ),
  code: (props) => `<Rating value={${props.value}} max={${props.max}} aria-label="Rating" />`,
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Rate this product</FieldLabel>
          <Rating value={4} onValueChange={() => {}} aria-label="Product rating" />
        </Field>
      ),
      doNotUse: () => (
        <TextField type="number" min={1} max={5} defaultValue={4} aria-label="Rating" style={{ width: '5rem' }} />
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Product review',
      description: 'Star rating for a product review form.',
      code: '<Rating value={4} onValueChange={setValue} aria-label="Rating" />',
      render: () => <Rating value={4} onValueChange={() => {}} aria-label="Rating" />,
    },
    {
      label: 'Read-only score',
      description: 'Display a whole-star score without editing. Rating does not render half stars.',
      code: '<Rating value={4} readOnly aria-label="Average rating" />',
      render: () => <Rating value={4} readOnly aria-label="Average rating" />,
    },
    {
      label: 'Custom scale',
      description: 'Ten-point satisfaction survey.',
      code: '<Rating value={8} max={10} onValueChange={setValue} aria-label="Satisfaction" />',
      render: () => <Rating value={8} max={10} onValueChange={() => {}} aria-label="Satisfaction" />,
    },
  ];
  return doc;
})();
