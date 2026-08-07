import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Timeline, TimelineItem } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const timelineDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'timeline',
    name: 'Timeline',
    category: 'Data',
    summary: 'Chronological list of events.',
    importPath: '@z-ux/ui/timeline',
    componentName: 'Timeline',
    controls: {
      orientation: {
        type: 'select',
        label: 'orientation',
        options: ['vertical', 'horizontal'],
        defaultValue: 'vertical',
      },
      latestEvent: textControl('latest event', 'Shipped'),
    },
    render: (props) => (
      <Timeline
        orientation={props.orientation as 'vertical' | 'horizontal'}
        style={{ width: '100%', maxWidth: '24rem' }}
      >
        <TimelineItem title={props.latestEvent as string} description="Left warehouse" />
        <TimelineItem title="In transit" description="Arriving tomorrow" />
        <TimelineItem title="Delivered" description="Signed by recipient" />
      </Timeline>
    ),
    code: (props) => `<Timeline orientation="${props.orientation}">
  <TimelineItem title="${props.latestEvent}" description="Left warehouse" />
  <TimelineItem title="In transit" description="Arriving tomorrow" />
</Timeline>`,
    whenToUsePreviews: {
      use: () => (
        <Timeline style={{ width: '100%', maxWidth: '20rem' }}>
          <TimelineItem title="Shipped" description="Left warehouse" />
          <TimelineItem title="In transit" description="Arriving tomorrow" />
        </Timeline>
      ),
      doNotUse: () => (
        <Table style={{ width: '100%', maxWidth: '20rem' }}>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Shipped</TableCell>
              <TableCell>Complete</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Order history',
      description: 'Vertical timeline of shipment events.',
      code: `<Timeline>
  <TimelineItem title="Shipped" description="Left warehouse" />
  <TimelineItem title="In transit" description="Arriving tomorrow" />
</Timeline>`,
      render: () => (
        <Timeline style={{ width: '100%', maxWidth: '24rem' }}>
          <TimelineItem title="Shipped" description="Left warehouse" />
          <TimelineItem title="In transit" description="Arriving tomorrow" />
          <TimelineItem title="Delivered" description="Signed by recipient" />
        </Timeline>
      ),
    },
    {
      label: 'Project milestones',
      description: 'Track progress through a project lifecycle.',
      code: `<Timeline>
  <TimelineItem title="Kickoff" description="Project started" />
  <TimelineItem title="Beta" description="Released to testers" />
</Timeline>`,
      render: () => (
        <Timeline style={{ width: '100%', maxWidth: '24rem' }}>
          <TimelineItem title="Kickoff" description="Project started" />
          <TimelineItem title="Beta" description="Released to testers" />
          <TimelineItem title="Launch" description="General availability" />
        </Timeline>
      ),
    },
    {
      label: 'Horizontal',
      description: 'Horizontal timeline for compact dashboards.',
      code: '<Timeline orientation="horizontal">...</Timeline>',
      render: () => (
        <Timeline orientation="horizontal" style={{ width: '100%' }}>
          <TimelineItem title="Plan" />
          <TimelineItem title="Build" />
          <TimelineItem title="Ship" />
        </Timeline>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
