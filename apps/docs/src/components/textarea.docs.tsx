import { Textarea } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, textControl } from './shared-controls';

export const textareaDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'textarea',
  name: 'Textarea',
  category: 'Forms',
  summary: 'Multi-line text input.',
  importPath: '@z-ui/react/textarea',
  componentName: 'Textarea',
  controls: {
    placeholder: textControl('placeholder', 'Enter your message'),
    disabled: booleanControl('disabled', false),
    invalid: booleanControl('invalid', false),
  },
  render: (props) => (
    <Textarea
      placeholder={props.placeholder as string}
      disabled={props.disabled as boolean}
      invalid={props.invalid as boolean}
      aria-label="Message"
      rows={4}
      style={{ width: '100%', maxWidth: '24rem' }}
    />
  ),
  code: (props) => {
    const parts = [
      `placeholder="${props.placeholder}"`,
      props.disabled ? 'disabled' : null,
      props.invalid ? 'invalid' : null,
      'aria-label="Message"',
    ].filter(Boolean);
    return `<Textarea ${parts.join(' ')} />`;
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<textarea />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<textarea />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<textarea />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
