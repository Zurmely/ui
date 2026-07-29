import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

describe('Tabs', () => {
  it('renders tab triggers and panels', () => {
    renderWithTheme(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByRole('tabpanel', { name: 'One' })).toBeInTheDocument();
    expect(screen.queryByRole('tabpanel', { name: 'Two' })).not.toBeInTheDocument();
  });

  it('switches panels when a trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>,
    );

    await user.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByRole('tabpanel', { name: 'Two' })).toBeInTheDocument();
  });

  it('applies z-tabs classes', () => {
    renderWithTheme(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole('tablist')).toHaveClass('z-tabs__list');
    expect(screen.getByRole('tab')).toHaveClass('z-tabs__trigger', 'z-focus-ring');
    expect(screen.getByRole('tabpanel')).toHaveClass('z-tabs__content');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>,
    );
    await checkA11y(container);
  });
});
