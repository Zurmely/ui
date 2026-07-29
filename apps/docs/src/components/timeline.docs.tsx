import { Timeline, TimelineItem } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const timelineDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'timeline',
  name: 'Timeline',
  category: 'Data',
  summary: 'Chronological list of events.',
  importPath: '@z-ui/react/timeline',
  componentName: 'Timeline',
  controls: {
    orientation: {
      type: 'select',
      label: 'orientation',
      options: ['vertical', 'horizontal'],
      defaultValue: 'vertical',
    },
  },
  render: (props) => (
    <Timeline orientation={props.orientation as 'vertical' | 'horizontal'}>
      <TimelineItem title="Created" description="Project was created" />
      <TimelineItem title="In progress" description="Development started" />
      <TimelineItem title="Completed" description="Project shipped" />
    </Timeline>
  ),
  code: (props) => `<Timeline orientation="${props.orientation}">
  <TimelineItem title="Created" description="Project was created" />
  <TimelineItem title="Completed" description="Project shipped" />
</Timeline>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<timeline />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, orientation: 'horizontal' }) : '<timeline />',
      render: () => doc.render({ ...defaults, orientation: 'horizontal' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<timeline />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
