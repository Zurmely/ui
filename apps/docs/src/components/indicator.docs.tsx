import { Avatar, Indicator, IndicatorItem } from '@z-ux/ui';
import { Button } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl, toneControl } from './shared-controls';

export const indicatorDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'indicator',
  name: 'Indicator',
  category: 'Display',
  summary:
      'Badge or dot overlaid on another element. Dot variant needs label. Props live on IndicatorItem, not Indicator.',
  importPath: '@z-ux/ui/indicator',
  componentName: 'Indicator',
  controls: {
    variant: {
      type: 'select',
      label: 'variant',
      options: ['dot', 'badge'],
      defaultValue: 'badge',
    },
    placement: {
      type: 'select',
      label: 'placement',
      options: ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      defaultValue: 'top-end',
    },
    label: textControl('label', '3'),
    tone: toneControl('danger'),
  },
  render: (props) => (
    <Indicator>
      <Button variant="secondary">Inbox</Button>
      <IndicatorItem
        variant={props.variant as 'dot' | 'badge'}
        placement={props.placement as 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'}
        tone={
          props.tone as 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
        }
        label={props.variant === 'dot' ? 'Unread' : undefined}
      >
        {props.variant === 'badge' ? (props.label as string) : null}
      </IndicatorItem>
    </Indicator>
  ),
  code: (props) =>
    props.variant === 'dot'
      ? `<Indicator>
  <Button variant="secondary">Inbox</Button>
  <IndicatorItem variant="dot" placement="${props.placement}" tone="${props.tone}" label="Unread" />
</Indicator>`
      : `<Indicator>
  <Button variant="secondary">Inbox</Button>
  <IndicatorItem variant="badge" placement="${props.placement}" tone="${props.tone}">${props.label}</IndicatorItem>
</Indicator>`,
  whenToUsePreviews: {
    use: () => (
      <Indicator>
        <Button variant="secondary">Inbox</Button>
        <IndicatorItem variant="badge" placement="top-end">3</IndicatorItem>
      </Indicator>
    ),
    doNotUse: () => <Button variant="secondary">Inbox (3)</Button>,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Unread dot',
      description: 'Subtle dot indicator on a navigation icon.',
      code: `<Indicator>
  <Button variant="secondary">Inbox</Button>
  <IndicatorItem variant="dot" placement="top-end" label="Unread" />
</Indicator>`,
      render: () => (
        <Indicator>
          <Button variant="secondary">Inbox</Button>
          <IndicatorItem variant="dot" placement="top-end" label="Unread" />
        </Indicator>
      ),
    },
    {
      label: 'Notification badge',
      description: 'Numeric badge on an icon button.',
      code: `<Indicator>
  <Button variant="secondary">Inbox</Button>
  <IndicatorItem variant="badge" placement="top-end">5</IndicatorItem>
</Indicator>`,
      render: () => (
        <Indicator>
          <Button variant="secondary">Inbox</Button>
          <IndicatorItem variant="badge" placement="top-end">5</IndicatorItem>
        </Indicator>
      ),
    },
    {
      label: 'Bottom placement',
      description: 'Badge anchored to the bottom-start of a trigger.',
      code: `<Indicator>
  <Button variant="ghost" size="sm">Messages</Button>
  <IndicatorItem variant="badge" placement="bottom-start">12</IndicatorItem>
</Indicator>`,
      render: () => (
        <Indicator>
          <Button variant="ghost" size="sm">Messages</Button>
          <IndicatorItem variant="badge" placement="bottom-start">12</IndicatorItem>
        </Indicator>
      ),
    },
    {
      label: 'Avatar status',
      description: 'Dot on an avatar for online or presence status. label is required on dots.',
      code: `<Indicator>
  <IndicatorItem variant="dot" tone="success" label="Online" />
  <Avatar fallback="AB" alt="Alex Brooks" />
</Indicator>`,
      render: () => (
        <Indicator>
          <IndicatorItem variant="dot" tone="success" label="Online" />
          <Avatar fallback="AB" alt="Alex Brooks" />
        </Indicator>
      ),
    },
  ];
  return doc;
})();
