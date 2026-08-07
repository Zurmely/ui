import { Alert, Badge } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl, toneControl } from './shared-controls';

interface AlertPlaygroundProps {
  tone: string;
  title: string;
  description: string;
}

export const alertDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'alert',
    name: 'Alert',
    category: 'Feedback',
    summary: 'Communicates important messages with semantic tone treatment.',
    importPath: '@z-ux/ui/alert',
    componentName: 'Alert',
    controls: {
      tone: toneControl(),
      title: textControl('title', 'Heads up'),
      description: textControl('description', 'This is an alert message with helpful context.'),
    },
    render: (props) => (
      <Alert
        tone={props.tone as 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'}
        title={props.title as string}
        description={props.description as string}
      />
    ),
    code: (props) => {
      const parts = [
        props.tone !== 'neutral' ? `tone="${props.tone}"` : null,
        `title="${props.title}"`,
        `description="${props.description}"`,
      ].filter(Boolean);
      return `<Alert ${parts.join(' ')} />`;
    },
    whenToUsePreviews: {
      use: () => (
        <Alert
          tone="warning"
          title="Storage almost full"
          description="Free up space to keep syncing."
        />
      ),
      doNotUse: () => <Badge tone="warning">Beta</Badge>,
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Informational',
      description: 'Neutral alert for general updates and context.',
      code: '<Alert title="Heads up" description="Your trial ends in 7 days." />',
      render: () => <Alert title="Heads up" description="Your trial ends in 7 days." />,
    },
    {
      label: 'Warning',
      description: 'Draw attention before a potentially risky action.',
      code: '<Alert tone="warning" title="Storage almost full" description="Free up space to keep syncing." />',
      render: () => (
        <Alert tone="warning" title="Storage almost full" description="Free up space to keep syncing." />
      ),
    },
    {
      label: 'Error',
      description: 'Report a failed operation that needs user attention.',
      code: '<Alert tone="danger" title="Payment failed" description="Update your billing details to continue." />',
      render: () => (
        <Alert tone="danger" title="Payment failed" description="Update your billing details to continue." />
      ),
    },
  ];
  return doc;
})();
