import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

describe('Card', () => {
  it('renders composed card sections', () => {
    renderWithTheme(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Monthly billing</CardDescription>
        </CardHeader>
        <CardContent>$12 / month</CardContent>
        <CardFooter>Manage plan</CardFooter>
      </Card>,
    );

    expect(screen.getByRole('heading', { name: 'Plan' })).toBeInTheDocument();
    expect(screen.getByText('Monthly billing')).toBeInTheDocument();
    expect(screen.getByText('$12 / month')).toBeInTheDocument();
    expect(screen.getByText('Manage plan')).toBeInTheDocument();
  });

  it('forwards ref to card root', () => {
    const ref = vi.fn();
    renderWithTheme(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('applies z-card classes', () => {
    const { container } = renderWithTheme(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(container.querySelector('.z-card')).toBeInTheDocument();
    expect(container.querySelector('.z-card__header')).toBeInTheDocument();
    expect(container.querySelector('.z-card__title')).toBeInTheDocument();
    expect(container.querySelector('.z-card__description')).toBeInTheDocument();
    expect(container.querySelector('.z-card__content')).toBeInTheDocument();
    expect(container.querySelector('.z-card__footer')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Monthly billing</CardDescription>
        </CardHeader>
        <CardContent>$12 / month</CardContent>
      </Card>,
    );
    await checkA11y(container);
  });
});
