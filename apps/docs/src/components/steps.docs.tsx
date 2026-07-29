import { Step, StepDescription, StepIndicator, Steps, StepTitle } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const stepsDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'steps',
  name: 'Steps',
  category: 'Navigation',
  summary: 'Multi-step progress indicator.',
  importPath: '@z-ui/react',
  componentName: 'Steps',
  controls: {
    currentStep: { type: 'number', label: 'current step', defaultValue: 2, min: 1, max: 3 },
  },
  render: (props) => (
    <Steps currentStep={props.currentStep as number}>
      <Step step={1}>
        <StepIndicator step={1} />
        <StepTitle>Account</StepTitle>
        <StepDescription>Create your account</StepDescription>
      </Step>
      <Step step={2}>
        <StepIndicator step={2} />
        <StepTitle>Profile</StepTitle>
        <StepDescription>Set up your profile</StepDescription>
      </Step>
      <Step step={3}>
        <StepIndicator step={3} />
        <StepTitle>Complete</StepTitle>
        <StepDescription>Review and finish</StepDescription>
      </Step>
    </Steps>
  ),
  code: () => `<Steps>
  <Step>
    <StepIndicator />
    <StepTitle>Account</StepTitle>
    <StepDescription>Create your account</StepDescription>
  </Step>
</Steps>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<steps />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, currentStep: 3 }) : '<steps />',
      render: () => doc.render({ ...defaults, currentStep: 3 }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<steps />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
