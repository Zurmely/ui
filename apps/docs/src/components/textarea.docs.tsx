import {
  Field,
  FieldDescription,
  FieldLabel,
  Textarea,
  TextField,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl, textControl } from './shared-controls';

export const textareaDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'textarea',
  name: 'Textarea',
  category: 'Forms',
  summary: 'Multi-line text input.',
  importPath: '@z-ux/ui/textarea',
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
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Bio</FieldLabel>
          <Textarea placeholder="Tell us about yourself" />
          <FieldDescription>Max 280 characters.</FieldDescription>
        </Field>
      ),
      doNotUse: () => <TextField placeholder="Tell us about yourself" aria-label="Bio" />,
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Comment box',
      description: 'Multi-line input for user feedback.',
      code: '<Textarea placeholder="Leave a comment..." aria-label="Comment" />',
      render: () => <Textarea placeholder="Leave a comment..." aria-label="Comment" />,
    },
    {
      label: 'Bio field',
      description: 'Longer profile description with helper text.',
      code: `<Field>
  <FieldLabel>Bio</FieldLabel>
  <Textarea aria-label="Bio" placeholder="Tell us about yourself" />
  <FieldDescription>Max 280 characters.</FieldDescription>
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Bio</FieldLabel>
          <Textarea aria-label="Bio" placeholder="Tell us about yourself" />
          <FieldDescription>Max 280 characters.</FieldDescription>
        </Field>
      ),
    },
    {
      label: 'Archived note',
      description: 'Read-only textarea while content is locked.',
      code: '<Textarea disabled value="Archived note" aria-label="Note" />',
      render: () => <Textarea disabled value="Archived note" aria-label="Note" />,
    },
  ];
  return doc;
})();
