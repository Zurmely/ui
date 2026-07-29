import { Alert } from '@z-ui/react';
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
  importPath: '@z-ui/react/alert',
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
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<alert />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<alert />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<alert />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
