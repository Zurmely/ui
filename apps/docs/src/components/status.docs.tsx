import { Badge, Stack, Status } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { sizeControl, textControl, toneControl } from './shared-controls';

export const statusDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'status',
  name: 'Status',
  category: 'Display',
  summary: 'Non-interactive status with a tone-colored dot and optional label or children.',
  importPath: '@z-ux/ui/status',
  componentName: 'Status',
  controls: {
    tone: toneControl('success'),
    size: sizeControl(),
    label: textControl('label', 'Active'),
  },
  render: (props) => (
    <Status
      tone={props.tone as 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'}
      size={props.size as 'sm' | 'md' | 'lg'}
      label={props.label as string}
    />
  ),
  whenToUsePreviews: {
    use: () => (
      <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
        <span>Payments API</span>
        <Status tone="success" label="Operational" size="sm" />
      </Stack>
    ),
    doNotUse: () => <Badge tone="success">Operational</Badge>,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Service healthy',
      description: 'Operational status beside a service name on a status dashboard.',
      code: `<Stack direction="horizontal" gap="sm">
  <span>Payments API</span>
  <Status tone="success" label="Operational" size="sm" />
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <span>Payments API</span>
          <Status tone="success" label="Operational" size="sm" />
        </Stack>
      ),
    },
    {
      label: 'Degraded service',
      description: 'Warning status when a service is partially unavailable.',
      code: `<Stack direction="horizontal" gap="sm">
  <span>Search API</span>
  <Status tone="warning" label="Degraded" size="sm" />
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <span>Search API</span>
          <Status tone="warning" label="Degraded" size="sm" />
        </Stack>
      ),
    },
    {
      label: 'Service outage',
      description: 'Danger status when a service is fully offline.',
      code: `<Stack direction="horizontal" gap="sm">
  <span>Auth API</span>
  <Status tone="danger" label="Offline" />
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <span>Auth API</span>
          <Status tone="danger" label="Offline" />
        </Stack>
      ),
    },
  ];
  return doc;
})();
