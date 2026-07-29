import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Step, StepDescription, StepIndicator, Steps, StepTitle } from './Steps';

describe('Steps', () => {
  it('renders current and completed step states', () => {
    renderWithTheme(
      <Steps currentStep={2}>
        <Step step={1}>
          <StepIndicator step={1} />
          <StepTitle>Account</StepTitle>
          <StepDescription>Create your account</StepDescription>
        </Step>
        <Step step={2}>
          <StepIndicator step={2} />
          <StepTitle>Profile</StepTitle>
          <StepDescription>Add profile details</StepDescription>
        </Step>
        <Step step={3}>
          <StepIndicator step={3} />
          <StepTitle>Review</StepTitle>
          <StepDescription>Confirm and submit</StepDescription>
        </Step>
      </Steps>,
    );

    const steps = screen.getAllByRole('listitem');
    expect(steps[0]).toHaveAttribute('data-state', 'completed');
    expect(steps[1]).toHaveAttribute('data-state', 'current');
    expect(steps[1]).toHaveAttribute('aria-current', 'step');
    expect(steps[2]).toHaveAttribute('data-state', 'upcoming');
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('applies z-steps classes', () => {
    renderWithTheme(
      <Steps currentStep={1}>
        <Step step={1}>
          <StepIndicator />
          <StepTitle>Account</StepTitle>
          <StepDescription>Details</StepDescription>
        </Step>
      </Steps>,
    );

    expect(screen.getByRole('list', { name: 'Progress' })).toHaveClass('z-steps');
    expect(screen.getByRole('listitem')).toHaveClass('z-steps__step');
    expect(screen.getByText('1')).toHaveClass('z-steps__indicator');
    expect(screen.getByText('Account')).toHaveClass('z-steps__title');
    expect(screen.getByText('Details')).toHaveClass('z-steps__description');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Steps currentStep={2}>
        <Step step={1}>
          <StepIndicator step={1} />
          <StepTitle>Account</StepTitle>
          <StepDescription>Create your account</StepDescription>
        </Step>
        <Step step={2}>
          <StepIndicator step={2} />
          <StepTitle>Profile</StepTitle>
          <StepDescription>Add profile details</StepDescription>
        </Step>
      </Steps>,
    );
    await checkA11y(container);
  });
});
