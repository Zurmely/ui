import { Filter, FilterItem } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const filterDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'filter',
  name: 'Filter',
  category: 'Forms',
  summary: 'Toggle group for filtering content.',
  importPath: '@z-ui/react/filter',
  componentName: 'Filter',
  controls: {
    value: {
      type: 'select',
      label: 'value',
      options: ['all', 'active', 'archived'],
      defaultValue: 'all',
    },
  },
  render: (props) => (
    <Filter value={props.value as string} onValueChange={() => {}}>
      <FilterItem value="all">All</FilterItem>
      <FilterItem value="active">Active</FilterItem>
      <FilterItem value="archived">Archived</FilterItem>
    </Filter>
  ),
  code: (props) => `<Filter value="${props.value}" onValueChange={setValue}>
  <FilterItem value="all">All</FilterItem>
  <FilterItem value="active">Active</FilterItem>
  <FilterItem value="archived">Archived</FilterItem>
</Filter>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<filter />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, value: 'active' }) : '<filter />',
      render: () => doc.render({ ...defaults, value: 'active' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<filter />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Filter bar',
      description: 'Status filters above a data table.',
      code: '<Filter>...</Filter>',
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
