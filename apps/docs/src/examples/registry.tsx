import type { ReactNode } from 'react';
import { DashboardExample } from './DashboardExample';
import { LoginExample } from './LoginExample';
import { PricingComparison } from './PricingComparison';

export interface ExampleDoc {
  slug: string;
  name: string;
  summary: string;
  components: string[];
  render: () => ReactNode;
}

export const elementRegistry: ExampleDoc[] = [
  {
    slug: 'pricing-comparison',
    name: 'Pricing comparison',
    summary:
      'Three-tier pricing with a billing Filter, feature ListItems, a comparison Table, and an FAQ Accordion. All parts are published Z-UI components.',
    components: [
      'accordion',
      'badge',
      'button',
      'card',
      'filter',
      'list-item',
      'separator',
      'stack',
      'table',
    ],
    render: () => <PricingComparison />,
  },
];

export const pageExampleRegistry: ExampleDoc[] = [
  {
    slug: 'login',
    name: 'Login',
    summary:
      'Centered sign-in Card with Field-wrapped TextFields, Checkbox, client-side FieldError, and an Alert when submit fails.',
    components: [
      'alert',
      'button',
      'card',
      'checkbox',
      'field',
      'link',
      'separator',
      'stack',
      'text-field',
    ],
    render: () => <LoginExample />,
  },
  {
    slug: 'dashboard',
    name: 'Dashboard',
    summary:
      'Application shell: Navbar, sidebar ListItems, KPI Cards, Toolbar, Filter, Tabs, Table with Pagination, Timeline, and Status.',
    components: [
      'avatar',
      'badge',
      'card',
      'filter',
      'link',
      'list-item',
      'menu',
      'navbar',
      'pagination',
      'separator',
      'stack',
      'status',
      'table',
      'tabs',
      'timeline',
      'toolbar',
    ],
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
