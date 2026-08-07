import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  FileInput,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const fileInputDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'file-input',
  name: 'FileInput',
  category: 'Forms',
  summary: 'Styled file upload control.',
  importPath: '@z-ux/ui/file-input',
  componentName: 'FileInput',
  controls: {
    disabled: booleanControl('disabled', false),
    multiple: booleanControl('multiple', false),
  },
  render: (props) => (
    <Field style={{ width: '100%', maxWidth: '24rem' }}>
      <FieldLabel>Profile photo</FieldLabel>
      <FileInput
        disabled={props.disabled as boolean}
        multiple={props.multiple as boolean}
      />
      <FieldDescription>PNG or JPG up to 5 MB.</FieldDescription>
    </Field>
  ),
  code: (props) => {
    const parts = [
      props.disabled ? 'disabled' : null,
      props.multiple ? 'multiple' : null,
    ].filter(Boolean);
    return `<Field>
  <FieldLabel>Profile photo</FieldLabel>
  <FileInput${parts.length ? ` ${parts.join(' ')}` : ''} />
</Field>`;
  },
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Profile photo</FieldLabel>
          <FileInput />
          <FieldDescription>PNG or JPG up to 5 MB.</FieldDescription>
        </Field>
      ),
      doNotUse: () => <Button variant="secondary">Upload file</Button>,
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Profile photo',
      description: 'Pick one file for a profile image.',
      code: `<Field>
  <FieldLabel>Profile photo</FieldLabel>
  <FileInput />
  <FieldDescription>PNG or JPG up to 5 MB.</FieldDescription>
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Profile photo</FieldLabel>
          <FileInput />
          <FieldDescription>PNG or JPG up to 5 MB.</FieldDescription>
        </Field>
      ),
    },
    {
      label: 'Ticket attachments',
      description: 'Attach several files to a support ticket.',
      code: `<Field>
  <FieldLabel>Attachments</FieldLabel>
  <FileInput multiple />
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Attachments</FieldLabel>
          <FileInput multiple />
        </Field>
      ),
    },
    {
      label: 'PDF upload',
      description: 'Restrict uploads to PDF documents.',
      code: `<Field>
  <FieldLabel>Resume</FieldLabel>
  <FileInput accept=".pdf" />
  <FieldDescription>PDF only, up to 10 MB.</FieldDescription>
</Field>`,
      render: () => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Resume</FieldLabel>
          <FileInput accept=".pdf" />
          <FieldDescription>PDF only, up to 10 MB.</FieldDescription>
        </Field>
      ),
    },
  ];
  return doc;
})();
