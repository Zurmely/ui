import { Indicator, IndicatorItem } from '@z-ui/react';
import { Button } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const indicatorDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'indicator',
  name: 'Indicator',
  category: 'Display',
  summary: 'Notification badge overlay on a trigger element.',
  importPath: '@z-ui/react/indicator',
  componentName: 'Indicator',
  controls: {
    variant: {
      type: 'select',
      label: 'variant',
      options: ['dot', 'badge'],
      defaultValue: 'badge',
    },
    placement: {
      type: 'select',
      label: 'placement',
      options: ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      defaultValue: 'top-end',
    },
    label: textControl('label', '3'),
  },
  render: (props) => (
    <Indicator>
      <Button variant="secondary">Inbox</Button>
      <IndicatorItem
        variant={props.variant as 'dot' | 'badge'}
        placement={props.placement as 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'}
      >
        {props.variant === 'badge' ? (props.label as string) : null}
      </IndicatorItem>
    </Indicator>
  ),
  code: (props) => `<Indicator>
  <Button variant="secondary">Inbox</Button>
  <IndicatorItem variant="${props.variant}" placement="${props.placement}">${props.variant === 'badge' ? props.label : ''}</IndicatorItem>
</Indicator>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<indicator />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, variant: 'dot', placement: 'bottom-start' }) : '<indicator />',
      render: () => doc.render({ ...defaults, variant: 'dot', placement: 'bottom-start' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<indicator />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
