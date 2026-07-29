import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Filter,
  FilterItem,
  ListItem,
  Separator,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@z-ui/react';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PLANS = [
  {
    name: 'Starter',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'For individuals exploring the system.',
    features: ['Up to 3 projects', 'Community support', 'Basic analytics'],
    cta: 'Get started',
    variant: 'secondary' as const,
    popular: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 24,
    yearlyPrice: 19,
    description: 'For teams shipping production interfaces.',
    features: [
      'Unlimited projects',
      'Priority support',
      'Advanced analytics',
      'Custom themes',
      'Team permissions',
    ],
    cta: 'Start trial',
    variant: 'primary' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 64,
    yearlyPrice: 52,
    description: 'For organizations with advanced needs.',
    features: [
      'Everything in Pro',
      'SSO and audit logs',
      'Dedicated support',
      'Custom SLAs',
      'On-premise option',
    ],
    cta: 'Contact sales',
    variant: 'secondary' as const,
    popular: false,
  },
];

const MATRIX_FEATURES = [
  { label: 'Projects', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'Support', starter: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
  { label: 'SSO', starter: '—', pro: '—', enterprise: 'Included' },
  { label: 'Audit logs', starter: '—', pro: '—', enterprise: 'Included' },
];

export function PricingComparison() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="docs-pricing">
      <Stack direction="vertical" gap="lg" className="docs-pricing__intro">
        <div className="docs-pricing__heading">
          <h2 className="docs-pricing__title">Choose your plan</h2>
          <p className="docs-pricing__summary">
            Transparent pricing built with Z-UI cards, filters, and tables.
          </p>
        </div>
        <Filter
          type="single"
          value={billing}
          onValueChange={(value) => setBilling(value as string)}
          aria-label="Billing period"
        >
          <FilterItem value="monthly">Monthly</FilterItem>
          <FilterItem value="yearly">Yearly</FilterItem>
        </Filter>
      </Stack>

      <div className="docs-pricing__tiers">
        {PLANS.map((plan) => {
          const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
          return (
            <Card key={plan.name} className={plan.popular ? 'docs-pricing__tier--popular' : undefined}>
              <CardHeader>
                <Stack direction="horizontal" gap="sm" className="docs-pricing__tier-header">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular ? (
                    <Badge tone="primary" size="sm">
                      Popular
                    </Badge>
                  ) : null}
                </Stack>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="docs-pricing__price">
                  <span className="docs-pricing__amount">${price}</span>
                  <span className="docs-pricing__period">/mo</span>
                </p>
                <Separator />
                <ul className="docs-pricing__features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <ListItem
                        size="sm"
                        variant="plain"
                        label={feature}
                        leading={
                          <span className="docs-pricing__check">
                            <CheckIcon />
                          </span>
                        }
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.variant} className="docs-pricing__cta">
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <section className="docs-pricing__matrix" aria-labelledby="pricing-matrix-title">
        <h3 id="pricing-matrix-title" className="docs-pricing__matrix-title">
          Feature comparison
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Starter</TableHead>
              <TableHead>Pro</TableHead>
              <TableHead>Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MATRIX_FEATURES.map((row) => (
              <TableRow key={row.label}>
                <TableCell>{row.label}</TableCell>
                <TableCell>{row.starter}</TableCell>
                <TableCell>{row.pro}</TableCell>
                <TableCell>{row.enterprise}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <Accordion type="single" collapsible className="docs-pricing__faq">
        <AccordionItem value="billing">
          <AccordionTrigger>Can I switch plans later?</AccordionTrigger>
          <AccordionContent>
            Yes. Upgrade or downgrade at any time. Changes apply on your next billing cycle.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="trial">
          <AccordionTrigger>Is there a free trial for Pro?</AccordionTrigger>
          <AccordionContent>
            Pro includes a 14-day trial with full access to team features.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
