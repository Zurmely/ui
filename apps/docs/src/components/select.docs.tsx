import {
  Field,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextField,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

interface SelectPlaygroundProps {
  disabled: boolean;
  value: string;
}

export const selectDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'select',
  name: 'Select',
  category: 'Forms',
  summary: 'Dropdown selection with keyboard navigation.',
  importPath: '@z-ux/ui/select',
  componentName: 'Select',
  controls: {
    value: {
      type: 'select',
      label: 'value',
      options: ['apple', 'banana', 'orange'],
      defaultValue: 'apple',
    },
    disabled: booleanControl('disabled', false),
  },
  render: (props) => (
    <Select value={props.value as string} disabled={props.disabled as boolean}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
  code: (props) => {
    const parts = [
      `defaultValue="${props.value}"`,
      props.disabled ? 'disabled' : null,
    ].filter(Boolean);
    return `<Select ${parts.join(' ')}>
  <SelectTrigger aria-label="Fruit">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`;
  },
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Country</FieldLabel>
          <Select defaultValue="us">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      ),
      doNotUse: () => (
        <TextField placeholder="United States" aria-label="Country" style={{ width: '100%', maxWidth: '20rem' }} />
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Fruit picker',
      description: 'Single selection from a short list.',
      code: `<Select defaultValue="apple">
  <SelectTrigger aria-label="Fruit"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`,
      render: () => (
        <Select defaultValue="apple">
          <SelectTrigger aria-label="Fruit">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      label: 'Country field',
      description: 'Select inside a labeled form field.',
      code: `<Field>
  <FieldLabel>Country</FieldLabel>
  <Select defaultValue="us">
    <SelectTrigger aria-label="Country"><SelectValue /></SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
    </SelectContent>
  </Select>
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Country</FieldLabel>
          <Select defaultValue="us">
            <SelectTrigger aria-label="Country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      ),
    },
    {
      label: 'Loading form',
      description: 'Read-only select while form data is loading.',
      code: '<Select disabled defaultValue="apple">...</Select>',
      render: () => (
        <Select disabled defaultValue="apple">
          <SelectTrigger aria-label="Fruit">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
  ];
  return doc;
})();
