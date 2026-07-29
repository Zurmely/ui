import type { ReactNode } from 'react';
import { DashboardExample } from './DashboardExample';
import { LoginExample } from './LoginExample';
import { PricingComparison } from './PricingComparison';

export interface ExampleDoc {
  slug: string;
  name: string;
  summary: string;
  render: () => ReactNode;
}

export const elementRegistry: ExampleDoc[] = [
  {
    slug: 'pricing-comparison',
    name: 'Pricing comparison',
    summary:
      'Three-tier pricing with billing toggle, feature lists, comparison table, and FAQ accordion.',
    render: () => <PricingComparison />,
  },
];

export const pageExampleRegistry: ExampleDoc[] = [
  {
    slug: 'login',
    name: 'Login',
    summary: 'Centered sign-in form with validation, remember me, and error feedback.',
    render: () => <LoginExample />,
  },
  {
    slug: 'dashboard',
    name: 'Dashboard',
    summary:
      'Application shell with navbar, sidebar nav, KPI cards, tabs, table, and chart placeholder.',
    render: () => <DashboardExample />,
  },
];

export const elementBySlug = new Map(elementRegistry.map((doc) => [doc.slug, doc]));
export const pageExampleBySlug = new Map(pageExampleRegistry.map((doc) => [doc.slug, doc]));

export const ELEMENT_NAV = elementRegistry.map((doc) => ({
  slug: doc.slug,
  name: doc.name,
  path: `/elements/${doc.slug}`,
}));

export const PAGE_EXAMPLE_NAV = pageExampleRegistry.map((doc) => ({
  slug: doc.slug,
  name: doc.name,
  path: `/pages/${doc.slug}`,
}));
