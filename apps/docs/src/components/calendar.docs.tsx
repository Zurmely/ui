import {
  Calendar,
  Field,
  FieldLabel,
  TextField,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const calendarDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'calendar',
  name: 'Calendar',
  category: 'Forms',
  summary: 'Date picker grid for selecting a single date.',
  importPath: '@z-ux/ui/calendar',
  componentName: 'Calendar',
  controls: {
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <Field style={{ width: '100%', maxWidth: '20rem' }}>
      <FieldLabel>Appointment date</FieldLabel>
      <Calendar disabled={props.disabled as boolean} invalid={props.invalid as boolean} />
    </Field>
  ),
  code: (props) => {
    const parts = [
      props.disabled ? 'disabled' : null,
      props.invalid ? 'invalid' : null,
    ].filter(Boolean);
    return `<Field>
  <FieldLabel>Appointment date</FieldLabel>
  <Calendar${parts.length ? ` ${parts.join(' ')}` : ''} />
</Field>`;
  },
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Appointment date</FieldLabel>
          <Calendar />
        </Field>
      ),
      doNotUse: () => (
        <TextField type="date" aria-label="Appointment date" style={{ width: '100%', maxWidth: '20rem' }} />
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Booking form',
      description: 'Calendar inside a labeled field for appointment scheduling.',
      code: `<Field>
  <FieldLabel>Appointment date</FieldLabel>
  <Calendar />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Appointment date</FieldLabel>
          <Calendar />
        </Field>
      ),
    },
    {
      label: 'Date picker',
      description: 'Select a single date from a month grid.',
      code: '<Calendar />',
      render: () => <Calendar />,
    },
    {
      label: 'Form submitting',
      description: 'Read-only calendar while a form is submitting.',
      code: '<Calendar disabled />',
      render: () => <Calendar disabled />,
    },
  ];
  return doc;
})();
