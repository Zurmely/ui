import { Checkbox, Stack, Switch } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const switchDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'switch',
  name: 'Switch',
  category: 'Forms',
  summary: 'Toggle switch for binary on/off settings.',
  importPath: '@z-ux/ui/switch',
  componentName: 'Switch',
  controls: {
    checked: booleanControl('checked', false),
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
      <Switch
        id="playground-switch"
        checked={props.checked as boolean}
        disabled={props.disabled as boolean}
        invalid={props.invalid as boolean}
      />
      <label htmlFor="playground-switch">Email notifications</label>
    </Stack>
  ),
  code: (props) => {
    const parts = [
      props.checked ? 'checked' : null,
      props.disabled ? 'disabled' : null,
      props.invalid ? 'invalid' : null,
    ].filter(Boolean);
    return `<Stack direction="horizontal" gap="sm">
  <Switch id="notifications"${parts.length ? ` ${parts.join(' ')}` : ''} />
  <label htmlFor="notifications">Email notifications</label>
</Stack>`;
  },
    whenToUsePreviews: {
      use: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Switch id="dark-mode-preview" checked />
          <label htmlFor="dark-mode-preview">Dark mode</label>
        </Stack>
      ),
      doNotUse: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Checkbox aria-label="Dark mode" />
          <span>Dark mode</span>
        </Stack>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Notifications',
      description: 'Toggle email notifications in settings.',
      code: `<Stack direction="horizontal" gap="sm">
  <Switch id="notifications" />
  <label htmlFor="notifications">Email notifications</label>
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Switch id="notifications-example" />
          <label htmlFor="notifications-example">Email notifications</label>
        </Stack>
      ),
    },
    {
      label: 'Dark mode',
      description: 'Switch turned on for an active feature.',
      code: `<Stack direction="horizontal" gap="sm">
  <Switch id="dark-mode" checked />
  <label htmlFor="dark-mode">Dark mode</label>
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Switch id="dark-mode-example" checked />
          <label htmlFor="dark-mode-example">Dark mode</label>
        </Stack>
      ),
    },
    {
      label: 'Required toggle',
      description: 'Validation error on a required toggle.',
      code: `<Stack direction="horizontal" gap="sm">
  <Switch id="accept-terms" invalid />
  <label htmlFor="accept-terms">Accept terms</label>
</Stack>`,
      render: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Switch id="accept-terms-example" invalid />
          <label htmlFor="accept-terms-example">Accept terms</label>
        </Stack>
      ),
    },
  ];
  return doc;
})();
