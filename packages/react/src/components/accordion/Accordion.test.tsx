import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

describe('Accordion', () => {
  it('renders items and expands content on trigger click', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Accordion type="single" collapsible defaultValue="one">
        <AccordionItem value="one">
          <AccordionTrigger>Section one</AccordionTrigger>
          <AccordionContent>Content one</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger>Section two</AccordionTrigger>
          <AccordionContent>Content two</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole('button', { name: 'Section one' })).toHaveAttribute(
      'data-state',
      'open',
    );
    expect(screen.getByText('Content one')).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Section two' }));
    expect(screen.getByRole('button', { name: 'Section two' })).toHaveAttribute(
      'data-state',
      'open',
    );
    expect(screen.getByText('Content two')).toBeVisible();
  });

  it('applies z-accordion classes', () => {
    renderWithTheme(
      <Accordion type="single" collapsible defaultValue="one">
        <AccordionItem value="one">
          <AccordionTrigger>Section one</AccordionTrigger>
          <AccordionContent>Content one</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole('button', { name: 'Section one' })).toHaveClass(
      'z-accordion__trigger',
      'z-focus-ring',
    );
    expect(screen.getByText('Content one').parentElement).toHaveClass('z-accordion__content');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Accordion type="single" collapsible defaultValue="one">
        <AccordionItem value="one">
          <AccordionTrigger>Section one</AccordionTrigger>
          <AccordionContent>Content one</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger>Section two</AccordionTrigger>
          <AccordionContent>Content two</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await checkA11y(container);
  });
});
