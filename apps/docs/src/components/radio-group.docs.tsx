import { Checkbox, RadioGroup, RadioGroupItem, Stack } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const radioGroupDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'radio-group',
  name: 'RadioGroup',
  category: 'Forms',
  summary: 'Single selection from a group of options.',
  importPath: '@z-ux/ui/radio-group',
  componentName: 'RadioGroup',
  controls: {
    value: {
      type: 'select',
      label: 'value',
      options: ['free', 'pro', 'team'],
      defaultValue: 'pro',
    },
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <RadioGroup
      value={props.value as string}
      disabled={props.disabled as boolean}
      invalid={props.invalid as boolean}
      aria-label="Plan"
    >
      <Stack gap="sm">
        <label>
          <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
            <RadioGroupItem value="free" /> Free
          </Stack>
        </label>
        <label>
          <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
            <RadioGroupItem value="pro" /> Pro
          </Stack>
        </label>
        <label>
          <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
            <RadioGroupItem value="team" /> Team
          </Stack>
        </label>
      </Stack>
    </RadioGroup>
  ),
  code: (props) => `<RadioGroup value="${props.value}" aria-label="Plan">
  <RadioGroupItem value="free" />
  <RadioGroupItem value="pro" />
</RadioGroup>`,
    whenToUsePreviews: {
      use: () => (
        <RadioGroup defaultValue="pro" aria-label="Plan">
          <Stack gap="sm">
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="free" /> Free
              </Stack>
            </label>
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="pro" /> Pro
              </Stack>
            </label>
          </Stack>
        </RadioGroup>
      ),
      doNotUse: () => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Checkbox aria-label="Pro plan" />
          <span>Pro plan</span>
        </Stack>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Plan selection',
      description: 'Choose one subscription plan.',
      code: `<RadioGroup defaultValue="pro" aria-label="Plan">
  <Stack gap="sm">
    <label><Stack direction="horizontal" gap="sm"><RadioGroupItem value="free" /> Free</Stack></label>
    <label><Stack direction="horizontal" gap="sm"><RadioGroupItem value="pro" /> Pro</Stack></label>
  </Stack>
</RadioGroup>`,
      render: () => (
        <RadioGroup defaultValue="pro" aria-label="Plan">
          <Stack gap="sm">
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="free" /> Free
              </Stack>
            </label>
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="pro" /> Pro
              </Stack>
            </label>
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="team" /> Team
              </Stack>
            </label>
          </Stack>
        </RadioGroup>
      ),
    },
    {
      label: 'Shipping method',
      description: 'Pick one delivery option at checkout.',
      code: `<RadioGroup defaultValue="standard" aria-label="Shipping">
  <Stack gap="sm">
    <label><Stack direction="horizontal" gap="sm"><RadioGroupItem value="standard" /> Standard (5–7 days)</Stack></label>
    <label><Stack direction="horizontal" gap="sm"><RadioGroupItem value="express" /> Express (2 days)</Stack></label>
  </Stack>
</RadioGroup>`,
      render: () => (
        <RadioGroup defaultValue="standard" aria-label="Shipping">
          <Stack gap="sm">
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="standard" /> Standard (5–7 days)
              </Stack>
            </label>
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="express" /> Express (2 days)
              </Stack>
            </label>
          </Stack>
        </RadioGroup>
      ),
    },
    {
      label: 'Permissions loading',
      description: 'Read-only selection while permissions are loading.',
      code: '<RadioGroup disabled defaultValue="a" aria-label="Options">...</RadioGroup>',
      render: () => (
        <RadioGroup disabled defaultValue="a" aria-label="Options">
          <Stack gap="sm">
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="a" /> Option A
              </Stack>
            </label>
            <label>
              <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
                <RadioGroupItem value="b" /> Option B
              </Stack>
            </label>
          </Stack>
        </RadioGroup>
      ),
    },
  ];
  return doc;
})();
