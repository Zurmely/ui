import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@z-ui/react';
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
  importPath: '@z-ui/react/select',
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<select />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, value: 'banana' }) : '<select />',
      render: () => doc.render({ ...defaults, value: 'banana' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<select />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
