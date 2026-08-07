import { Filter, FilterItem, RadioGroup, RadioGroupItem } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, sizeControl } from './shared-controls';

export const filterDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'filter',
  name: 'Filter',
  category: 'Forms',
  summary: 'Toggle group for filtering content.',
  importPath: '@z-ux/ui/filter',
  componentName: 'Filter',
  controls: {
    type: {
      type: 'select',
      label: 'type',
      options: ['single', 'multiple'],
      defaultValue: 'single',
    },
    value: {
      type: 'select',
      label: 'value',
      options: ['all', 'active', 'archived'],
      defaultValue: 'all',
    },
    disabled: booleanControl('disabled', false),
    size: sizeControl(),
  },
  render: (props) => {
    const type = props.type as 'single' | 'multiple';
    const value =
      type === 'multiple' ? [props.value as string] : (props.value as string);

    return (
      <Filter
        type={type}
        value={value}
        onValueChange={() => {}}
        disabled={props.disabled as boolean}
        size={props.size as 'sm' | 'md' | 'lg'}
      >
        <FilterItem value="all">All</FilterItem>
        <FilterItem value="active">Active</FilterItem>
        <FilterItem value="archived">Archived</FilterItem>
      </Filter>
    );
  },
  code: (props) => `<Filter type="${props.type}" value="${props.value}" onValueChange={setValue}>
  <FilterItem value="all">All</FilterItem>
  <FilterItem value="active">Active</FilterItem>
  <FilterItem value="archived">Archived</FilterItem>
</Filter>`,
    whenToUsePreviews: {
      use: () => (
        <Filter value="active" onValueChange={() => {}} aria-label="Status">
          <FilterItem value="all">All</FilterItem>
          <FilterItem value="active">Active</FilterItem>
          <FilterItem value="archived">Archived</FilterItem>
        </Filter>
      ),
      doNotUse: () => (
        <RadioGroup defaultValue="active" aria-label="Status">
          <label>
            <RadioGroupItem value="all" /> All
          </label>
          <label>
            <RadioGroupItem value="active" /> Active
          </label>
        </RadioGroup>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Status filter',
      description: 'Toggle between all, active, and archived items.',
      code: `<Filter value="active" onValueChange={setValue}>
  <FilterItem value="all">All</FilterItem>
  <FilterItem value="active">Active</FilterItem>
  <FilterItem value="archived">Archived</FilterItem>
</Filter>`,
      render: () => (
        <Filter value="active" onValueChange={() => {}}>
          <FilterItem value="all">All</FilterItem>
          <FilterItem value="active">Active</FilterItem>
          <FilterItem value="archived">Archived</FilterItem>
        </Filter>
      ),
    },
    {
      label: 'All items',
      description: 'Default view showing every record.',
      code: `<Filter value="all" onValueChange={setValue}>
  <FilterItem value="all">All</FilterItem>
  <FilterItem value="active">Active</FilterItem>
</Filter>`,
      render: () => (
        <Filter value="all" onValueChange={() => {}}>
          <FilterItem value="all">All</FilterItem>
          <FilterItem value="active">Active</FilterItem>
          <FilterItem value="archived">Archived</FilterItem>
        </Filter>
      ),
    },
    {
      label: 'Filter bar',
      description: 'Status filters above a data table.',
      code: `<Filter type="multiple" defaultValue={['active']} aria-label="Status">
  <FilterItem value="active">Active</FilterItem>
  <FilterItem value="pending">Pending</FilterItem>
  <FilterItem value="archived">Archived</FilterItem>
</Filter>`,
      render: () => (
        <Filter type="multiple" defaultValue={['active']} aria-label="Status">
          <FilterItem value="active">Active</FilterItem>
          <FilterItem value="pending">Pending</FilterItem>
          <FilterItem value="archived">Archived</FilterItem>
        </Filter>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
