import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Stack,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const cardDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'card',
  name: 'Card',
  category: 'Layout',
  summary: 'Container for grouped content with header, body, and footer.',
  importPath: '@z-ux/ui/card',
  componentName: 'Card',
  controls: {
    title: textControl('title', 'Project overview'),
    description: textControl('description', 'Track milestones and team activity.'),
  },
  render: (props) => (
    <Card style={{ width: '100%', maxWidth: '24rem' }}>
      <CardHeader>
        <CardTitle>{props.title as string}</CardTitle>
        <CardDescription>{props.description as string}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>3 tasks due this week.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">View project</Button>
      </CardFooter>
    </Card>
  ),
  code: (props) => `<Card>
  <CardHeader>
    <CardTitle>${props.title}</CardTitle>
    <CardDescription>${props.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>3 tasks due this week.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">View project</Button>
  </CardFooter>
</Card>`,
    whenToUsePreviews: {
      use: () => (
        <Card style={{ width: '100%', maxWidth: '20rem' }}>
          <CardHeader>
            <CardTitle>Project overview</CardTitle>
            <CardDescription>Track milestones and team activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>3 tasks due this week.</p>
          </CardContent>
        </Card>
      ),
      doNotUse: () => (
        <Button variant="ghost" style={{ width: '100%', maxWidth: '20rem', justifyContent: 'flex-start' }}>
          Project overview
        </Button>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Content card',
      description: 'Grouped content with header, body, and footer actions.',
      code: `<Card>
  <CardHeader>
    <CardTitle>Project overview</CardTitle>
    <CardDescription>Track milestones and team activity.</CardDescription>
  </CardHeader>
  <CardContent><p>3 tasks due this week.</p></CardContent>
  <CardFooter><Button variant="primary">View project</Button></CardFooter>
</Card>`,
      render: () => (
        <Card style={{ width: '100%', maxWidth: '24rem' }}>
          <CardHeader>
            <CardTitle>Project overview</CardTitle>
            <CardDescription>Track milestones and team activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>3 tasks due this week.</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary">View project</Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      label: 'Metric summary',
      description: 'Highlight a KPI with supporting detail.',
      code: `<Card>
  <CardHeader>
    <CardTitle>Monthly revenue</CardTitle>
    <CardDescription>Compared to last month</CardDescription>
  </CardHeader>
  <CardContent><p style={{ fontSize: 'var(--z-text-h3-size)', fontWeight: 'var(--z-text-h3-weight)', lineHeight: 'var(--z-text-h3-line-height)', margin: 0 }}>$42,800</p></CardContent>
</Card>`,
      render: () => (
        <Card style={{ width: '100%', maxWidth: '20rem' }}>
          <CardHeader>
            <CardTitle>Monthly revenue</CardTitle>
            <CardDescription>Compared to last month</CardDescription>
          </CardHeader>
          <CardContent>
            <p
              style={{
                fontSize: 'var(--z-text-h3-size)',
                fontWeight: 'var(--z-text-h3-weight)',
                lineHeight: 'var(--z-text-h3-line-height)',
                margin: 0,
              }}
            >
              $42,800
            </p>
          </CardContent>
        </Card>
      ),
    },
    {
      label: 'Confirm action',
      description: 'Card footer with cancel and primary actions.',
      code: `<Card>
  <CardHeader><CardTitle>Publish changes?</CardTitle></CardHeader>
  <CardFooter>
    <Stack direction="horizontal" gap="sm" style={{ justifyContent: 'flex-end', width: '100%' }}>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Publish</Button>
    </Stack>
  </CardFooter>
</Card>`,
      render: () => (
        <Card style={{ width: '100%', maxWidth: '24rem' }}>
          <CardHeader>
            <CardTitle>Publish changes?</CardTitle>
            <CardDescription>Updates will be visible to all team members.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Stack direction="horizontal" gap="sm" style={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Publish</Button>
            </Stack>
          </CardFooter>
        </Card>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
