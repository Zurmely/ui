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
  summary:
      'Single-date month grid. Use selected and onSelect for controlled value; defaultMonth falls back to defaultSelected or today.',
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
      label: 'Controlled date',
      description: 'selected plus onSelect for a form that owns the date.',
      code: `<Calendar
  selected={date}
  onSelect={setDate}
  onMonthChange={setMonth}
  aria-label="Appointment date"
/>`,
      render: () => (
        <Calendar
          defaultSelected={new Date(2026, 5, 15)}
          defaultMonth={new Date(2026, 5, 1)}
          aria-label="Appointment date"
        />
      ),
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
