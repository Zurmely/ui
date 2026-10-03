import { Progress, RadialProgress } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, sizeControl } from './shared-controls';

export const radialProgressDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'radial-progress',
  name: 'RadialProgress',
  category: 'Display',
  summary:
      'Circular determinate or indeterminate progress. Same value rules as Progress.',
  importPath: '@z-ux/ui/radial-progress',
  componentName: 'RadialProgress',
  controls: {
    value: { type: 'number', label: 'value', defaultValue: 75, min: 0, max: 100 },
    indeterminate: booleanControl('indeterminate', false),
    size: sizeControl(),
  },
  render: (props) => (
    <RadialProgress
      value={props.indeterminate ? undefined : (props.value as number)}
      indeterminate={props.indeterminate as boolean}
      size={props.size as 'sm' | 'md' | 'lg'}
    />
  ),
  code: (props) =>
    props.indeterminate
      ? `<RadialProgress indeterminate${props.size !== 'md' ? ` size="${props.size}"` : ''} />`
      : `<RadialProgress value={${props.value}}${props.size !== 'md' ? ` size="${props.size}"` : ''} />`,
  whenToUsePreviews: {
    use: () => <RadialProgress value={75} aria-label="Daily goal" />,
    doNotUse: () => <Progress value={75} aria-label="Daily goal" style={{ width: '8rem' }} />,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Goal tracker',
      description: 'Circular progress for a daily step goal.',
      code: '<RadialProgress value={65} aria-label="Daily goal" />',
      render: () => <RadialProgress value={65} aria-label="Daily goal" />,
    },
    {
      label: 'Indeterminate',
      description: 'Spinner-style radial progress for async tasks.',
      code: '<RadialProgress indeterminate aria-label="Loading" />',
      render: () => <RadialProgress indeterminate aria-label="Loading" />,
    },
    {
      label: 'Compact metric',
      description: 'Small radial indicator on a dashboard card.',
      code: '<RadialProgress value={92} size="sm" aria-label="Uptime" />',
      render: () => <RadialProgress value={92} size="sm" aria-label="Uptime" />,
    },
  ];
  return doc;
})();
