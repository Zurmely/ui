import { Progress, Step, StepDescription, StepIndicator, Steps, StepTitle } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const stepsDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'steps',
    name: 'Steps',
    category: 'Navigation',
    summary:
      'Ordered wizard or checkout stages. currentStep sets upcoming, current, and completed states.',
    importPath: '@z-ux/ui',
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
    code: (props) => `<Steps currentStep={${props.currentStep}}>
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
</Steps>`,
    whenToUsePreviews: {
      use: () => (
        <Steps currentStep={2}>
          <Step step={1}>
            <StepIndicator step={1} />
            <StepTitle>Cart</StepTitle>
          </Step>
          <Step step={2}>
            <StepIndicator step={2} />
            <StepTitle>Shipping</StepTitle>
          </Step>
          <Step step={3}>
            <StepIndicator step={3} />
            <StepTitle>Payment</StepTitle>
          </Step>
        </Steps>
      ),
      doNotUse: () => <Progress value={66} aria-label="Checkout progress" />,
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Checkout flow',
      description: 'Multi-step progress through checkout.',
      code: `<Steps currentStep={2}>
  <Step step={1}><StepIndicator step={1} /><StepTitle>Cart</StepTitle></Step>
  <Step step={2}><StepIndicator step={2} /><StepTitle>Shipping</StepTitle></Step>
  <Step step={3}><StepIndicator step={3} /><StepTitle>Payment</StepTitle></Step>
</Steps>`,
      render: () => (
        <Steps currentStep={2}>
          <Step step={1}>
            <StepIndicator step={1} />
            <StepTitle>Cart</StepTitle>
          </Step>
          <Step step={2}>
            <StepIndicator step={2} />
            <StepTitle>Shipping</StepTitle>
          </Step>
          <Step step={3}>
            <StepIndicator step={3} />
            <StepTitle>Payment</StepTitle>
          </Step>
        </Steps>
      ),
    },
    {
      label: 'Onboarding',
      description: 'Guide new users through account setup.',
      code: `<Steps currentStep={1}>
  <Step step={1}><StepIndicator step={1} /><StepTitle>Profile</StepTitle><StepDescription>Create your account</StepDescription></Step>
</Steps>`,
      render: () => (
        <Steps currentStep={1}>
          <Step step={1}>
            <StepIndicator step={1} />
            <StepTitle>Profile</StepTitle>
            <StepDescription>Create your account</StepDescription>
          </Step>
          <Step step={2}>
            <StepIndicator step={2} />
            <StepTitle>Team</StepTitle>
            <StepDescription>Invite collaborators</StepDescription>
          </Step>
          <Step step={3}>
            <StepIndicator step={3} />
            <StepTitle>Done</StepTitle>
            <StepDescription>Start using the app</StepDescription>
          </Step>
        </Steps>
      ),
    },
    {
      label: 'Completed',
      description: 'All steps finished in a workflow.',
      code: `<Steps currentStep={3}>
  <Step step={1}><StepIndicator step={1} /><StepTitle>Draft</StepTitle></Step>
  <Step step={2}><StepIndicator step={2} /><StepTitle>Review</StepTitle></Step>
  <Step step={3}><StepIndicator step={3} /><StepTitle>Publish</StepTitle></Step>
</Steps>`,
      render: () => (
        <Steps currentStep={3}>
          <Step step={1}>
            <StepIndicator step={1} />
            <StepTitle>Draft</StepTitle>
          </Step>
          <Step step={2}>
            <StepIndicator step={2} />
            <StepTitle>Review</StepTitle>
          </Step>
          <Step step={3}>
            <StepIndicator step={3} />
            <StepTitle>Publish</StepTitle>
          </Step>
        </Steps>
      ),
    },
  ];
  return doc;
})();
