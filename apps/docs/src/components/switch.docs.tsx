import { Switch } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const switchDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'switch',
  name: 'Switch',
  category: 'Forms',
  summary: 'Toggle switch for binary on/off settings.',
  importPath: '@z-ui/react/switch',
  componentName: 'Switch',
  controls: {
    checked: booleanControl('checked', false),
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <Switch
      checked={props.checked as boolean}
      disabled={props.disabled as boolean}
      invalid={props.invalid as boolean}
      aria-label="Enable notifications"
    />
  ),
  code: (props) => {
    const parts = [
      props.checked ? 'checked' : null,
      props.disabled ? 'disabled' : null,
      props.invalid ? 'invalid' : null,
      'aria-label="Enable notifications"',
    ].filter(Boolean);
    return `<Switch ${parts.join(' ')} />`;
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<switch />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<switch />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<switch />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
