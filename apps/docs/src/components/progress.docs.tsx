import { Progress, Spinner } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const progressDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'progress',
  name: 'Progress',
  category: 'Display',
  summary:
      'Determinate or indeterminate bar. Omit value with indeterminate={false} and the fill is 0%.',
  importPath: '@z-ux/ui/progress',
  componentName: 'Progress',
  controls: {
    value: { type: 'number', label: 'value', defaultValue: 60, min: 0, max: 100 },
    indeterminate: booleanControl('indeterminate', false),
  },
  render: (props) => (
    <Progress
      value={props.indeterminate ? undefined : (props.value as number)}
      indeterminate={props.indeterminate as boolean}
      style={{ width: '100%', maxWidth: '20rem' }}
    />
  ),
  code: (props) =>
    props.indeterminate
      ? '<Progress indeterminate />'
      : `<Progress value={${props.value}} />`,
  whenToUsePreviews: {
    use: () => <Progress value={60} aria-label="Upload progress" style={{ width: '12rem' }} />,
    doNotUse: () => <Spinner aria-label="Loading" />,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Upload progress',
      description: 'Determinate bar while a file uploads.',
      code: '<Progress value={45} aria-label="Upload progress" />',
      render: () => <Progress value={45} aria-label="Upload progress" />,
    },
    {
      label: 'Indeterminate',
      description: 'Loading state when duration is unknown.',
      code: '<Progress indeterminate aria-label="Loading" />',
      render: () => <Progress indeterminate aria-label="Loading" />,
    },
    {
      label: 'Profile completion',
      description: 'Progress toward completing an onboarding checklist.',
      code: '<Progress value={80} aria-label="Profile completion" />',
      render: () => <Progress value={80} aria-label="Profile completion" />,
    },
  ];
  return doc;
})();
